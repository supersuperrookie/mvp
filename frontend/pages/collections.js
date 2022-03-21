import { useEffect } from "react";
import { useGlobal } from "../utils/global-state";
import { useState } from "react";
import { Status } from "../utils/constants";
import { ethers } from "ethers";
import axios from "axios";
import { AntiLayoutMargin, LayoutMargin } from "../components/Layout";
import withLit from "../utils/withLit";
import IconShipped from "../components/Icons/IconShipped";
import IconTethered from "../components/Icons/IconTethered";
import IconPending from "../components/Icons/IconPending";

import { nftAddress, escrowAddress } from "../config";
import Amho from "../artifacts/contracts/Amho.sol/Amho.json";
import IconUntethered from "../components/Icons/IconUntethered";

import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-reader"));

/**
 *
 * Status will be returned by the smart contract
 *
 *
 */
const Collections = ({ litCeramicIntegration }) => {
  const [globalState, globalActions] = useGlobal();
  const [loggedInAddress, setLoggedInAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState([]);
  const [pending, setPending] = useState([]);
  const [pendingTether, setPendingTether] = useState([]);
  // const [ownedItems, setOwnedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [_tokenId, setTokenId] = useState(0);
  const [streamData, setStreamData] = useState(null);
  const [decryptedSecret, setDecryptedSecret] = useState(null);
  // TODO: Reach out to grab the array based on the user address to get the collections
  const handleScan = (result, type) => {
    if (result) {
      setStreamData(result);
      decryptSecret(result);
    }
  };
  if (typeof window !== "undefined") {
    useEffect(async () => {
      // NOTE: Returns owned array

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const accounts = await provider.listAccounts();
      setLoggedInAddress(accounts[0]);
      const signer = provider.getSigner();
      let amhoContract = new ethers.Contract(nftAddress, Amho.abi, signer);

      let owned = await amhoContract.fetchOwned();
      let pending = await amhoContract.fetchPendingInitOrders();
      let pendingTether = await amhoContract.fetchPendingTether();

      const resultOwned = await Promise.all(
        owned.map(async (i) => {
          const tokenURI = await amhoContract.tokenURI(i.tokenId);
          const metadata = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            owner: i.currentOwner,
            imageURI: metadata.data.imageURI,
            status: i.itemState,
          };
          return item;
        })
      );

      const resultPending = await Promise.all(
        pending.map(async (i) => {
          const tokenURI = await amhoContract.tokenURI(i.tokenId);
          const metadata = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            owner: i.currentOwner,
            nextOwner: i.nextOwner,
            imageURI: metadata.data.imageURI,
            status: i.itemState,
          };
          return item;
        })
      );

      const resultPendingTether = await Promise.all(
        pendingTether.map(async (i) => {
          const tokenURI = await amhoContract.tokenURI(i.tokenId);
          const metadata = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            owner: i.currentOwner,
            nextOwner: i.nextOwner,
            imageURI: metadata.data.imageURI,
            status: i.itemState,
          };
          return item;
        })
      );

      console.log(resultPendingTether)
      setOwned(resultOwned);
      setPending(resultPending);
      setPendingTether(resultPendingTether)
      setLoading(false);
    }, [window.ethereum]);
  }

  const handleOpen = ({ id }) => {
    setOpen(!open);
    // globalActions.ownedSetStatusPendingMate(id);
  };

  const decryptSecret = async (qrData) => {
    // INPUT ceramicStream

    await litCeramicIntegration.readAndDecrypt(qrData).then(async (decryptedText) => {
      setDecryptedSecret(decryptedText);
      const secret = ethers.BigNumber.from(decryptedText); 
      const hexSecret = ethers.utils.hexlify(secret);
      const soliditySecret = ethers.utils.solidityKeccak256(["bytes32"], [hexSecret]);
      const tokenId = _tokenId;

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      const signer = provider.getSigner();
      let amhoContract = new ethers.Contract(nftAddress, Amho.abi, signer);
      await amhoContract.depositNftToEscrow(tokenId, soliditySecret);
    });
  };

  // const handleQROpen = (tokenId) => {
  //   setTokenId(tokenId);
  //   setQrOpen(!qrOpen);
  // };

  const handleQRInit = (tokenId) => {
    setTokenId(tokenId);
    let ethereum = window.ethereum;
    if (!ethereum) {
      console.log("No wallet detected");
    }

    ethereum
      .request({
        method: "wallet_scanQRCode",
        // The regex string must be valid input to the RegExp constructor, if provided
        params: ["\\D"],
      })
      .then((result) => {
        // alert(result);
        decryptSecret(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CollectionItem = ({ item, id }) => {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center">
          {item.status == 3 || item.status == 0 ? (
            <IconTethered />
          ) : item.status == 1 && item.owner == loggedInAddress ? (
            <a onClick={() => handleQRInit(item.tokenId)}>
              <IconPending status={item.status} id={id} />
            </a>
          ) : item.status == 1 && item.nextOwner == loggedInAddress ? (
            ""
          ) : item.status == 2 && item.nextOwner == loggedInAddress ? (
            <a onClick={() => handleQROpen(item.tokenId)}>
              <IconPending status={item.status} id={id} />
            </a>
          ) : (
            <IconUntethered />
          )}
        </div>
        <div className="grow">
          <video
            src={item.imageURI}
            preload
            autoPlay
            loop
            muted
            height={600}
            width={350}
            type="video/mp4"
          />
        </div>
      </div>
    );
  };

  if (loading && (!owned.length || !pending.length))
    return (
      <div className={LayoutMargin}>
        <h1 className="text-8xl font-bold text-slate-200">NO NFTs</h1>
      </div>
    );

  return (
    <div className={LayoutMargin}>
      <div className="pb-20">
        {/*  NOTE: OWNED */}

        <h1 className="text-8xl font-bold text-slate-200">OWNED</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {owned.map(
          (item, id) =>
            item.status == 0 && <CollectionItem item={item} id={id} />
        )}
        {/* {globalState.ownedDummyData.map((item, id) => (
          <CollectionItem item={item} id={id} />
        ))} */}
      </div>
      <div className="pt-10 pb-10 mt-60">
        {/* NOTE: ORDERS */}

        <h1 className="text-8xl font-bold text-slate-200">ORDERS</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-start items-stretch gap-60">
        {pending.map(
          (item, id) =>
            (item.status == 1) && <CollectionItem item={item} id={id} />
        )}
        {pendingTether.map(
          (item, id) =>
            (item.status == 2) && <CollectionItem item={item} id={id} />
        )}
        {/* {globalState.ordersDummyData.map((item, id) => (
          <CollectionItem item={item} id={id} />
        ))} */}
      </div>
      <TetherDialog
        open={open}
        handleOpen={handleOpen}
        itemImage={"./bag1.mp4"}
      />
      {/* <div className={!qrOpen ? `invisible` : `visible`}> */}
        {/* <QrReader
          onScan={(result) => handleScan(result)}
          scanDelay={1000}
          onResult={(result, error) => {
            if (!!result) {
              // setData(result?.text);
              console.log(result);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: 400 }}
        /> */}
      {/* </div> */}
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
