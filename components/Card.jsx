import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import exchangeAbi from "..contracts/ERC721Exchange";
const contractAddress = "0x54F7118955cc7669af59e894482829C5A8f10a4e";

const Card = ({ image, c_name, name, price, rentalFlg }) => {
  const iconStyle = { fontSize: 16 };
  const onExchange = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, exchangeAbi, signer);
    
		//approve関数を叩く
		//withdraw関数を叩く
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
      <div className="grid grid-cols-2 mt-5">
        {rentalFlg ? (
          <div className="flex items-center">
            <FontAwesomeIcon
              className="px-2 "
              style={iconStyle}
              icon={faBars}
            />
            <div className="text-xs font-bold">{price} / day</div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex justify-end">
          <span className="py-1 px-4  font-bold rounded-full  text-xs bg-gray-100 hover:bg-gray-200 text-gray-500 border cursor-pointer">
            Exchange
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
