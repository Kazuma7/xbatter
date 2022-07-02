import Card from "/components/Card.jsx";

const CardList = ({ data, menuFlg }) => {
	return (
		<div className="bg-slate-100 grid grid-cols-2 gap-8 px-10 pb-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 max-w-screen-xl mx-auto mt-12">
			{data &&
				data.map((nft) => {
					return (
						<Card
							image={nft.image ? nft.image : "/images/noimage.png"}
							c_name={nft.name ? nft.name : "unknown"}
							name={nft.metadata ? nft.metadata.name : "unknown"}
							price={0.01}
							cntrAddr={nft.token_address ? nft.token_address : ""}
							cntrTokenId={nft.token_id ? nft.token_id : ""}
							key=""
							menuFlg={menuFlg}
						/>
					);
				})}
		</div>
	);
};

export default CardList;
