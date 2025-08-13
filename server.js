const http = require("http");
const PORT = 8080;
const server = http.createServer(
  (req,
  (res) => {
    const { method, url, headers } = req;
    if (method === "GET") {
      if (headers.host === "localhost:8080") {
        switch (url) {
          case "/":
            // display index.html
            break;
          case "/about":
            // display about.html
            break;
          case "/contact-me":
            // display contact-me.html
            break;
          default:
          // display 404.html
        }
      }
    }
  }),
);
