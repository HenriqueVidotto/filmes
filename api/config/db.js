import { MongoClient } from "mongodb";
import dotenv from "dotenv";


let db;
export async function connectToDataBase(app){
    try{
        const MONGO_URI = process.env.MONGODB_URI;

        const cliente = new MongoClient(MONGO_URI);

        
        await cliente.connect();

        console.log('Conectado ao mongoDB');

        db = cliente.db();
        //disponibiliza o db globalmente no Express
        app.locals.db = db;
    }catch(error){
        console.log("Erro ao conectar ao banco de dados: ", error);
        process.exit(1);
    }
}
export{db}

