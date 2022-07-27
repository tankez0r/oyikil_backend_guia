import sequelize from 'sequelize';
import { conChain } from '../database/database';

const personasModel = conChain.define('tabla_cliente',
    {
        codigo: {
            type: sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: sequelize.TEXT
        },
        domicilio: {
            type: sequelize.TEXT
        },
        telefono: {
            type: sequelize.STRING
        }
    }, {
        timestamps: false
    }
);

export default personasModel;