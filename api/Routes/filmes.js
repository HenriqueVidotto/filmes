import express from 'express';

import { createFilme,getFilmeById,deleteFilme,updateFilme,getAllFilmes,getAllFilmesByAno } from '../Controller/filmes.js';
import {validateFilme, validateId, validateUpdateFilme} from "../Middleware/validations.js"

import auth from "../Middleware/auth.js"

const router = express.Router();

router.get('/getByAno', getAllFilmesByAno);
router.post('/', validateFilme, createFilme);
router.get('/:id',validateId, getFilmeById);
router.get('/', getAllFilmes);

router.delete('/:id',validateId, deleteFilme);
router.put('/:id',validateUpdateFilme, updateFilme);


export default router