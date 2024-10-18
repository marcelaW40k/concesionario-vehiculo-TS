import Express from "express";
import { usuarioRoutes } from "./usuario.router";
import { vehiculoRoutes } from "./vehiculo.router";
import { reservaRoutes } from "./reserva.router";

export const routes = () => {
    const router = Express.Router();

    router.get("/", (req, res) => {
        res.send({message: "Bienvenido a la API "});
    });

    router.use(usuarioRoutes());
    router.use(vehiculoRoutes());
    router.use(reservaRoutes());

    return router;

}