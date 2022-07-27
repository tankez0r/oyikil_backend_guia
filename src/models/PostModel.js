// TO-DO: Crear modelo para crear y modificar los posteos de la pagina principal + crear pagina para administrar la misma

import sequelize from 'sequelize';
import { conChain } from '../database/database';

const postModel = conChain.define('post',
    {
        ID: {
            type: sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        titulo: {
            type: sequelize.TEXT,
            allowNull: false

        },
        subtitulo: {
            type: sequelize.TEXT,
            allowNull: false
        },
        imagen: {
            type: sequelize.TEXT,
            allowNull: false
        },
        pie_imagen: {
            type: sequelize.TEXT,
        }, 
        contenido: {
            type: sequelize.TEXT,
            allowNull: false
        },
        fecha: {
            type: sequelize.TEXT,
            allowNull: false

            
            
        }
    }, {
        timestamps: false
    }
);

export default postModel;