import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare nickname: string;
    declare password: string;
    declare email: string;
    declare isAdmin: boolean;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        User.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
                nickname: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                // createdAt: Sequelize.DATE,
                // updatedAt: Sequelize.DATE,
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Reservation, {
            foreignKey: "userId",
            sourceKey: "id",
        });
        db.User.hasMany(db.Point, { foreignKey: "userId", sourceKey: "id" });
    }
}

export default User;
