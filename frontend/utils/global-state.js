import globalHook from "use-global-hook";
import { Status } from "./constants";
import { actions } from "./actions";

const initialState = {
  account: null,
  did: undefined,
  name: null,
  imageURL: null,
  network: "mumbai",
};

export const useGlobal = globalHook(initialState, actions);
