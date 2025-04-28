import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

export const createFilme = async (req, res) => {
  try {
    
    const { nome, nota, descricao, genero, data_lancamento,classificacao_etaria } = req.body;

    const filmeNovo = { nome, nota:  parseFloat(nota), descricao, genero,  data_lancamento: new Date(data_lancamento),classificacao_etaria };
    const result = await db.collection("filme").insertOne(filmeNovo);
    res.send(result);
  } catch (error) {

    return res.status(500).send(error);
  }
};

export const getFilmeById = async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await db
      .collection("filme")
      .findOne({ _id: ObjectId.createFromHexString(id) });

    if (!filme) {
      return res.status(404).send("filme nao encontrado");
    }

    res.status(200).json(filme);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteFilme = async (req, res) => {
  try {
    const { id } = req.params;

    const existFilme = db
      .collection("filme")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    if (!existFilme) {
      return res.status(404).send("filme não encontrado");
    }

    const result = await db
      .collection("filme")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });

    return res.status(200).json(result);
  } catch (error) {

    return res.status(500).send(error);
  }
};

export const updateFilme = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, nota, descricao, genero, data_lancamento,classificacao_etaria } = req.body;

    const existFilme = db
      .collection("filme")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    if (!existFilme) {
      return res.status(404).send("filme não encontrado");
    }
  
    const filmeAtualizado = { nome, nota:  parseFloat(nota), descricao, genero, data_lancamento: new Date(data_lancamento),classificacao_etaria };
    const result = await db
      .collection("filme")
      .updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: filmeAtualizado }
      );

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const getAllFilmes = async (req, res) => {
  try {
    const { page = 1, limit = 10, nome, sort, order = "asc",data_lancamento_inicio,data_lancamento_fim,genero } = req.query;
    const skip = (page - 1) * limit;
   
    const query = {};
    if (nome) {
      query.nome = { $regex: nome, $options: "i" };
    }

    if(data_lancamento_inicio || data_lancamento_fim){
      query.data_lancamento = { $and: [ {$gte: new Date(data_lancamento_inicio)},{ $lte: new Date(data_lancamento_fim)}] };
    }
    
    if(genero){
      query.genero = { $regex: genero, $options: "i" };
    }
    const db = req.app.locals.db;

    // Configuração de ordenação
    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order.toLowerCase() === "desc" ? -1 : 1;
    } else {
      // Ordenação padrão por nome se nenhuma for especificada
      sortOptions.nome = 1;
    }


    const filmes = await db.collection("filme")
    .find(query)
    .sort(sortOptions)
    .skip(Number.parseInt(skip))
    .limit(Number.parseInt(limit))
    .toArray();

    const total = await db.collection("filme").countDocuments(query)

    res.status(200).json({
      data: filmes,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const getAllFilmesByAno = async (req, res) => {
  try {
    console.log("entrou na funcao getAllFilmesByAno");
    const { anoDe, anoAte, page = 1, limit = 10, notaMin, notaMax } = req.query;

    const dataInicio = new Date(`${anoDe}-01-01`);
    const dataFim = new Date(`${parseInt(anoAte) + 1}-01-01`);

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const db = req.app.locals.db;

    // Inicializando a query com os filtros de data
    let query = {
      $and: [
        { data_lancamento: { $gte: dataInicio } },
        { data_lancamento: { $lt: dataFim } }
      ]
    };

    // Adicionando o filtro de nota ao array $and, se necessário
    if (notaMin !== undefined || notaMax !== undefined) {
      console.log("entrou no if do filtro de nota");
      const notaFiltro = {};
      if (notaMin !== undefined) notaFiltro.$gte = parseFloat(notaMin);
      if (notaMax !== undefined) notaFiltro.$lte = parseFloat(notaMax);
      
      // Adiciona o filtro de nota ao array $and
      query.$and.push({ nota: notaFiltro });
    }

    console.log("query final:", JSON.stringify(query, null, 2));

    // Realizando a consulta no banco
    const filmes = await db.collection('filme')
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await db.collection('filme').countDocuments(query);

    res.status(200).json({
      data: filmes,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Erro ao buscar filmes por ano:', error);
    res.status(500).json({ message: 'Erro ao buscar filmes.' });
  }
};

  


