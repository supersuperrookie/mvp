import { useGlobal } from "../utils/global-state";
import { formatDid } from "../utils/formatDid";
import { webClient, getRecord, getAccount } from "../utils/withIdentity";
import { useRouter } from "next/router";

import Link from "next/link";
import withLit from "../utils/withLit";



const Profile = () => {
  const [globalState, globalActions] = useGlobal();
  if (typeof globalState.did !== 'undefined')
    return (
      <div className="p-6 rounded-xl flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12 rounded-full" src="/profile.png" alt="" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">Bufficorn</div>
          <div className="text-slate-500">{formatDid(globalState.did)}</div>
          {/* <div className="text-slate-500 sm:invisible">{globalState.account}</div> */}
        </div>
      </div>
    );
  else return <NoProfile />;
};

const NoProfile = () => {
  const router = useRouter();
  const [globalState, globalActions] = useGlobal();

  async function connectCeramic() {
    const cdata = await webClient();
    const { account, client, id, selfId, error } = cdata;

    if (id && account) {
      globalActions.setAccount(account);
      globalActions.setDID(id);
      router.push('/shop');
      const pdata = await getRecord({...client});
    }
    
  }

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
