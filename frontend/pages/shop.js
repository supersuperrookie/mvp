import withLit from "../utils/withLit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { LayoutMargin } from "../components/Layout";

import { nftAddress, escrowAddress } from "../config";
import Amho from "../artifacts/contracts/Amho.sol/Amho.json";
import { ethers } from "ethers";

// const dummyShopData = [
//   {
//     id: 0,
//     name: "MUDANG",
//     status: Status.SHIPPED,
//     imageURI: "/bag1.mp4",
//     description:
//       "First leather bag created for ETHDenver 2022, built with pebble buffalo leather",
//     dimension: "9.5 / 4.5 / 7.5 inches",
//     material: "Pebble Grain Leather",
//     price: 1400,
//   },
// ];

const Shop = () => {
  // const [shopData, setShopData] = useState(dummyShopData);
  const [onSale, setOnSale] = useState([]);

  if (typeof window !== "undefined") {
    useEffect(async () => {
      // NOTE: Returns owned array

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      let amhoContract = new ethers.Contract(nftAddress, Amho.abi, signer);
      let owned = await amhoContract.fetchOnSale();

      const resultOnSale = await Promise.all(
        owned.map(async (i) => {
          const tokenURI = await amhoContract.tokenURI(i.tokenId);
          const metadata = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), 'wei');
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            owner: i.currentOwner,
            imageURI: metadata.data.imageURI,
            status: i.itemState,
            name: metadata.data.name
          };
          return item;
        })
      );

      setOnSale(resultOnSale);
    }, [window.ethereum]);
  }

  return (
    <div className={LayoutMargin}>
      <div className="flex-grow">
        <div className="pb-20">
          <h1 className="text-8xl font-bold text-slate-200">ON SALE</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
          {onSale.map((item, id) => (
            <ShopItem item={item} key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ShopItem = ({ item, id }) => {
  const router = useRouter();
  const handlePageChange = () => {
    router.push(`/shop/${id}`, undefined, { shallow: true });
  };
  return (
    <div className="cursor-pointer">
      <div>
        <a onClick={handlePageChange} key={id}>
          <video
            src={item.imageURI}
            // autoPlay
            // loop
            muted
            height={600}
            width={350}
            type="video/mp4"
          ></video>
        </a>
      </div>
      <div className="p-4">
        <div className="flex">
          <div>
            <span className="text-xl font-bold">{item.name}</span>
          </div>
        </div>
        <div className="flex">
          <div>
            <span className="text-sm">{item.price} MATIC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLit(Shop);
