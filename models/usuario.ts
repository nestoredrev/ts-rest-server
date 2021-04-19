import { DataTypes, DATEONLY } from "sequelize";
import db from "../db/connection";

const Usuario = db.define('Usuario', {
    id_usuario : {
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
});

export default Usuario;