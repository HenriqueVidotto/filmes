import { ObjectId } from "mongodb";
import {db} from "../config/db.js"

export const createFilme = async (req, res) => {
    try {
        console.log("tesfe")
        const { nome, nota, descricao, genero, data_lancamento } = req.body;
   
    
   
        const filmeNovo = { nome, nota, descricao, genero, data_lancamento  }
        const result = await db.collection('filme').insertOne(filmeNovo);
        res.send(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

export const getFilmeById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const filme = await db.collection('filme').findOne({ _id: ObjectId.createFromHexString(id) });

        if (!filme) {
            return res.status(404).send('filme nao encontrado');
        }

        res.status(200).json(filme);

    } catch (error) {
        return res.status(500).send(error);
    }

}

export const deleteFilme = async (req, res) => {
    try {
        const { id } = req.params;

        const existFilme = db.collection('filme').findOne({ id: id });
        if (existFilme) {
            return res.status(404).send('filme não encontrado');
        }

        const result = await db.collection('filme').deleteById({ _id: ObjectId.createFromHexString(id) });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const updateFilme = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, nota, descricao, genero, data_lancamento } = req.body;

        const existFilme = db.collection('filme').findOne({ id: id });
        if (existFilme) {
            return res.status(404).send('filme não encontrado');
        }

        const filmeAtualizado = { nome, nota, descricao, genero, data_lancamento };
        const result = await db.collection('filme').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: filmeAtualizado });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getAllFilmes = async (req, res) => {
    try {
        const filmes = await db.collection('filme').find().toArray();
        res.status(200).json(filmes);
    } catch (error) {
        return res.status(500).send(error);
    }
}


