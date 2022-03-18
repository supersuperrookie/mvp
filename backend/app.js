// Ceramic Dependencies

let { CeramicClient } = require("@ceramicnetwork/http-client");

// DID Dependencies

const { Resolver } = require("did-resolver");
const { Ed25519Provider } = require("key-did-provider-ed25519");
const { randomBytes } = require("crypto");
const { fromString, toString } = require("uint8arrays");
const { DID } = require("dids");

// const ThreeIdProvider = require("3id-did-provider");

const { getResolver: keyDIDResolver } = require("key-did-resolver");
// const {
//   getResolver: threeDIDResolver,
// } = require("@ceramicnetwork/3id-did-resolver");
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver')

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const getSeed = () => {
  let seed;
  if (process.env.SEED) {
    seed = fromString(process.env.SEED, "base16");
    console.log("Using provided seed");
  } else {
    seed = new Uint8Array(randomBytes(32)); // TODO: Change this to a VRF string
    console.log(`Created seed: ${toString(seed, "base16")}`);
  }
  return seed;
};

(async () => {
  const API_URL = "https://ceramic-clay.3boxlabs.com";
  const ceramic = new CeramicClient(API_URL);
  // const ceramic = new Ceramic();
  const config = {
    ceramic,
    chains: {
      "eip155:1": {
        blocks:
          "https://api.thegraph.com/subgraphs/name/yyong1010/ethereumblocks",
        skew: 15000,
        assets: {
          erc721:
            "https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph",
          erc1155:
            "https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph",
        },
      },
      "eip155:4": {
        blocks: "https://api.thegraph.com/subgraphs/name/mul53/rinkeby-blocks",
        skew: 15000,
        assets: {
          erc721:
            "https://api.thegraph.com/subgraphs/name/sunguru98/erc721-rinkeby-subgraph",
          erc1155:
            "https://api.thegraph.com/subgraphs/name/sunguru98/erc1155-rinkeby-subgraph",
        },
      },
    },
  };
  console.log(getResolver)
  // const didResolver = new Resolver(nftResolver);
  // const erc721result = await didResolver.resolve(
  //   "did:nft:eip155:1_erc721:0xb300a43751601bd54ffee7de35929537b28e1488_2"
  // );
  const seed = getSeed(); // This seed is created
  // const threeIdResolver = ThreeIdResolver.getResolver(ceramic)
  // const didResolver = new Resolver(threeIdResolver);
  // const doc = await didResolver.resolve('did:3:kjzl6cwe1jw14b4bq5om463og0g57ibjtzsd68344suuyiiusrasnfr752t0iot')
  // console.log(erc721result)
  // const threeID = await ThreeIdProvider.default.create({
  //   authId: "myAuthID",
  //   authSecret: seed,
  //   // See the section above about permissions management
  //   getPermission: (request) => Promise.resolve(request.payload.paths),
  // });
  // const did = new DID({
  //   // provider: threeID.getDidProvider(),
  //   provider: new Ed25519Provider(seed),
  //   resolver: {
  //     ...getResolver(ceramic),
  //   },
  // });

  // Authenticate the DID using the 3ID provider
  // await did.authenticate();

  // The Ceramic client can create and update streams using the authenticated DID
  // console.log(did);
})();

module.exports = app;
