import { check, param, validationResult } from 'express-validator';

export const validarRequest = (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, message: "Erro de validação", errors: errors.array() });
    }

    next();

}


// Validações para o filme
export const validateFilme = [
    check('nome').notEmpty().withMessage('O campo nome deve ser preenchido'),
    check('nota').notEmpty().withMessage('O campo nota deve ser preenchido')
        .isFloat({ min: 0, max: 10 }).withMessage('A nota deve estar entre 0 e 10'),
    check('descricao').notEmpty().withMessage('O campo descricao deve ser preenchido'),
    check('genero').notEmpty().withMessage('O campo genero deve ser preenchido'),
    check('data_lancamento').notEmpty().withMessage('O campo data_lancamento deve ser preenchido')
        .isDate().withMessage('A data de lançamento deve ser uma data válida'),
    //aplica as validações
    validarRequest
]