import { Api } from "nocodb-sdk";
const api = new Api({
  baseURL: "https://app.nocodb.com",
  headers: {
    "xc-token": process.env.NOCODB_API_KEY
  }
})

api.dbViewRow.list(
  "noco",
  "pm4z2ssobly3xgr",
  "mdr598byvtzokok",
  "vw8cm02uhhxf5bs2", {
    "offset": 0,
    "where": ""
}).then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.error(error);
});


async function db() {
    console.log("Trayendonos la informacion de la tabla de NOCODB");
    const dblistrecords = api.dbViewRow.list(
        "noco",
        "pm4z2ssobly3xgr",
        "mdr598byvtzokok",
        "vw8cm02uhhxf5bs2", {
          "offset": 0,
          "where": ""
      });
      console.log(dblistrecords);
   
      
    }
    export { db };

