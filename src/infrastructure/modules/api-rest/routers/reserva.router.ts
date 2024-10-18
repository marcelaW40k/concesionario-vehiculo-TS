import Express  from "express";
import { ReservaController } from "../../../../application/reserva.controller";
export const reservaRoutes = () => {
    const router = Express.Router();

    const reservaCtrl = new ReservaController();    

    router.post('/reservas', (req, res) => {
        const payload = req.body;
        reservaCtrl.agregar(payload).then((result) => {
            const status = result.ok === true ? 201 : 400;
            res.status(status).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    router.get('/reservas', async (_, res) => {
        try {
            const result = await reservaCtrl.obtener();
            res.send(result);
        } catch (error) {
            res.send({message: "Ha ocurrido un error al consultar las reservas"});
        }
    });

    router.put('/reservas', (req, res) => {
        const payload = req.body;
        reservaCtrl.actualizar(payload).then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }).catch((error) => {
            res.status(500).send(error);
        });
    });

    router.delete('/reservas/:id', async (req, res) => {
        try {
            const idStr = req.params.id;
            const id = Number(idStr);
            if (Number.isNaN(id)) {
                res.status(400).send({message: "El id debe ser un número"});
                return;
            }
            const result = await reservaCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }
        catch (error) {
            res.send({message: "Ha ocurrido un error al eliminar la reserva"});
        }
    });

    return router;
}