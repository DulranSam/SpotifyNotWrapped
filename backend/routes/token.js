const express = require("express");
const router = express.Router();
const Axios = require("axios");
require("dotenv").config();
let outcome;
const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

const fs = require("fs");
const { join } = require("path");

router
  .route("/")
  .get((req, res) => {
    res.json({
      Alert:
        "Please make an post request to this URL to grab the access Token and proceed", // (/tracks for toptracks and /artists for top artists)
    });
  })
  .post(async (req, res) => {
    try {
      const response = await Axios.post(
        "https://accounts.spotify.com/api/token",
        `grant_type=client_credentials`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: clientID,
            password: clientSecret,
          },
        }
      );

      outcome = response.data.access_token; // Assign the value directly

      res.json(outcome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.route("/artist").get(async (req, res) => {
  try {
    const { accessToken } = req.params;

    const artistResponse = await Axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer  ${accessToken}`,
        },
      }
    ).then((r) => {
      res.json(r.data);
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from the server." });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.route("/tracks").get((req, res) => {
  async (req, res) => {
    try {
      const { accessToken } = req.params;

      const artistResponse = await Axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer  ${accessToken}`,
          },
        }
      ).then((r) => {
        res.json(r.data);
      });
    } catch (error) {
      console.error(error);

      if (error.response) {
        res.status(error.response.status).json({ error: error.response.data });
      } else if (error.request) {
        res
          .status(500)
          .json({ error: "No response received from the server." });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
});

module.exports = router;
