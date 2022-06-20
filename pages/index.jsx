import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMoralis, useNFTBalances, useMoralisWeb3Api } from "react-moralis";
import CardList from "../components/CardList";

export default function Home() {
	const Web3Api = useMoralisWeb3Api();

	const { isAuthenticated, authenticate, user } = useMoralis();
	const { getNFTBalances, data } = useNFTBalances();
	const [nftList, setNftList] = useState();
	const { isInitialized } = useMoralis();

	console.log(isAuthenticated);

	const fetchNFTs = async () => {
		// window.web3 = await Moralis.enable();
		// get polygon NFTs for address
		// const options = {
		// 	chain: "rinkeby",
		// 	address: "0xe52Fb55EE3164Ff93eb6a40Df60b8479e7A8B732",
		// };
		// const nftList = await Web3Api.account.getNFTs(options);
		// console.log(nftLisst);
		if (isInitialized) {
			getNFTBalances({
				params: {
					chain: "rinkeby",
					address: "0xe52Fb55EE3164Ff93eb6a40Df60b8479e7A8B732",
				},
			});
		}
		console.log(data);
		console.log("fetchNFTsが呼び出されました");
	};

	useEffect(() => {
		// const fetchNFTs = async () => {
		// window.web3 = await Moralis.enable();
		// get polygon NFTs for address
		// const options = {
		// 	chain: "rinkeby",
		// 	address: "0xe52Fb55EE3164Ff93eb6a40Df60b8479e7A8B732",
		// };
		// const nftList = await Web3Api.account.getNFTs(options);
		// console.log(nftList);
		// getNFTBalances({
		// 	params: {
		// 		chain: "rinkeby",
		// 		address: "0xe52Fb55EE3164Ff93eb6a40Df60b8479e7A8B732",
		// 	},
		// });
		// console.log(data);
		// console.log("fetchNFTsが呼び出されました");
		// };
		// getNFTBalances({
		// 	params: {
		// 		chain: "rinkeby",
		// 		address: "0xe52Fb55EE3164Ff93eb6a40Df60b8479e7A8B732",
		// 	},
		// });
		// console.log(data);

		fetchNFTs();

		console.log("useEffectが呼び出されました");
		setNftList(data);
	}, [isAuthenticated]);

	return (
		<div>
			<div className="flex justify-between items-center h-16 bg-gray-100 px-10">
				<div>xbatter</div>
				<a
					className="border rounded-full px-6 py-2 bg-white font-bold"
					onClick={authenticate}
				>
					connect wallet
				</a>
			</div>
			<CardList data={nftList} />
		</div>
	);
}
