const uuid = require("uuid");
const HttpError = require("../models/http-error");

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

const getUserById = (req, res, next) => {
  const placeId = req.params.uid;
  const place = DUMMYDATA.find((p) => {
    return p.creator === placeId;
  });
  if (!place) {
    return next(new HttpError("사람 못찾음", 404));
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, creator } = req.body;
  const createPlace = {
    id: uuid.v4(),
    title,
    creator,
  };
  DUMMYDATA.push(createPlace);
  res.status(201).json(createPlace);
};

const updatePlace = (req, res, next) => {
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
exports.getUserById = getUserById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
