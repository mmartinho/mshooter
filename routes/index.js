const express = require('express');
const pce = require('./pce-route');

module.exports = (app) => {
    app.use(express.json());
    app.use(pce);
}