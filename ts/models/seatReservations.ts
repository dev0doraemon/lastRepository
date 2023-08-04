import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class SeatReservation extends Model<
    InferAttributes<SeatReservation>,
    InferCreationAttributes<SeatReservation>
> {
    declare id: CreationOptional<number>;
    declare reservationId: number;
    declare seatId: number;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        SeatReservation.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                reservationId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                seatId: {
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
                modelName: "SeatReservation",
                tableName: "seatReservation",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.SeatReservation.belongsTo(db.Seat, {
            foreignKey: "seatId",
            targetKey: "id",
        });
        db.SeatReservation.belongsTo(db.Reservation, {
            foreignKey: "reservationId",
            targetKey: "id",
        });
    }
}

export default SeatReservation;
