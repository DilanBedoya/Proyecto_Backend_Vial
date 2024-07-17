import app from './server.js'
import connection from './database.js';
import { V1SwaggerDocs } from "../docs/swagger.js";

connection()

app.listen(app.get('port'),() => {
    V1SwaggerDocs(app, app.get("port"));
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})