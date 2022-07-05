import { useEffect, useState } from "react";
import { useMoralis, useNFTBalances, useMoralisWeb3Api } from "react-moralis";
import { ethers } from "ethers";
import Image from "next/image";
import CollectionDetail from "../components/CollectionDetail";
import collectionList from "../components/collectionList.json";
const exchangeContractAddr = process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT;

export default function Home() {
  const Web3Api = useMoralisWeb3Api();
  const [collectionNo, setCollectionNo] = useState(0);
  const [yourItemList, setYourItemList] = useState([]);
  const [ctrItemList, setCtrItemList] = useState([]);
  const { isAuthenticated, user, authenticate, logout, isInitialized } =
    useMoralis();

  console.log(exchangeContractAddr);
  useEffect(() => {
    const addChain = async () => {
      try {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
      } catch (error) {
        alert(error.message);
      }
    };
    addChain();
  }, []);

  useEffect(() => {
    const fetchNFT = async () => {
      const options = {
        chain: "matic",
        address: exchangeContractAddr,
      };
      const polygonNFTs = await Web3Api.account.getNFTs(options);
      console.log(polygonNFTs);
      setCtrItemList(polygonNFTs);
    };

    const fetchNFTyours = async () => {
      const options = {
        chain: "matic",
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
          <div className="font-Inter-Medium pt-2 p-14 relative">
            <Image
              src={"/images/xbatter.svg"}
              alt={`画像`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg object-cover absolute left-0 m-auto w-full h-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <a className="rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer">
              are you collection owner?
            </a>
            <a
              className=" rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer"
              onClick={authenticate}
            >
              connect
            </a>
          </div>
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
          <div className="font-Inter-Medium pt-2 p-14 relative">
            <Image
              src={"/images/xbatter.svg"}
              alt={`画像`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg object-cover absolute left-0 m-auto w-full h-full"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <a className="rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer">
              are you collection owner?
            </a>
            <a
              className=" rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm text-gray-500 cursor-pointer"
              onClick={logout}
            >
              disconnect
            </a>
          </div>
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
