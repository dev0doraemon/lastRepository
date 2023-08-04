import dotenv from "dotenv";
dotenv.config();

import { Options } from "sequelize/types";

// interface DBAccessRequired {
//     username: string | undefined;
//     password: string | undefined;
//     database: string | undefined;
//     host: string | undefined;
//     dialect: string;
// }

const development: Options = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
};

const test: Options = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_TEST,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
};

const production: Options = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
};

export { development, production, test };
