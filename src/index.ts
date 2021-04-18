import express, { Request, Response, NextFunction } from 'express';
import { language_t, since_t, spoken_language_code_t } from './core/models/TrendingParams';
import { scrape } from './core/scraper';
const bodyParser = require('body-parser');

const DEBUG = !!process.env.DEBUG;

function log(...args: any): void{
  console.log(args);
}

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (request: Request, response: Response, next: NextFunction) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  next();
});

log(`Started ${DEBUG ? 'DEBUG' : 'PROD'} server!`);

app.get("/", (req: Request, res: Response) => {
  res.json({ RUNNING: "TRUE", MODE: DEBUG ? 'DEBUG' : 'PROD' });
});

app.get("/trending/:language?", (
  req: Request<
    { language: language_t }, {}, {},
    { since: since_t, spoken_language_code: spoken_language_code_t }
  >,
  res: Response) => {
  scrape({
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
  })
});


const PORT_NUMBER = 3000;
app.listen(process.env.PORT || PORT_NUMBER, function () {
  console.log(`Listening on https://localhost:${process.env.PORT || PORT_NUMBER}`);
});