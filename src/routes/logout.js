import { Router } from 'express';
import { logout } from '../controllers/loginUser';
const router = Router();

router.post('/', logout);



export default router;
