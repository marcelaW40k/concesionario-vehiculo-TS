import Express from "express";
import { VehiculoController } from "../../../../application/vehiculo.controller";

export const vehiculoRoutes = () => {
    const router = Express.Router();

    const vehiculoCtrl = new VehiculoController();

    router.post('/vehiculos', (req, res) => {
        const payload = req.body;
        vehiculoCtrl.agregar(payload).then((result) => {
        const status = result.ok === true ? 201 : 400;
        res.status(status).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
    });

    router.get('/usuarios', async (_, res) =>{
        try {
            const result = await vehiculoCtrl.obtener();
            res.send(result);
        }catch(error){
            res.send({message: "Ha ocurrido un error al consultar los productos"});
        }
    });

    router.put('/usuarios', (req, res) => {
        const payload = req.body;
        vehiculoCtrl.actualizar(payload).then((result) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
    });

    router.delete('/usuarios/:id', async (req, res) => {
        try {
            const idStr = req.params.id;
            const id = Number(idStr);
            if (Number.isNaN(id)) {
                res.status(400).send({message: "El id debe ser un número"});
                return;
            }
            const result = await vehiculoCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }catch(error){
            res.send({message: "Ha ocurrido un error al eliminar el producto"});
        }
    });
    return router;
}