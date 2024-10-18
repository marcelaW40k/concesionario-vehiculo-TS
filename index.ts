import Express from "express";
import { routes } from "./src/infrastructure/modules/api-rest/routers/index.router";
import middleware404 from "./src/infrastructure/modules/api-rest/middleware/middleware";

const createServer = () => {
    const app = Express();

    app.use(Express.json());

    app.get("/api/v1", routes());

    app.use(middleware404);

 
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    });
}
createServer();