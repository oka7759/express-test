const e = require("express");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const DUMMYDATA_USER = [
  {
    id: "u1",
    name: "홍길동",
    email: "test@test.com",
    password: "test123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMYDATA_USER });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("입력정보를 확인핫헤요", 422);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMYDATA_USER.find((p) => p.email === email);
  if (hasUser) {
    throw new HttpError("아이디가 존재합니다", 411);
  }
  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  DUMMYDATA_USER.push(createdUser);
  res.status(201).json(createdUser);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMYDATA_USER.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("로그인정보를 확인하세요", 401);
  }
  res.json({ msg: "로그인완료" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
