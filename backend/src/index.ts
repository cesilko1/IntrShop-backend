import express, { Express, Request, Response } from 'express';
import Config from './config';
import cors from 'cors';
import { connect } from 'mongoose';
import ip from 'ip';

import user from './routes/User.route';
import goods from './routes/Goods.route';
import sale from './routes/Sale.route'


const App: Express = express();

//options
const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
};

const CorsOptions = {
	origin: Config.origin,
	exposedHeaders: 'token'
}

const expressOptions = {
	extended: true
}

App.use(cors(CorsOptions));
App.use(express.urlencoded(expressOptions));
App.use(express.json());

App.use('/user', user);
App.use('/goods', goods);
App.use('/sale', sale);

// health check
App.get('/', (req: Request, res: Response)=>{
	res.sendStatus(200);
});

App.listen(Config.port, ()=>console.log(
`Running on: http://${ip.address()}:${Config.port}
Accepting from: ${CorsOptions.origin}
==========================================`
));

// ignored due to bug in mongoose
// @ts-ignore
connect(Config.db, mongooseOptions, ()=>console.log("connected to DB"));