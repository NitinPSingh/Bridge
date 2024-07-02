"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoints = exports.uri = void 0;
var uri = "https://aggregator-api.xy.finance/v1";
exports.uri = uri;
var endpoints = {
  getQuotes: "quote",
  getParams: "",
  getSupportedTokens: "supportedBridgeProviders"
};
exports.endpoints = endpoints;