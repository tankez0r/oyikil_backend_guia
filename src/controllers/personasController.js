import personasModel from '../models/personasModel';
import { Op } from 'sequelize/dist';

export const getTelefonos = (req, res, next) => {
    // paginador de resultados, limitar a 200
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    // si size es mayor que 20 o no es Not a Number
    // size toma el valor del request param. Nunca puede ser menor que 20
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 10) {
        size = sizeAsNumber;
    }
    // funcion para contar paginas y dar pagina actual

    const getPagingData = (data, page, limit) => {
        const { count: cantidadPersonas, rows: personas } = data;
        const paginaActual = page ? +page : 0;
        const paginas = Math.ceil(cantidadPersonas / limit);
        return { cantidadPersonas, personas, paginas, paginaActual };
    };
    //

    personasModel.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [['nombre', 'asc']]
    }).
        then(telefono => {
            const response = getPagingData(telefono, page, size);
            res.send(response);
        })
        .catch(err => next(err));


};

export const getNombre = (req, res, next) => {

    //deconstruccion de param para separar nombre/apellido
    const { nombre } = req.params;
    const nombreCompleto = nombre.split(' ');
    const apellido = nombreCompleto[1];
    const primerNombre = nombreCompleto[2];



    personasModel.findAll({
        // limitacion y tamaño por pagina  
        limit:20,
        // opciones or, buscan por nombre-apellido, apellido-nombre y nombre o apellido 
        where: {
            [Op.or]:
                [

                    { nombre: { [Op.like]: `%${apellido}%` } },
                    { nombre: { [Op.like]: `%${apellido}` } },
                    { nombre: { [Op.like]: `${apellido}%` } },
                    { nombre: { [Op.like]: `%${primerNombre}%` } },
                    { nombre: { [Op.like]: `%${primerNombre}` } },
                    { nombre: { [Op.like]: `${primerNombre}%` } },
                    { nombre: { [Op.like]: `%${nombre}%` } }
                ]
        },
    }).then(persona => {
        if (persona) {
            res.status(200).json({
                data: persona
            });
        }
        else {
            res.status(404).send({ error: 'persona inexistente' });
        }
    })
        .catch(err => next(err));
};

export const getTelefono = (req, res, next) => {

    const { telefono } = req.params;
    personasModel.findAll({
        limit:20,
        where: {
            telefono:
                { [Op.like]: `%${telefono}%` }
        },
    }).then(persona => {
        if (persona) {
            res.status(200).json({
                data: persona
            });
        }
        else {
            res.status(404).send({ error: 'telefono inexistente' });
        }
    })
        .catch(err => next(err));
};
