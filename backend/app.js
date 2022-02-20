var { CeramicClient } = require("@ceramicnetwork/http-client")
var { DID } = require("dids")
var { Integration } = require("lit-ceramic-sdk")
var KeyDidResolver = require("key-did-resolver")
var ThreeIdResolver = require("@ceramicnetwork/3id-did-resolver")
var LitJsSdk = require("lit-js-sdk/build/index.node.js")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var window = global;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Setup Ceramic
const API_URL = "127.0.0.1:7007";
const ceramic = new CeramicClient(API_URL)
let litCeramicIntegration = new Integration("127.0.0.1:7007")

const resolver = KeyDidResolver.getResolver(ceramic)
//const resolver = {...ThreeIdResolver.getResolver(ceramic)}
const did = new DID({ resolver })
window.did = did

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
});

// Buyer Condition
const buyerAccessControlConditions = [
  {
    contractAddress: "0x8fDc07B1886e35CAc8928f0aE91100B0e7beEbeA",
    standardContractType: "",
    chain: "mumbai",
    method: "getBuyer",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: "=",
      value: "0x839B878873998F02cE2f5c6D78d1B0842e58F192",
    },
  },
];

const sellerAccessControlConditions = [
  {
    contractAddress: "0x8fDc07B1886e35CAc8928f0aE91100B0e7beEbeA",
    standardContractType: "",
    chain: "mumbai",
    method: "getBuyer",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: "=",
      value: "0x839B878873998F02cE2f5c6D78d1B0842e58F192",
    },
  },
];
// Seller Condition
(async () => {
	//const test = await app.locals.litNodeClient.connect();
	//console.log(test);
	litCeramicIntegration.startLitClient(window)
})();



module.exports = app;
