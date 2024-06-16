"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Welcome to the Torrent Search API!');
});
router.get('/search', (req, res) => {
    const query = req.query.q;
    // Implement your torrent search logic here
    res.send(`Searching for torrents related to: ${query}`);
});
exports.default = router;
