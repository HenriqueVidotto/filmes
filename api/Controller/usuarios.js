import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const insereUsuario = async (req, res) => {
  try {

    req.body.avatar = `https://ui-avatars.com/api/?name=${req.body.nome.replace(
      / /g,
      "+"
    )}&background=F00&color=FFF`;

    const salt = await bcrypt.genSalt(10); // Gera o salt
    req.body.senha = await bcrypt.hash(req.body.senha, salt); // Hasheia a senha

    const db = req.app.locals.db;
    const result = await db.collection("usuarios").insertOne(req.body); // Insere no banco

    res.status(201).send(result); // Retorna sucesso
  } catch (err) {
    res.status(400).json({ erro: err.message || err }); // Captura qualquer erro
  }
};

export const efetuaLogin = async (req, res) => {
  try {
   
    const { email, senha } = req.body;
    const db = req.app.locals.db;

    //verificar email valido
    let usuario = await db
      .collection("usuarios")
      .find({ email })
      .limit(1)
      .toArray();
 console.log(usuario);
    if (!usuario.length) {
      return res.status(404).json({
        errors: [
          {
            value: `${email}`,
            msg: `o email ${email} não esta cadastrado`,
            param: "email",
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(senha, usuario[0].senha);
    if (!isMatch) {
      return res.status(403).json({
        value: "senha",
        msg: "Senha esta incorreta",
        param: "senha",
      });
    }

  await jwt.sign(
      { usuario: { id: usuario[0]._id } },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({

          access_token: token,
          msg: "login efetuado",
        });
      }
    );
  } catch (e) {
    console.error(e);
  }
};
