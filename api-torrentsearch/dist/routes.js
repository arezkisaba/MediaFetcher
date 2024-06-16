"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const OxTorrentProvider_1 = __importDefault(require("./torrentSearch/providers/OxTorrentProvider"));
const router = (0, express_1.Router)();
const torrentSearchService = tsyringe_1.container.resolve('ITorrentSearchService');
router.get('/torrents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchPattern = req.query.q;
        const results = yield torrentSearchService.getResults(searchPattern);
        return res.json(results);
    }
    catch (err) {
        const error = err;
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        });
    }
}));
router.get('/torrents/download', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torrentSearchUrl = req.query.q;
        const oxTorrentClient = new OxTorrentProvider_1.default();
        const downloadResponse = yield oxTorrentClient.download(atob(torrentSearchUrl));
        return res.json(downloadResponse);
    }
    catch (err) {
        const error = err;
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        });
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map