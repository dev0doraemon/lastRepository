import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class Seat extends Model<InferAttributes<Seat>, InferCreationAttributes<Seat>> {
    declare id: CreationOptional<number>;
    declare showId: number;
    declare seatNumber: number;
    declare grade: string;
    declare price: number;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Seat.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                showId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                seatNumber: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                grade: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                // createdAt: Sequelize.DATE,
                // updatedAt: Sequelize.DATE,
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Seat",
                tableName: "seats",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Seat.hasMany(db.SeatReservation, {
            foreignKey: "seatId",
            sourceKey: "id",
        });
        db.Seat.belongsTo(db.Show, { foreignKey: "showId", targetKey: "id" });
    }
}

export default Seat;
