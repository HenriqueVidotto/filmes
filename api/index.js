import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'


import { connectToDataBase } from './config/db.js';
import filmesRoutes from './Routes/filmes.js';
import usuariosRoutes from './Routes/usuarios.js'
import auth from './Middleware/auth.js';


import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

import path from 'path'
import { fileURLToPath } from 'url' // Importa fileURLToPath para módulos ES

// Obter equivalente a __dirname e __filename em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

let swaggerUiPath;
try {

    const swaggerUiBundleUrl = await import.meta.resolve('swagger-ui-dist/swagger-ui-bundle.js');

    swaggerUiPath = path.dirname(fileURLToPath(swaggerUiBundleUrl));
} catch (e) {
    console.warn("Falha ao resolver 'swagger-ui-dist/swagger-ui-bundle.js' usando import.meta.resolve. Tentando caminho de fallback.");

    swaggerUiPath = path.join(process.cwd(), 'node_modules', 'swagger-ui-dist');
}


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use("/", express.static('public'));

app.use('/api/doc', express.static(swaggerUiPath), swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./api/swagger/swagger-output.json')), {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    // customCssUrl: CSS_URL // Certifique-se de que esta linha esteja comentada ou removida
}));

app.use("/api/filmes",auth, filmesRoutes);
app.use("/api/usuarios", usuariosRoutes);

dotenv.config();
connectToDataBase(app).then(() => {

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });


});
