import { createPost, getPosts, deletePost, editPost, getPost } from '../controllers/PostsController';
import { uploadImagePost } from '../middleware/fileUploader';
import authorization from '../middleware/authorization';
import { Router } from 'express';




const router = Router();

router.post('/', authorization, uploadImagePost, createPost); //TO-DO Crear 2 tipos de imagenes, original y una para el swiper
router.get('/', getPosts);
router.get('/:ID', getPost);
router.delete('/:ID', authorization, deletePost);
router.put('/:ID', authorization, uploadImagePost, editPost);


export default router; 