import { useRouter } from "next/router";
import { useState } from "react";
import { Status } from "../utils/constants";
import withLit from "../utils/withLit";
import { LayoutMargin } from "../components/Layout";

const dummyShopData = [
  {
    id: 0,
    name: "MUDANG",
    status: Status.SHIPPED,
    imageURI: "/bag1.mp4",
    description:
      "First leather bag created for ETHDenver 2022, built with pebble buffalo leather",
    dimension: "9.5 / 4.5 / 7.5 inches",
    material: "Pebble Grain Leather",
    price: 1400,
  },
];
const Shop = () => {
  const [shopData, setShopData] = useState(dummyShopData);

  return (
    <div className={LayoutMargin}>
      <div className="flex-grow">
        <div className="pb-20">
          <h1 className="text-8xl font-bold text-slate-200">ON SALE</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
          {shopData.map((item, id) => (
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
