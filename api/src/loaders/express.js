const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = expressApp => {
  expressApp
    .use(express.json())
    .use(cookieParser())
    .use(express.urlencoded({ extended: false }));
};
