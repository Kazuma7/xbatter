import CardList from "../components/CardList";
import Collection from "../components/Collection";

const CollectionDetail = ({ changeState, collectionList, selCollectionNo }) => {
	const stakeNftAmount = 10;
	const yourTicketAmount = 10;
	return (
		<div className=" w-full bg-slate-100">
			<div className="flex w-full">
				<div className="w-96 ">
					<Collection
						changeState={changeState}
						collectionList={collectionList}
						selCollectionNo={selCollectionNo}
					/>
				</div>
				<div className="w-full ">
					<div className="flex justify-between items-center mx-10 my-10">
						<div className=" text-3xl font-bold">
							{collectionList[selCollectionNo].cName}
						</div>
						<button className=" px-4 rounded-md button-bg font-bold text-white py-2  shadow-md">
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
					<CardList />
					<div className="flex justify-between bg-slate-100 px-10 py-10">
						<div>Creator</div>
						<div className="flex justify-center">
							<div>Github</div>
							<div>discord</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollectionDetail;
