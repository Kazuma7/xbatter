import { useEffect, useState } from "react";
import { useMoralis, useNFTBalances, useMoralisWeb3Api } from "react-moralis";
import { ethers } from "ethers";
import CollectionDetail from "../components/CollectionDetail";
import collectionList from "../components/collectionList.json";
const contractAddress = "0x63e617726AB4172D48168ffb510F6571Ac2b5247";

export default function Home() {
	const Web3Api = useMoralisWeb3Api();
	const [collectionNo, setCollectionNo] = useState(0);
	const [yourItemList, setYourItemList] = useState([]);
	const [ctrItemList, setCtrItemList] = useState([]);
	const {
		isAuthenticated,
		user,
		isAuthenticating,
		authenticate,
		logout,
		isLoggingOut,
		isInitialized,
	} = useMoralis();

	useEffect(() => {
		const addChain = async () => {
			try {
				await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x4" }],
				});
			} catch (Exeption) {
				console.log("Rinkeby Network has already been connected.");
			} finally {
			}
		};
		addChain();
	}, []);

	useEffect(() => {
		const fetchNFT = async () => {
			const options = {
				chain: "rinkeby",
				address: contractAddress,
			};
			const polygonNFTs = await Web3Api.account.getNFTs(options);
			console.log(polygonNFTs);
			setCtrItemList(polygonNFTs);
		};

		const fetchNFTyours = async () => {
			const options = {
				chain: "rinkeby",
				address: user?.get("ethAddress"),
			};
			const tmpCtrItemList = await Web3Api.account.getNFTs(options);
			console.log(tmpCtrItemList);
			setYourItemList(tmpCtrItemList);
		};

		if (isInitialized) {
			fetchNFT();
			fetchNFTyours();
		}
	}, [isInitialized]);

	if (!isAuthenticated) {
		return (
			<div className="h-screen w-screen bg-white">
				<div className="flex justify-between items-center px-10 h-[60px] border-b text-lg text-gray-700">
					<div className="font-Inter-Medium">xBatter</div>
					<a
						className=" rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer"
						onClick={authenticate}
					>
						connect
					</a>
				</div>
				<div className="flex justify-center items-center h-full w-full bg-slate-100">
					<div className="pb-20 font-Inter-Medium">
						<div className="text-5xl text-center pb-6 font-bold">
							Your NFT to the NFT you want.
						</div>
						<div className="text-lg">
							xBatter is a barter gas price{" "}
							<span className=" text-blue-600">optimization</span> protocol and
							an ownership <span className=" text-blue-600">optimization</span>{" "}
							protocol
						</div>
						<div className="flex justify-center mt-6">
							<a
								className="px-6 py-3 bg-gray-900 hover:bg-gray-700 rounded-md text-white text-sm cursor-pointer"
								onClick={authenticate}
							>
								Get started
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="h-screen w-screen ">
				<div className="flex justify-between items-center px-10 h-[60px] border-b text-lg text-gray-700">
					<div className="font-Inter-Medium">xBatter</div>
					<a
						className=" rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer"
						onClick={logout}
					>
						disconnect
					</a>
				</div>
				{ctrItemList?.result != undefined &&
				yourItemList?.result != undefined ? (
					<CollectionDetail
						collectionList={collectionList}
						selCollectionNo={collectionNo}
						changeState={setCollectionNo}
						ctrItemList={ctrItemList}
						yourItemList={yourItemList}
					/>
				) : (
					<div></div>
				)}
			</div>
		);
	}
}
