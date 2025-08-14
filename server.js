const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 8080;

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const htmlDirectory = path.join(__dirname, "views");

function serveHtmlFile(res, fileName) {
  const filePath = path.join(htmlDirectory, fileName);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}:`, err.message);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Page Not Found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charest=utf-8",
    });
    res.end(data);
  });
}

function send404(res) {
  const notFoundHtmlPath = path.join(htmlDirectory, "404.html");
  fs.readFile(notFoundHtmlPath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error Reading File 404.html`);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Page Not Found");
    }
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;

  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("405 - Method Not Allowed");
    return;
  }
  if (routes.hasOwnProperty(pathName)) {
    const fileName = routes[pathName];
    serveHtmlFile(res, fileName);
  } else {
    send404(res);
  }
});

server.listen(PORT);
server.on("error", (err) => {
  console.error("Server error", err);
});
