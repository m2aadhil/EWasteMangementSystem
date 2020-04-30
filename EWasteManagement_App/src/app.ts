import express from 'express';
import bodyParser from 'body-parser';
import { enviorenment } from './config';
import router from "./rotues"

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

//configs
app.set("port", enviorenment.PORT);

//application routes
app.get('/', (req, res) => {
    res.send('app works..!');
});

//app.get("/home", HomeController.getInit);


export default app;
