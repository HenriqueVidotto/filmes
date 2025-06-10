import { check, param, validationResult } from 'express-validator';

import { ObjectId } from 'mongodb';



export const validarRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Erro de validação",
        errors: errors.array(),
      });
  }

  next();
};
export const validateId = [
    param("id").isMongoId().isLength({ min: 24, max: 24 }).withMessage("Formato de ID inválido"),
    validarRequest,
  ];


  export const validateUpdateFilme = [
    param("id")
      .isMongoId()
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
      .isInt({ min: 0, max: 18 })
      .withMessage("A classificação etária deve ser um número inteiro positivo entre 0 e 18"),
    validarRequest
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
    check("classificacao_etaria")
      .optional()
     .isInt({ min: 0, max: 18 })
      .withMessage("A classificação etária deve ser um número inteiro positivo entre 0 e 18"),
    //aplica as validações
    validarRequest
]


export const validateUsuario = [
  check('nome')
    .not().isEmpty().trim().withMessage('É obrigatório informar o nome')
    .isAlpha('pt-BR',{ignore:' '}).withMessage('Informe apenas texto')
    .isLength({min:3}).withMessage('Informe no mínimo 3 caracteres')
    .isLength({max:100}).withMessage('Informe no máximo 100 caracteres'),
  check('email')
    .not().isEmpty().trim().withMessage('É obrigatório informar o email')
    .isEmail().withMessage('Informe um email válido')  
    .isLowercase().withMessage('Não são permitidas maiúsculas')
    /*.custom((value, {  })=> {
      return db.collection('usuarios')
             .find({email: {$eq: value}}).toArray()
             .then((email) => {
              //Verifica se não existe o Id para garantir que é inclusão
              if(email.length){
                return Promise.reject(`o email ${value} já existe!`)
              }
             })
    })*/,
    check('senha')
      .not().isEmpty().trim().withMessage('A senha é obrigatória')
      .isLength({min:6}).withMessage('A senha deve ter no mínimo 6 caracteres')
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1, minUppercase: 1,
        minSymbols: 1, minNumbers: 1
      }).withMessage('A senha não é segura. Informe no mínimo 1 caractere maiúsculo, 1 minúsculo, 1 número e 1 caractere especial'),
    check('ativo')
      .default(true)
      .isBoolean().withMessage('O valor deve ser um booleano'),
    check('tipo')
      .default('Cliente')
      .isIn(['Cliente','Admin']).withMessage('O tipo deve ser Admin ou Cliente'),
    check('avatar')
      .optional({nullable: true})
      .isURL().withMessage('A URL do Avatar é inválida'),
  //Aplica as validações
  validarRequest     
]


export const checkEmailDuplicado = async (req, res, next) => {
  const db = req.app.locals.db
  const email = req.body.email

  if (!email) return next() // evita erro se o campo nem foi enviado

  try {
    const existe = await db.collection('usuarios').findOne({ email })
    if (existe) {
      return res.status(400).json({
        error: true,
        message: `O e-mail ${email} já está em uso`,
        errors: [{ msg: `O e-mail ${email} já está em uso`, param: 'email', location: 'body' }]
      })
    }
    next()
  } catch (err) {
    console.error("Erro ao verificar e-mail duplicado:", err)
    return res.status(500).json({
      error: true,
      message: "Erro interno ao validar o e-mail",
    })
  }
}
