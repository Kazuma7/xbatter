import CardList from "../components/CardList";
import Collection from "../components/Collection";
import exchangeAbi from "../contracts/ERC721Exchange.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
const exchangeContractAddr = process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT;
import { useMoralis } from "react-moralis";
const iconStyle = { fontSize: "20px" };

const CollectionDetail = ({
  changeState,
  collectionList,
  selCollectionNo,
  ctrItemList,
  yourItemList,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [yourItemListFilter, setYourItemListFilter] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [yourTicketAmount, setYourTicketAmount] = useState(0);
  const [selCollectionItemList, setSelCollectionItemList] = useState();
  const [yourTicketList, setYourTicketList] = useState();
  const { user } = useMoralis();
  const [selCollectionTicketAddr, setSelCollectionTicketAddr] = useState();

  const selCollectionAddr = collectionList[selCollectionNo].cAddr;

  useEffect(() => {
    const fetchYourItemList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        exchangeContractAddr,
        exchangeAbi,
        signer
      );
      const tmpSelCollectionTicketAddr = await contract.getTicketAddress(
        selCollectionAddr
      );
      // console.log(selCollectionTicketAddr);
      setSelCollectionTicketAddr(tmpSelCollectionTicketAddr);

      const tmpYourTicketAmount = await contract.balanceOfTicket(
        selCollectionAddr,
        user?.get("ethAddress")
      );
      setYourTicketAmount(tmpYourTicketAmount.toString());

      if (selCollectionTicketAddr) {
        //所有してるNFTから特定のNFTをフィルター
        const tmpYourItemListFilter =
          yourItemList.result.filter(filterCollection);
        setYourItemListFilter(tmpYourItemListFilter);

        //所有してるNFTから特定のNFTのチケットをフィルター
        const tmpYourTicketList = yourItemList.result.filter(
          filterCollectionTicket
        );
        setYourTicketList(tmpYourTicketList);
      }
    };
    fetchYourItemList();
  }, [yourItemList, selCollectionTicketAddr]);

  useEffect(() => {
    const fetchCtrItemList = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        exchangeContractAddr,
        exchangeAbi,
        signer
      );

      const tmpStakeAmount = await contract.totalTicketSupply(
        selCollectionAddr
      );

      //ステーキングしてあるNFTから特定のNFTをフィルター
      const tmpSelCollectionItemList =
        ctrItemList.result.filter(filterCollection);
      setSelCollectionItemList(tmpSelCollectionItemList);
      setStakeAmount(tmpStakeAmount.toString());
    };
    fetchCtrItemList();
  }, [ctrItemList]);

  const onChnageMenu = () => {
    if (menuIsOpen == false) {
      setMenuIsOpen(true);
    } else if (menuIsOpen == true) {
      setMenuIsOpen(false);
    }
  };

  //特定のNFTフィルター
  const filterCollection = (item) => {
    if (item.token_address.toUpperCase() == selCollectionAddr.toUpperCase()) {
      return true;
    }
  };

  //特定のNFTチケットフィルター
  const filterCollectionTicket = (item) => {
    // console.log(selCollectionTicketAddr);
    if (
      item.token_address.toUpperCase() == selCollectionTicketAddr.toUpperCase()
    ) {
      return true;
    }
  };

  return (
    <div className=" w-full bg-slate-100 h-full">
      <div className="flex w-full bg-slate-100">
        <div className="w-96 ">
          <Collection
            changeState={changeState}
            collectionList={collectionList}
            selCollectionNo={selCollectionNo}
          />
        </div>
        {menuIsOpen ? (
          <div className="w-full  ">
            <div className="flex justify-between items-center mx-10 my-10 ">
              <div className=" text-3xl font-bold">
                {collectionList[selCollectionNo].cName}
              </div>
              <button
                className=" px-4 rounded-md button-bg font-bold text-white py-2  shadow-md"
                onClick={onChnageMenu}
              >
                Exchange Ticket
              </button>
            </div>

            <div className="grid grid-cols-2 border bg-white mx-10 my-10 py-4 rounded-lg bg-opacity-70  shadow-md">
              <div className="mx-auto">
                <div className="text-center pb-2">Stake NFT Amount</div>
                <div className="text-center text-3xl font-bold">
                  {stakeAmount}
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center pb-2">Your Ticket Amount</div>
                <div className="text-center text-3xl font-bold">
                  {yourTicketAmount}
                </div>
              </div>
            </div>
            <CardList data={ctrItemList.result} menuFlg={menuIsOpen} />

            <div className="flex justify-between bg-slate-100 px-10 py-10">
              <div></div>
              <div className="flex justify-center">
                <div>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faGithub}
                    style={iconStyle}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faUserGear}
                    style={iconStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <div className="flex justify-between items-center mx-10 my-10">
              <div className=" text-3xl font-bold">
                Yours &quot;{collectionList[selCollectionNo].cName}&quot;
              </div>
              <button
                className=" px-4 rounded-md bg-gray-400 font-bold text-white py-2  shadow-md"
                onClick={onChnageMenu}
              >
                Exchange NFT
              </button>
            </div>

            <div className=" border bg-white mx-10 my-10 py-4 rounded-lg bg-opacity-70  shadow-md">
              <div className=" py-2 pl-6">
                💡 Select your NFT you would like to exchange
              </div>
            </div>
            <CardList data={yourItemListFilter} menuFlg={menuIsOpen} />

            <div className="flex justify-between bg-slate-100 px-10 py-10">
              <div></div>
              <div className="flex justify-center">
                <div>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faGithub}
                    style={iconStyle}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faUserGear}
                    style={iconStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
