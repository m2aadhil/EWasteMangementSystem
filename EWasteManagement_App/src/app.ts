import express from 'express';
import bodyParser from 'body-parser';

//controllers
import * as HomeController from "./controllers/home.controller";
import * as DatabaseController from "./controllers/database.controller";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//configs
require('custom-env').env('dev')
app.set("port", process.env.PORT);

//application routes
app.get('/', (req, res) => {
    res.send('app works..!');
});
app.get("/home", HomeController.getInit);
app.get("/train/:type/:location/:epochs/:learningr", HomeController.train);
app.get("/testdb", DatabaseController.testDBConnection);
app.get("/getstatevalues", DatabaseController.getAllStateValues);
app.get("/getcountyvalues/:state", DatabaseController.getAllCountyValues);
app.get("/getpriceforloc/:address/:lat/:lng/:year/:citycode", HomeController.getPriceforLocation);
app.get("/getcities/:county", HomeController.getCities);

//HomeController.trainAll();
//DatabaseController.testCSV();

export default app;
