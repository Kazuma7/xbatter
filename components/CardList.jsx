import Link from "next/link";
import Card from "/components/Card.jsx";

const CardList = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-8 px-10 pb-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 max-w-screen-xl mx-auto mt-12">
      {data &&
        data.result.map((nft) => (
          <Card
            image={nft.image ? nft.image : "/images/noimage.png"}
            c_name={nft.name ? nft.name : "unknown"}
            name={nft.metadata ? nft.metadata.name : "unknown"}
            price={0.01}
            key=""
          />
        ))}
    </div>
  );
};

export default CardList;
