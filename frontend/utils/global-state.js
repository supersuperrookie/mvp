import globalHook from "use-global-hook";
import { Status } from "./constants";
import { actions } from "./actions";

const initialState = {
  account: undefined,
  did: undefined,
  network: "mumbai",
  ownedDummyData: [
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
      status: Status.PENDING_INIT,
    },
  ],
  ordersDummyData: [
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
  ],
};

export const useGlobal = globalHook(initialState, actions);
