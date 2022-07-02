const Collection = ({ changeState, collectionList, selCollectionNo }) => {
	const onChangeState = (num) => {
		changeState(num);
	};

	return (
		<div className="mx-8">
			<div className="mt-10 mb-4 font-bold">Collection</div>
			{collectionList &&
				collectionList.map((item, index) => {
					return (
						<div
							className={
								index != selCollectionNo
									? "pb-2 border-l border-gray-200 hover:border-gray-400 pl-4 my-1 cursor-pointer"
									: "pb-2 border-l border-blue-400 pl-4 my-1 cursor-pointer"
							}
						>
							<a onClick={() => onChangeState(index)}>{item.cName}</a>
						</div>
					);
				})}
		</div>
	);
};

export default Collection;
