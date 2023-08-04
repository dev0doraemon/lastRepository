import Sequelize, {
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

class Show extends Model<InferAttributes<Show>, InferCreationAttributes<Show>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare showTime: Date;
    declare maxSeats: number;
    // declare createdAt: CreationOptional<Date>;
    // declare updatedAt: CreationOptional<Date>;
    // declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        Show.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
                showTime: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                maxSeats: {
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
                modelName: "Show",
                tableName: "shows",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Show.hasMany(db.Seat, { foreignKey: "showId", sourceKey: "id" });
        db.Show.hasMany(db.Reservation, {
            foreignKey: "showId",
            sourceKey: "id",
        });
    }
}

export default Show;
