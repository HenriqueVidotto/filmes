import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'


import { connectToDataBase } from './config/db.js';
import filmesRoutes from './Routes/filmes.js';
import usuariosRoutes from './Routes/usuarios.js'
import auth from './Middleware/auth.js';


import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve caminhos relativos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lê o JSON em runtime
const swaggerPath = join(__dirname, '../swagger/swagger-output.json');
const swaggerFile = JSON.parse(await fs.readFile(swaggerJSONPath, 'utf-8'));


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use("/", express.static('public'));


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/filmes",auth, filmesRoutes);
app.use("/api/usuarios", usuariosRoutes);

dotenv.config();
connectToDataBase(app).then(() => {

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });


});
