import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class Point extends Model<
    InferAttributes<Point>,
    InferCreationAttributes<Point>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare reservedId: number;
    declare point: number;
    declare reason: string;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Point.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                reservedId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                point: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                reason: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                // createdAt: Sequelize.DATE,
                // updatedAt: Sequelize.DATE,
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Point",
                tableName: "points",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Point.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
        db.Point.belongsTo(db.Reservation, {
            foreignKey: "reservationId",
            targetKey: "id",
        });
    }
}

export default Point;
