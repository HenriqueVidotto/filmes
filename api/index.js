import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'


import { connectToDataBase } from './config/db.js';
import filmesRoutes from './Routes/filmes.js';
import usuariosRoutes from './Routes/usuarios.js'
import auth from './Middleware/auth.js';


import swaggerUI from 'swagger-ui-express';
import fs from 'fs';


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"



const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use("/", express.static('public'));

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./api/swagger/swagger-output.json')), {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL
}))


app.use("/api/filmes",auth, filmesRoutes);
app.use("/api/usuarios", usuariosRoutes);

dotenv.config();
connectToDataBase(app).then(() => {

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });


});
