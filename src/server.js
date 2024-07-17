import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerUser from './routers/users_routes.js'
import routerReports from './routers/reports_routes.js'
import routerAdmin from './routers/admin_routes.js'

import swaggerUi from "swagger-ui-express"; // Importar swaggerUi
import { swaggerSpec } from "../docs/swagger.js"; // Importar swaggerSpec desde swagger.js

const app = express()
dotenv.config()

app.set('port',process.env.PORT || 3000)

app.use(cors())
app.use(express.json())

app.use('/SourceCraft',routerUser)
app.use('/SourceCraft',routerReports)
app.use('/SourceCraft',routerAdmin)

// Configuración de Swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/SourceCraft/docs.json", (req, res) => {
  res.setHeader("Content-type", "application/json");
  res.send(swaggerSpec);
});


app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

export default  app