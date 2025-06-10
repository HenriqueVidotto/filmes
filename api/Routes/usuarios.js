import express from 'express';
import { efetuaLogin, insereUsuario } from '../Controller/usuarios.js';
import { validateUsuario,checkEmailDuplicado } from '../Middleware/validations.js';


const router = express.Router();

router.post('/',checkEmailDuplicado,validateUsuario, insereUsuario);


//validar login
router.post('/login',efetuaLogin);



export default router