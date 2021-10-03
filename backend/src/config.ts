import IConfig from './interfaces/Config';
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

// production config
const Config: IConfig = {
	dev         : false,
	origin      : 'https://intrshop.raska-vilem.cz',
	port        : Number(process.env.VIRTUAL_PORT),
	mode        : env,
	db          : String(process.env.DB_STRING),
	token       : String(process.env.TOKEN),
	saltFactor  : 10
}

// development config
if(env == 'development') {
	Config.dev       = true;
	Config.origin    = "*";
	Config.port      = 3003;
	Config.dev_delay = 0;
	Config.db        = 'mongodb://localhost:27017/intrshop';
}

// throw errors in production mode
if(env == 'production') {
	if(!process.env.VIRTUAL_PORT) throw new Error("undefined variable VIRTUAL_PORT");
	if(!process.env.DB_STRING)    throw new Error("undefined variable DB_STRING");
	if(!process.env.TOKEN)        throw new Error("undefined variable TOKEN");
}

export default Config;
