"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scraper_1 = require("./core/scraper");
const bodyParser = require('body-parser');
const DEBUG = !!process.env.DEBUG;
function log(...args) {
    console.log(args);
}
const app = express_1.default();
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    next();
});
log(`Started ${DEBUG ? 'DEBUG' : 'PROD'} server!`);
app.get("/", (req, res) => {
    res.json({ RUNNING: "TRUE", MODE: DEBUG ? 'DEBUG' : 'PROD' });
});
app.get("/trending/:language?", (req, res) => {
    scraper_1.scrape({
        language: req.params.language,
        since: req.query.since,
        spoken_language_code: req.query.spoken_language_code
    }).then(repos => {
        res.json({
            status: 'OK',
            data: repos
        });
    }).catch(err => {
        res.json({
            status: 'ERR',
            data: err
        });
    });
});
const PORT_NUMBER = 3000;
app.listen(process.env.PORT || PORT_NUMBER, function () {
    console.log(`Listening on https://localhost:${process.env.PORT || PORT_NUMBER}`);
});
