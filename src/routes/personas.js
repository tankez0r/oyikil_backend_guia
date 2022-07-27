import { Router } from 'express';
import {getTelefono, getNombre, getTelefonos } from '../controllers/personasController';


const router = Router();


// obtener todos los telefonos
router.get('/', getTelefonos);
// obtener telefonos por nombre o numero
router.get('/nombre/:nombre', getNombre);
router.get('/telefono/:telefono', getTelefono);

export default router;
