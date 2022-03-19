import { useGlobal } from "../utils/global-state";
import { useState } from "react";
import { Status } from "../utils/constants";
import { AntiLayoutMargin, LayoutMargin } from "../components/Layout";
import withLit from "../utils/withLit";
import IconShipped from "../components/Icons/IconShipped";
import IconTethered from "../components/Icons/IconTethered";
import IconPending from "../components/Icons/IconPending";

/**
 *
 * Status will be returned by the smart contract
 *
 *
 */
const Collections = () => {
  const [globalState, globalActions] = useGlobal();
  const [open, setOpen] = useState(false);
  // TODO: Reach out to grab the array based on the user address to get the collections

  const handleOpen = ({id}) => {
    setOpen(!open);
    globalActions.ownedSetStatusPendingMate(id);
  };

  const handleQR = () => {
    let ethereum = window.ethereum;
    if(!ethereum) {
      console.log("No wallet detected");
    }

    ethereum
  .request({
    method: 'wallet_scanQRCode',
    // The regex string must be valid input to the RegExp constructor, if provided
    params: ['\\D'],
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
    
  }

  const CollectionItem = ({ item, id }) => {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center">
          {item.status == Status.SHIPPED ? (
            <IconShipped status={Status.SHIPPED} />
          ) : item.status == Status.MATED ? (
            <IconTethered status={Status.MATED} />
          ) : item.status == Status.PENDING ||
            Status.PENDING_INIT ||
            Status.PENDING_MATE ? (
            <a onClick={handleQR}>
              <IconPending status={item.status} id={id} />
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="grow">
          <img src="/bagplaceholder2.png" alt="" />
        </div>
      </div>

    );
  };

  return (
    <div className={LayoutMargin}>
      <div className="pb-20">
        <h1 className="text-8xl font-bold text-slate-200">OWNED</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {globalState.ownedDummyData.map((item, id) => (
          <CollectionItem item={item} id={id} />
        ))}
      </div>
      <div className="pt-10 pb-10 mt-60">
        <h1 className="text-8xl font-bold text-slate-200">ORDERS</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {globalState.ordersDummyData.map((item, id) => (
          <CollectionItem item={item} id={id} />
        ))}
      </div>
      <TetherDialog
        open={open}
        handleOpen={handleOpen}
        itemImage={"./bag1.mp4"}
      />
    </div>
  );
};

function TetherDialog({ open, handleOpen, itemImage }) {

  // TODO: Add on effect here that grabs the ID

  const [tethered, setTethered] = useState(false);

  return open ? (
    <div className={AntiLayoutMargin}>
    <div class="w-screen h-screen bg-slate-50 bg-opacity-80 top-0 fixed sticky-0">
      <div class="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
        <div class="ring-2 ring-slate-800 w-96 md:w-auto dark:bg-slate-50 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
          <div className="">
            <video
              src={itemImage}
              autoPlay
              loop
              muted
              height={600}
              width={350}
              type="video/mp4"
            />
          </div>
          <div class="mt-10">
            {tethered ? (
              <h1
                role="main"
                class="text-3xl text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800"
              >
                TETHERING IN PROGRESS
              </h1>
            ) : (
              <h1
                role="main"
                class="text-3xl text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800"
              >
                TETHERED
              </h1>
            )}
            <div className="flex justify-center">
              <button className="mt-6 text-base dark:text-slate-300 hover:text-blue-400 leading-7 text-gray-800">
                txid: 0xdb1
              </button>
            </div>
          </div>
          <button
            onClick={handleOpen}
            class="w-full focus:ring-4 ring-slate-800 ring-2 dark:text-gray-800 dark:bg-slate-50 sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
    </div>
  ) : (
    ""
  );
}
export default withLit(Collections);
