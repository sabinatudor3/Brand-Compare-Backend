var express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/", async (req, res) => {
  res = await axios
    .post(
      "https://app.socialinsider.io/api?projectname=API_test",
      {
        jsonrpc: "2.0",
        id: 0,
        method: "socialinsider_api.get_brands",
        params: {
          projectname: "API_test",
        },
      },
      {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer API_KEY_TEST",
        },
      }
    )
    .then((response) => {
      res.send(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/detail/:id/:profiletype", async (req, res) => {
  const reqId = req.params.id;
  const reqProfileType = req.params.profiletype;
  res = await axios
    .post(
      "https://app.socialinsider.io/api?projectname=API_test",
      {
        id: 1,
        method: "socialinsider_api.get_profile_data",
        params: {
          id: reqId,
          profile_type: reqProfileType,
          date: {
            start: 1608209422374,
            end: 1639745412436,
            timezone: "Europe/London",
          },
        },
      },
      {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer API_KEY_TEST",
        },
      }
    )
    .then((responseInd) => {
      res.send(responseInd.data.resp);
      console.log(responseInd);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
