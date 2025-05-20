import jwt from "jsonwebtoken";

export default async function auth(req,res,next) {
    const token = req.header('access-token');

    if(!token){
        return res.status(401).json({
            msg: 'Acesso negado. Necessario token'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded.usuario;
        next();
    }catch(err){
        return res.status(401).json({
            msg: 'Token inválido'
        })
    }

}