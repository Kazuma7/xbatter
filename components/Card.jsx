import Image from "next/image";
import exchangeAbi from "../contracts/ERC721Exchange.json";
const exchangeContractAddr = process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT;
const defaultAbi = [
	"function approve(address to, uint256 tokenId) public virtual override",
];
import { ethers } from "ethers";

const Card = ({ image, c_name, name, cntrAddr, cntrTokenId, menuFlg }) => {
	//チケット <=> 選択したNFT
	const onExchange = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const accounts = await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			exchangeContractAddr,
			exchangeAbi,
			signer
		);

		contract.withdrawToken(cntrAddr, cntrTokenId, {
			gasLimit: "500000",
		});
	};

	//自分のNFT <=> チケット
	const onStake = async () => {
		//approve関数を叩く
		const provider1 = new ethers.providers.Web3Provider(window.ethereum);
		const accounts1 = await provider1.send("eth_requestAccounts", []);
		const signer1 = provider1.getSigner();
		const nftContract = new ethers.Contract(cntrAddr, defaultAbi, signer1);
		console.log(cntrAddr);
		console.log(cntrTokenId);

		nftContract.approve(exchangeContractAddr, cntrTokenId, {
			gasLimit: "500000",
		});

		//depositToken関数を叩く
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const accounts = await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			exchangeContractAddr,
			exchangeAbi,
			signer
		);

		contract.depositToken(cntrAddr, cntrTokenId, {
			gasLimit: "500000",
		});
	};

	return (
		<div className="p-3 bg-white rounded-lg bg-opacity-70 shadow-md hover:shadow-lg">
			{image ? (
				<Image
					src={image}
					alt={`画像`}
					width={300}
					height={300}
					className="rounded-lg object-cover absolute left-0 m-auto w-full h-full"
				/>
			) : (
				<Image
					src={"/images/noimage.png"}
					alt={`画像`}
					width={300}
					height={300}
					className="rounded-lg object-cover absolute left-0 m-auto w-full h-full"
				/>
			)}
			<div className="text-xs mt-1">{c_name}</div>
			<div className="font-bold">{name}</div>
			<div className=" mt-5">
				{menuFlg ? (
					<div className="flex justify-end">
						<a
							onClick={onExchange}
							className="py-1 px-4  font-bold rounded-full  text-xs text-white button-bg  border cursor-pointer"
						>
							Exchange
						</a>
					</div>
				) : (
					<div className="flex justify-end">
						<a
							onClick={onStake}
							className="py-1 px-4  font-bold rounded-full  text-xs bg-gray-100 hover:bg-gray-200 text-gray-500 border cursor-pointer"
						>
							Stake
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
