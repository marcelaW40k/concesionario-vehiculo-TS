import { Reserva } from "../domain/models/Reserva";
import { ReservaRepository } from "../infrastructure/repositories/reserva.repository";

export class ReservaController {
    private repository: ReservaRepository;

    constructor() {
        this.repository = new ReservaRepository();
    }

    async agregar(payload: {
        usuario_id: number,
        vehiculo_id: number,
        fecha_reserva: Date,
    }) {
        try {
            const reserva = new Reserva({
                usuario_id: payload.usuario_id,
                vehiculo_id: payload.vehiculo_id,
                fecha_reserva: payload.fecha_reserva
            })

            const result = await this.repository.agregarReserva(reserva);
            if(result.affectedRows == 1){
                return {ok: true, message: 'Reserva agregada correctamente'};
            }else {
                return {ok: false, message: 'Error al agregar la reserva'};
            }
        }catch(error: any){
            console.log("Ha ocurrido un error al agregar la reserva", error.message);
            throw error;
        }
    }

    async obtener(){
        try{
            const result = await this.repository.obtenerReservas();
            return result;
        }catch(error: any){
            console.log("Ha ocurrido un error al obtener las reservas", error.message);
            throw error;
        }
    }

    async actualizar(payload: {
        id: number,
        usuario_id: number,
        vehiculo_id: number,
        fecha_reserva: Date
    }) {
        try {
            const reserva = new Reserva({
                id: payload.id,
                usuario_id: payload.usuario_id,
                vehiculo_id: payload.vehiculo_id,
                fecha_reserva: payload.fecha_reserva
            });
            const result = await this.repository.actualizarReserva(reserva);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Reserva actualizada correctamente'};
            } else {
                return {ok: false, message: 'Error al actualizar la reserva'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al actualizar la reserva", error.message);
            throw error;
        }
    }

    async eliminar(idReserva: number) {
        try {
            const result = await this.repository.eliminarReserva(idReserva);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Reserva eliminada correctamente'};
            } else {
                return {ok: false, message: 'Error al eliminar la reserva'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar la reserva", error.message);
            throw error;
        }
    }
}