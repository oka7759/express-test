const express = require("express");
const { check } = require("express-validator");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controller/place-controller");

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);
router.post(
  "/",
  [check("title").notEmpty(), check("creator").notEmpty()],
  createPlace
);
router.patch("/:pid", [check("title").notEmpty()], updatePlace);
router.delete("/:pid", deletePlace);

module.exports = router;
