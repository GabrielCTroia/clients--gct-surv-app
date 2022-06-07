// The node version of PouchDB (without browser stuff)
const PouchDB = require("pouchdb-node");
const expressPouchDB = require("express-pouchdb");

const PrefixedPouch = PouchDB.defaults({
  prefix: "db/", // All PouchDB data will be stored in the directory ./db/*
});

module.exports = function (app) {
  const pouchDB = expressPouchDB(PrefixedPouch);
  // app is the Create-React-App dev server.
  // Our databases will be available at http://localhost:3000/db/*
  app.use("/db", pouchDB);

  console.log('pouchdb', PrefixedPouch);

  // PrefixedPouch.db.changes({
  //   since: "now",
  // })
  //   .on("change", function (change) {
  //     console.log("db changes", change);
  //     // received a change
  //   })
  //   .on("error", function (err) {
  //     console.log("db change error", err);
  //     // handle errors
  //   });
};
