import { UsuarioController } from "../../../../application/usuario.controller";
import Express from 'express';

export const usuarioRoutes = () => {
    const router = Express.Router();

    const usuarioCtrl = new UsuarioController();

    router.post('/usuarios', (req, res) => {
        const payload = req.body;

        usuarioCtrl.agregar(payload).then((result) => {
            const status = result.ok ? 201 : 400;
            res.status(status).send(result);
    })  
    .catch((error) => {
        res.status(500).send({ok: false, message: 'Error al agregar el usuario'});
    })
    });

    router.get('/usuarios', (_, res) => {
        usuarioCtrl.obtener()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send({ok: false, message: 'Error al obtener los usuarios'});
        });
    });

    router.put('/usuarios', (req, res) => {
        const payload = req.body;
        usuarioCtrl.actualizar(payload)
        .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        })
        .catch((error) => {
            res.status(500).send(error)
        })
    })

    router.delete('/usuarios/:id', async (req, res) => {
        try {
            const idStr = req.params.id;
            const id = Number(idStr);
            if (Number.isNaN(id)) {
                res.status(400).send({ok: false, message: "Error en el id enviado"});
                return;
            }
            const result = await usuarioCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }catch(error){
            res.status(500).send(error);
        }
    })

    return router;
}