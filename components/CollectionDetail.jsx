import CardList from "../components/CardList";
import Collection from "../components/Collection";
import { useState } from "react";

const CollectionDetail = ({
  changeState,
  collectionList,
  selCollectionNo,
  data,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const stakeNftAmount = 10;
  const yourTicketAmount = 10;

  const onChnageMenu = () => {
    if (menuIsOpen == false) {
      setMenuIsOpen(true);
    } else if (menuIsOpen == true) {
      setMenuIsOpen(false);
    }
  };
  return (
    <div className=" w-full bg-slate-100 h-full">
      <div className="flex w-full">
        <div className="w-96 ">
          <Collection
            changeState={changeState}
            collectionList={collectionList}
            selCollectionNo={selCollectionNo}
          />
        </div>
        {menuIsOpen ? (
          <div className="w-full ">
            <div className="flex justify-between items-center mx-10 my-10">
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
                  {stakeNftAmount}
                </div>
              </div>
              <div className="mx-auto">
                <div className="text-center pb-2">Your Ticket Amount</div>
                <div className="text-center text-3xl font-bold">
                  {yourTicketAmount}
                </div>
              </div>
            </div>
            <CardList data={data} />

            <div className="flex justify-between bg-slate-100 px-10 py-10">
              <div>Creator</div>
              <div className="flex justify-center">
                <div>Github</div>
                <div>discord</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <div className="flex justify-between items-center mx-10 my-10">
              <div className=" text-3xl font-bold">
                Yours "{collectionList[selCollectionNo].cName}"
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
            <CardList />

            <div className="flex justify-between bg-slate-100 px-10 py-10">
              <div>Creator</div>
              <div className="flex justify-center">
                <div>Github</div>
                <div>discord</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
