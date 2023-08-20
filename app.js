const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const placesRoutes = require("./routes/places-routes");

const app = express();
app.use(bodyParser.json());

app.use("/api/place", placesRoutes);
app.use((req, res, next) => {
  throw new HttpError("없음 라우트", 404);
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "ㅇ에러임" });
});

app.listen(3000);
