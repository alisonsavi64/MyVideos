import WriteFilesAdapter from "./infra/adapter/write-files-adapter";
import PostgreSQLConnection from "./infra/database/PostgreSQLConnection";
import ExpressHttp from "./infra/http/ExpressHttp";
import Router from "./infra/http/Router";
import ExpressAuth from "./infra/middleware/AuthExpress";
import DatabaseRepositoryFactory from "./infra/repository/DatabaseRepositoryFactory";
import { config } from "dotenv";

config()
const HTTP_PORT = parseInt(process.env.HTTP_PORT ?? '5000');
if (isNaN(HTTP_PORT)) throw new Error("Invalid HTTP_PORT");

const connection = new PostgreSQLConnection({
    user: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || ''
});

const writeFileAdapter = new WriteFilesAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection, writeFileAdapter);

const auth = new ExpressAuth();
const http = new ExpressHttp(auth);

const router = new Router(http, repositoryFactory);
router.init();
http.listen(HTTP_PORT);
console.log('Running...');