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
const replaceTemplate = (template, element) => {
  let output = template.replace(/{%NAME%}/g, element.productName);
  output = output.replace(/{%IMAGE%}/g, element.image);
  output = output.replace(/{%FROM%}/g, element.from);
  output = output.replace(/{%NUTRIENTS%}/g, element.nutrients);
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);
  output = output.replace(/{%ID%}/g, element.id);

  if (!element.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
///////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // Overview Page
  if (pathName === "/overview" || pathName === "/") {
    const cards = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const cardsHtml = tempOverview.replace(/{%CARDS%}/g, cards);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(cardsHtml);
  }
  // Product Page
  else if (pathName === "/product") {
    res.end("This is Product page");
  }
  // API
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own": "Elango",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listemning to request on port: 8000");
});
