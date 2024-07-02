// import { Api } from "nocodb-sdk";
// const api = new Api({
//   baseURL: "https://app.nocodb.com",
//   headers: {
//     "xc-token": process.env.NOCODB_API_KEY
//   }
// })

// api.dbViewRow.list(
//   "noco",
//   "pm4z2ssobly3xgr",
//   "mdr598byvtzokok",
//   "vw8cm02uhhxf5bs2", {
//     "offset": 0,
//     "where": ""
// }).then(function (data) {
//   console.log(data);
// }).catch(function (error) {
//   console.error(error);
// });


function db() {
    console.log("Trayendonos la informacion de la tabla de NOCODB");
    // api.dbViewRow.list(
    //     "noco",
    //     "pm4z2ssobly3xgr",
    //     "mdr598byvtzokok",
    //     "vw8cm02uhhxf5bs2", {
    //       "offset": 0,
    //       "where": ""
    //   }).then(function (data) {
    //     console.log(data);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });
    const options = {
      method: 'GET',
      headers: {
        'xc-token': process.env.NOCODB_API_KEY
      }
    };
    
    fetch('https://app.nocodb.com/api/v2/tables/mdr598byvtzokok/records?offset=0&limit=25&where=&viewId=vw8cm02uhhxf5bs2', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
   
      
    }
    export { db };

