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
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.TETHERED,
    },
    {
      id: 1,
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.SHIPPED,
    },
    {
      id: 2,
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.PENDING_INIT,
    },
  ],
  ordersDummyData: [
    {
      id: 0,
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.PENDING,
    },
    {
      id: 1,
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.PENDING,
    },
    {
      id: 2,
      name: "MUDANG",
      imageURI: "/bag1.mp4",
      status: Status.SHIPPED,
    },
  ],
};

export const useGlobal = globalHook(initialState, actions);
