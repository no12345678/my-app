const port = 3000;

var cors = require('cors')
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
(async () => {

  try {
    const server = express();
    setSession();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(cors());

    setRoutes();

    server.get("/connect", (req, res) => {
      if (req.session.user == null) {
        req.session.user = { name: "Maor Edri" };
      }

      res.send({ out: "connected!" });
    });

    function setSession() {
      server.use(
        session({
          secret: "my-example-session",
          cookie: {
            maxAge: 10000000000000,
          },
        })
      );
    }

    function setRoutes() {
      const screenRoutes = require("./routes/screen");
      server.use("/screen", screenRoutes);
    }

    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
