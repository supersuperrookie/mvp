import { useState, useLayoutEffect } from "react";
import withLit from "../utils/withLit";
import { Status } from "../utils/constants";
import IconShipped from "../components/Icons/IconShipped";
import IconMated from "../components/Icons/IconMated";
import IconPending from "../components/Icons/IconPending";
import { LayoutMargin } from "../components/Layout";

let ownedDummyData = [
  {
    id: 0,
    name: "Bag One",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.MATED,
  },
  {
    id: 1,
    name: "Bag Two",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.SHIPPED,
  },
  {
    id: 2,
    name: "Bag Three",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.PENDING,
  },
];

let ordersDummyData = [
  {
    id: 0,
    name: "Bag One Order",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.PENDING,
  },
  {
    id: 1,
    name: "Bag Two Order",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.PENDING,
  },
  {
    id: 2,
    name: "Bag Three Order",
    imageURI: "https://place-hold.it/350x300?text=BAG",
    status: Status.SHIPPED,
  },
];

const Collections = () => {
  const [orders, setOrders] = useState(ordersDummyData);
  const [owned, setOwned] = useState(ownedDummyData);
  const [did, setDID] = useState('');
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      setDID(window.did?._id);
    }, [window.did]);
  }
  const CollectionItem = ({ item, id }) => {
    return (
      <div>
        <a href={`#`} className="" key={id}>
          {item.status == Status.SHIPPED ? (
            <IconShipped type={Status.SHIPPED} />
          ) : item.status == Status.MATED ? (
            <IconMated type={Status.MATED} />
          ) : item.status == Status.PENDING ? (
            <IconPending type={Status.PENDING} />
          ) : (
            ""
          )}
          <img src="/bagplaceholder2.png" alt="" />
        </a>
      </div>
    );
  };
  return (
    <div className={LayoutMargin}>
      <div className="pb-20">
        <h1 className="text-8xl font-bold text-slate-200">OWNED</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {owned.map((item, id) => (
          <CollectionItem item={item} id={id} />
        ))}
      </div>
      <div className="pt-10 pb-10 mt-60">
        <h1 className="text-8xl font-bold text-slate-200">ORDERS</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {orders.map((item, id) => (
          <CollectionItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default withLit(Collections);
