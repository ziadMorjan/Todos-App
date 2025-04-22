const express = require('express');
const CustomError = require('./../utils/CustomError');

let router = express.Router();

router.all("*", (req, res) => {
    throw new CustomError(`Can't find ${req.originalUrl} on this server!`, 404);
});

module.exports = router;