const express = require("express");

const {
  getPlaceById,
  getUserById,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controller/place-controller");

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getUserById);
router.post("/", createPlace);
router.patch("/:pid", updatePlace);
router.delete("/:pid", deletePlace);

module.exports = router;
