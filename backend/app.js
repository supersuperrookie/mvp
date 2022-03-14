// Ceramic Dependencies

let { CeramicClient } = require("@ceramicnetwork/http-client");

// DID Dependencies

const { randomBytes } = require("crypto");
const { fromString, toString } = require("uint8arrays");
const { DID } = require("dids");

const ThreeIdProvider = require("3id-did-provider");
// const KeyDidResolver = require("key-did-resolver");
const { getResolver } = require('@ceramicnetwork/3id-did-resolver')


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

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
app.use("/users", usersRouter);

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
    seed = new Uint8Array(randomBytes(32));
    console.log(`Created seed: ${toString(seed, "base16")}`);
  }
  return seed;
};

(async () => {

  const API_URL = "https://ceramic-clay.3boxlabs.com";
  const ceramic = new CeramicClient(API_URL);
  const seed = getSeed();
  const threeID = await ThreeIdProvider.default.create({
    authId: "myAuthID",
    authSecret: seed,
    // See the section above about permissions management
    getPermission: (request) => Promise.resolve(request.payload.paths),
  });
  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: {
      ...getResolver(ceramic),
    },
  });

  // Authenticate the DID using the 3ID provider
  await did.authenticate();

  // The Ceramic client can create and update streams using the authenticated DID
  console.log(did);
})();

module.exports = app;
