import Link from "next/link";
import { formatDid } from "../utils/formatDid";
import withLit from "../utils/withLit";
import { webClient } from "../utils/withIdentity";
import { useRouter } from "next/router";

const Profile = () => {
  if (typeof window !== "undefined" && typeof window.did !== "undefined")
    return (
      <div className="p-6 rounded-xl flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12" src="/profile.png" alt="" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">User</div>
          <div className="text-slate-500">{formatDid(window.did._id)}</div>
        </div>
      </div>
    );
  else return <NoProfile />;
};

const NoProfile = () => {
  const router = useRouter();
  async function connectCeramic() {
    const cdata = await webClient();
    const { id, selfId, error } = cdata;
    if (id) {
      router.push('/shop');
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
