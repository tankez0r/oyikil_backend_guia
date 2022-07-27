import multer from 'multer';

const path = require('path');

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './imagenesposts'); // TO-DO: Mirar routes please
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    }
);
const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(extension);

    if (mimeType && extname) {
        return cb(null, true);
    }
    cb('El tipo de archivos es incorrecto');
};
export const uploadImagePost = multer({ storage, fileFilter }).single('imagen');

