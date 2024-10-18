import { Usuario } from "../domain/models/Usuario";
import { UsuarioRepository } from "../infrastructure/repositories/usuario.respository";

export class UsuarioController {
    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    async agregar(payload: {
        nombre: string,
        email: string,
        telefono: string
    }) {
        try {
            const usuario = new Usuario({
                nombre: payload.nombre,
                email: payload.email,
                telefono: payload.telefono
            });
    
            const result = await this.repository.agregarUsuario(usuario);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Usuario agregado correctamente'};
            } else {
                return {ok: false, message: 'Error al agregar el usuario'};
            }
           
        } catch (error: any) {
            console.log("Ha ocurrido un error al agregar el usuario", error.message);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repository.obtenerUsuarios();
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al obtener los usuarios", error.message);
            throw error;
        }
    }

    async actualizar(payload: {
        id: number,
        nombre: string,
        email: string,
        telefono: string
    }) {
        try {
            const usuario = new Usuario({
                id: payload.id,
                nombre: payload.nombre,
                email: payload.email,
                telefono: payload.telefono
            });
    
            const result = await this.repository.actualizarUsuario(usuario);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Usuario actualizado correctamente'};
            } else {
                return {ok: false, message: 'Error al actualizar el usuario'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al actualizar el usuario", error.message);
            throw error;
        }
    }
    
    async eliminar(idUsuario: number) {
        try {
            const result = await this.repository.eliminarUsuario(idUsuario);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Usuario eliminado correctamente'};
            } else {
                return {ok: false, message: 'Error al eliminar el usuario'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar el usuario", error.message);
            throw error;
        }
    }
}