// The node version of PouchDB (without browser stuff)
const PouchDB = require("pouchdb-node");
const expressPouchDB = require("express-pouchdb");

const PrefixedPouch = PouchDB.defaults({
  prefix: "db/", // All PouchDB data will be stored in the directory ./db/*
});

module.exports = function (app) {
  const pouchDB = expressPouchDB(PrefixedPouch);
  app.use("/db", pouchDB);
};
