const fs = require("fs");
const http = require("http");
///////////////////////////
// FILES
// Blocking-synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

// Non-blocking: async way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}.\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });
// console.log("Will Read File!!!!");

///////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  res.end("Hello from the node server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listemning to request on port: 8000");
});
