import axios from "axios";
import { useGlobal } from "../utils/global-state";
import { formatDid } from "../utils/formatDid";
import { webClient, getRecord } from "../utils/withIdentity";
import { useRouter } from "next/router";
import { loadImage } from "@self.id/image-utils";

import Link from "next/link";
import withLit from "../utils/withLit";
import { appendIpfsRoot, stripIpfsUriPrefix } from "../utils/ipfsUtils";

const Profile = () => {
  const [globalState, _] = useGlobal();
  if (typeof globalState.did !== "undefined" && typeof window !== "undefined") {
    return (
      <div className="p-6 rounded-xl flex items-center space-x-4">
        <div className="shrink-0">
          {async () => await loadImage(globalState.imageBlob)}
          <img
            className="h-12 w-12 rounded-full"
            src={globalState.imageURL}
            alt=""
          />
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            {globalState.name}
          </div>
          <div className="text-slate-500">{formatDid(globalState.did)}</div>
        </div>
      </div>
    );
  } else return <NoProfile />;
};

const NoProfile = () => {
  const router = useRouter();
  const [globalState, globalActions] = useGlobal();
  const connectCeramic = async () => {
    const cdata = await webClient();
    const rdata = await getRecord();

    const { profile, did } = rdata;
    const { name, image } = profile;
    const { account, client, id, selfId, error } = cdata;

    const cid = stripIpfsUriPrefix(image.original.src);
    const cidURI = appendIpfsRoot(cid);
    const imageBlob = await axios.get(cidURI, { responseType: "blob" });
    console.log(imageBlob);

    const imageURL = URL.createObjectURL(imageBlob.data);

    if (id && account) {
      globalActions.setAccount(account);
      globalActions.setImageURL(imageURL);
      globalActions.setName(name);
      globalActions.setDID(did);

      const currentPath = router.pathname;

      router.push(currentPath);
    }
  };

  return (
    <Link href="#">
      <a
        onClick={connectCeramic}
        className="inline-flex items-center p-2 mr-4 "
      >
        <span className="items-center justify-center w-full px-3 py-2 font-bold text-black rounded lg:inline-flex lg:w-auto hover:underline decoration-4">
          LOGIN
        </span>
      </a>
    </Link>
  );
};

export default withLit(Profile);
