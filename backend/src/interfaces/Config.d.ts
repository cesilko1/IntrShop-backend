export default interface IConfig {
	dev: boolean;
	origin: string;
	port: number;
	mode: string;
	db: string;
	token: string;
	dev_delay?: number;
	saltFactor: number;
}