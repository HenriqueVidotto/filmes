import express from 'express';

import { createFilme,getFilmeById,deleteFilme,updateFilme,getAllFilmes } from '../Controller/filmes.js';
import {validateFilme} from "../Middleware/validations.js"

const router = express.Router();

router.post('/', validateFilme, createFilme);
router.get('/:id', getFilmeById);
router.get('/', getAllFilmes);
router.delete('/:id', deleteFilme);
router.put('/:id',validateFilme, updateFilme);


export default router