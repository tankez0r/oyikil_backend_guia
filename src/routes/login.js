import { Router } from 'express';
import { login } from '../controllers/loginUser';
import logedin from '../middleware/logedin';
const router = Router();

router.post('/', login);
router.get('/', logedin);



export default router;
