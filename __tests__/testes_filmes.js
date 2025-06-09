/* testes na API de filmes*/



const request = require('supertest');
const dotenv = require('dotenv');
const { application } = require('express');

dotenv.config();

const baseURL = 'http://localhost:3000/api';

describe('API REST  de filmes sem token',() =>{
    it('GET / Lista todos os filmes s/o tojen', async()=>{
        const response = await request(baseURL)
        .get('/filmes')
        .set('Content-Type', 'application/json')
        .expect(401) // unauthorized
    })

    it('GET- Lisas o filme pelo ID s/token', async () =>{
        const id = '68193eff9d1560bcecddbb8b';
        const response = await request(baseURL)
        .get(`/filmes/${id}`)
        .set('Content-Type', 'application/json')
        .expect(401) 
    })


})


describe('API REST filmes com token', () => {
    let token 
    it('POST - Autetica usuario', async ()=>{
        const senha = process.env.SENHA_USUARIO
        const response = await request(baseURL)
        .post('/usuarios/login')
        .set('Content-Type', 'application/json')
        .send({"email": 'teste@teste.com', "senha": senha })
        .expect(200)

     
        token = response.body.access_token
        expect(token).toBeDefined()
    })

    it('GET - Obter filmes com o token', async () =>{
        const response = await request(baseURL)
        .get('/filmes')
        .set('Content-type', 'application/json')
        .set('access-token', token)
        .expect(200)

        const filmes = response.body
        expect(filmes).toBeInstanceOf(Object)
    })
})