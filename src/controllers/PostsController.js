import postModel from '../models/PostModel';
import * as fs from 'fs';

// TO-DO: acomodar todo el controller para post

export const createPost = (req, res, next) => {
    const { titulo, subtitulo, pie_imagen, contenido } = req.body;
    const imagen = req.file.path;
    const fecha = new Date().toLocaleDateString();

    postModel.create({
        titulo, subtitulo, imagen, pie_imagen, contenido, fecha
    }, {
        fields: ['titulo', 'subtitulo', 'imagen', 'pie_imagen', 'contenido', 'fecha']
    }).then(newPost => {
        if (newPost) {
            res.status(201).json({
                message: 'el post se ha creado satisfactoriamente',
                data: newPost
            });
        }
    }).catch((err) => {
        next(err);
    });

};

export const getPosts = (req, res, next) => {

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 4;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 4) {
        size = sizeAsNumber;
    }

    const getPagingData = (data, page, limit) => {
        const { count: cantidadPosts, rows: post } = data;
        const paginaActual = page ? +page : 0;
        const paginas = Math.ceil(cantidadPosts / limit);
        return { cantidadPosts, post, paginas, paginaActual };
    };
    // separador entre logica y tarea
    postModel.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [['ID', 'ASC']]
    })

        .then(pageOfPosts => res.status(200).json({
            data: getPagingData(pageOfPosts, page, size),
            pages: page * size
        }))
        .catch(err => next(err));
};

export const getPost = (req, res, next) => {
    const { ID } = req.params;

    postModel.findOne({
        where: { ID }
    }).then(model => res.status(200).json({
        data: model
    })).catch(err => next(err));
};

export const deletePost = async (req, res, next) => {
    const { ID } = req.params;
    await postModel.findAll({
        where: { ID }
    }).then(post => {
        if (post) {
            post.forEach(data => { fs.unlink(data.imagen, () => { console.log(`${data._previousDataValues.imagen} fue eliminado del FS`); }); });
        }

    });
    postModel.destroy({
        where: { ID }
    }).then(deleted => {
        if (deleted > 0)
            res.status(410).json({
                message: 'el elemento ha sido eliminado correctamente',
                data: deleted
            });
        else {
            res.status(400).json({ error: 'no se ha encontrado entrada' });
        }
    }
    ).catch(err => next(err));


};

export const editPost = (req, res, next) => {
    const { ID } = req.params;
    console.log(req.params);
    const imagen = req.file?.path;
    const { titulo, subtitulo, pie_imagen, contenido } = req.body;
    //TO-DO crear un middleware para eliminar y reemplazar imagen si es necesario y agregar en router
    postModel.findAll({
        attributes: ['ID', 'titulo', 'subtitulo', 'imagen', 'pie_imagen', 'contenido'],
        where: { ID }
    })
        .then(post => {
            if (post.length > 0) {
                post.forEach(data => { imagen ? fs.unlink(data.imagen, () => { console.log(`${data._previousDataValues.imagen} fue eliminado del FS`); }) : null; });
                post.forEach(data => {
                    data.update({
                        titulo, subtitulo, imagen, pie_imagen, contenido
                    });
                });
            }
            else {
                res.status(404).send({ error: 'id inexistente' });
            }
        }).then(post_final => res.status(202).json({
            message: 'el post fue editado correctamente',
            data: post_final
        })).catch(err => next(err));
};
