import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import * as config from "./../../config/config";

interface DB {
    [key: string]: any
}
const db: DB = {};

let sequelize: Sequelize.Sequelize;

sequelize = new Sequelize.Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
        host: config[env].host,
        dialect: "mysql"
    }
);

console.log("dirSync:", fs.readdirSync(__dirname));

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".ts" &&
            file.indexOf(".test.ts") === -1
        );
    })
    .forEach((file) => {
        // const model = require(path.join(__dirname, file))(
        //     sequelize,
        //     Sequelize.DataTypes
        // );
        // console.log(file);
        // console.log(`file: ${file}`);
        // import * as model from path.join(__dirname, file)
        const model = require(path.join(__dirname, file));
        // console.log(model.default.name);
        db[model.default.name] = model.default;
        model.default.initiate(sequelize);
        
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;
