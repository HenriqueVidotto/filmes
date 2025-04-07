import express from 'express';

import { createFilme,getFilmeById,deleteFilme,updateFilme } from '../Controller/filmes.js';
import {validateFilme} from "../Middleware/validations.js"

const router = express.Router();

router.post('/', validateFilme, createFilme);
router.get('/filmes/:id', getFilmeById);
router.delete('/filmes/:id', deleteFilme);
router.put('/filmes/:id',validateFilme, updateFilme);


export default router