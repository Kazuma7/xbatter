import CardList from "../components/CardList";
import Collection from "../components/Collection";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

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

	useEffect(() => {
		//所有してるNFTから特定のNFTをフィルター
		const tmpYourItemListFilter = yourItemList.result.filter(filterCollection);
		setYourItemListFilter(tmpYourItemListFilter);

		//所有してるNFTから特定のNFTのチケットをフィルター
		const tmpYourTicketList = yourItemList.result.filter(
			filterCollectionTicket
		);
		setYourTicketList(tmpYourTicketList);
		const tmpYourTicketAmount = tmpYourTicketList.length;
		setYourTicketAmount(tmpYourTicketAmount);
	}, [yourItemList]);

	useEffect(() => {
		//ステーキングしてあるNFTから特定のNFTをフィルター
		const tmpSelCollectionItemList =
			ctrItemList.result.filter(filterCollection);
		setSelCollectionItemList(tmpSelCollectionItemList);
		const tmpStakeAmount = tmpSelCollectionItemList.length;
		setStakeAmount(tmpStakeAmount);
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
		if (
			item.token_address.toUpperCase() ==
			"0xea03e1b9022770b4c9b061be263d601f1fd1e22e".toUpperCase()
		) {
			return true;
		}
	};

	//特定のNFTチケットフィルター
	const filterCollectionTicket = (item) => {
		if (
			item.token_address.toUpperCase() ==
			"0xd6B4239e23e3801c1adA8383830A59d27fdCb7Ec".toUpperCase()
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
