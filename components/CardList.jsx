import Link from "next/link";
import Card from "/components/Card.jsx";

const CardList = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-8 px-10 pb-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 max-w-screen-xl mx-auto mt-12">
			{/* {data &&
				data.result.map((nft) => (
					<a>
						<Card image={nft.image} c_name={nft.name} name="" price={0.01} />
					</a>
				))} */}
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
};

export default CardList;
