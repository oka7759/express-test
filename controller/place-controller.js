const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMYDATA = [{ id: "p1", title: "63빌딩", creator: "u1" }];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMYDATA.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("장소를 못찾음", 404);
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMYDATA.filter((p) => {
    return p.creator === userId;
  });
  if (!place || place.length === 0) {
    return next(new HttpError("사람 못찾음", 404));
  }
  res.json({ place });
};

const createPlace = async (req, res, next) => {
  console.log("여기");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("입력정보를 확인핫헤요", 422));
  }
  const { title, creator, address } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createPlace = {
    id: uuid.v4(),
    title,
    address: coordinates,
    creator,
  };
  DUMMYDATA.push(createPlace);
  res.status(201).json(createPlace);
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("입력정보를 확인핫헤요", 422);
  }
  const placeId = req.params.pid;
  const { title } = req.body;

  const updatePlace = { ...DUMMYDATA.find((p) => p.id === placeId) };
  const targetIdx = { ...DUMMYDATA.findIndex((p) => p.id === placeId) };
  updatePlace.title = title;

  DUMMYDATA[targetIdx] = updatePlace;

  res.status(200).json({ DUMMYDATA });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMYDATA = DUMMYDATA.filter((p) => p.id !== placeId);

  res.status(200).json({ msg: "삭제완료" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
