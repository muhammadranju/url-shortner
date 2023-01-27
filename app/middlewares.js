const express = require("express");
const morgan = require("morgan");
const middlewares = [
    express.json(),
    express.urlencoded({ extended: true }),
    // morgan("dev"),
];

module.exports = middlewares;
