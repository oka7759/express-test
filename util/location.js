require("dotenv").config();
const axios = require("axios");
const { urlencoded } = require("body-parser");
const e = require("express");

const API_KEY = process.env.GOOGEL_API_KEY;

async function getCoordsForAddress(address) {
  console.log(API_KEY);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new Error("주소를 조회할수 없음", 422);
    throw error;
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
