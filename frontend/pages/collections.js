import { useGlobal } from "../utils/global-state";
import { Status } from "../utils/constants";
import { LayoutMargin } from "../components/Layout";
import withLit from "../utils/withLit";
import IconShipped from "../components/Icons/IconShipped";
import IconMated from "../components/Icons/IconMated";
import IconPending from "../components/Icons/IconPending";

const Collections = () => {
  const [globalState, globalActions] = useGlobal();
  const CollectionItem = ({ item, id }) => {
    return (
      <div>
        {item.status == Status.SHIPPED ? (
          <IconShipped status={Status.SHIPPED} />
        ) : item.status == Status.MATED ? (
          <IconMated status={Status.MATED} />
        ) : item.status == Status.PENDING ||
          Status.PENDING_INIT ||
          Status.PENDING_MATE ? (
          <IconPending status={item.status} id={id} />
        ) : (
          ""
        )}
        <img src="/bagplaceholder2.png" alt="" />
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
          <CollectionItem item={item} id={id}/>
        ))}
      </div>
    </div>
  );
};

export default withLit(Collections);
