import express, { Request, Response, NextFunction } from 'express';
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



const PORT_NUMBER = 3000;
app.listen(process.env.PORT || PORT_NUMBER, function () {
  console.log(`Listening on https://localhost:${process.env.PORT || PORT_NUMBER}`);
});