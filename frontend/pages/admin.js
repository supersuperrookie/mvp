import { LayoutMargin } from "../components/Layout";
import { useEffect, useState } from "react";
import { webClient, getRecord } from "../utils/withIdentity";




import { CeramicClient } from "@ceramicnetwork/http-client";
import { getResolver, createNftDidUrl} from "nft-did-resolver";
import { Resolver } from "did-resolver";

const didNFT = createNftDidUrl({
  chainId: 'eip155:80001',
  namespace: 'erc721',
  contract: '0x454314f720bbb4508a29b9eae7d8f75838867da7',
  tokenId: '1',
})
const run = async (ceramic) => {
  console.log(didNFT)
  const config = {
    ceramic,
    chains: {
      "eip155:80001": {
        blocks: "https://api.thegraph.com/subgraphs/name/nnons/mumbai-blocks",
        skew: 50000,
        assets: {
          erc721: "https://api.thegraph.com/subgraphs/name/nnons/mumbaierc721",
          erc1155: "https://api.thegraph.com/subgraphs/name/nnons/mumbaierc721",
        },
      },
    },
  };
  const nftResolver = getResolver(config);
  const didResolver = new Resolver(nftResolver);

  const erc721result = await didResolver.resolve(didNFT);
  console.log(erc721result);
};
const Admin = () => {
  const [ceramic, setCeramic] = useState(null);
  useEffect(() => {
    const API_URL = "https://ceramic-clay.3boxlabs.com";
    const ceramic = new CeramicClient(API_URL);
    setCeramic(ceramic);
  }, []);
  return (
    <div className={LayoutMargin}>
      <div className="pb-20">
        <h1 className="text-8xl font-bold text-slate-200">MINT</h1>
        <button onClick={() => run(ceramic)}>Test</button>
      </div>
    </div>
  );
};

export default Admin;
