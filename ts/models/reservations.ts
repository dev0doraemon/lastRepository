import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class Reservation extends Model<
    InferAttributes<Reservation>,
    InferCreationAttributes<Reservation>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare showId: number;
    declare isCanceled: boolean;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Reservation.init(
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
                showId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                isCanceled: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },
                // createdAt: Sequelize.DATE,
                // updatedAt: Sequelize.DATE,
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Reservation",
                tableName: "reservations",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Reservation.hasMany(db.Point, {
            foreignKey: "reservationId",
            sourceKey: "id",
        });

        db.Reservation.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
        db.Reservation.belongsTo(db.Show, {
            foreignKey: "showId",
            targetKey: "id",
        });
    }
}

export default Reservation;
