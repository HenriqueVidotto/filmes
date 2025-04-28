import { check, param, validationResult } from 'express-validator';

export const validarRequest = (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, message: "Erro de validação", errors: errors.array() });
    }

    next();

}
export const validateId = [
    param("id").isHexadecimal().isLength({ min: 24, max: 24 }).withMessage("Formato de ID inválido"),
    validarRequest,
  ];


  export const validateUpdateFilme = [
    param("id")
      .isHexadecimal()
      .isLength({ min: 24, max: 24 })
      .withMessage("O ID deve ser um número inteiro válido maior que 0"),
    check("nome")
      .optional()
      .isLength({ max: 255 })
      .withMessage("O nome deve ter no máximo 255 caracteres"),
    check("nota")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("A nota deve ser um número entre 0 e 10"),
    check("descricao")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("A descrição deve ter no máximo 1000 caracteres"),
    check("genero")
      .optional()
      .isLength({ max: 255 })
      .withMessage("O gênero deve ter no máximo 255 caracteres"),
    check("data_lancamento")
      .optional()
      .isDate().withMessage("A data de lançamento deve ser uma data válida"),
    check("classificacao_etaria")
      .optional()
      .isInt({ min: 0 })
      .withMessage("A classificação etária deve ser um número inteiro positivo"),
    validarRequest,
  ];

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