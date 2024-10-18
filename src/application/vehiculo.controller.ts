import { Vehiculo } from "../domain/models/Vehiculo";
import { VehiculoRepository } from "../infrastructure/repositories/vehiculo.repository";

export class VehiculoController{
    private repository: VehiculoRepository;

    constructor(){
        this.repository = new VehiculoRepository();
    }

    async agregar(payload: {
        marca: string,
        modelo: string,
        anio: number,
    }) {
        try {
            const vehiculo = new Vehiculo({
                marca: payload.marca,
                modelo: payload.modelo,
                anio: payload.anio
            })
            const result = await this.repository.agregarVehiculo(vehiculo);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Vehiculo agregado correctamente'};
            } else {
                return {ok: false, message: 'Error al agregar el vehiculo'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al agregar el vehiculo", error.message);
            throw error;
        }
    }

    async obtener() {
        try {
            const result = await this.repository.obtenerVehiculos();
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al obtener los vehiculos", error.message);
            throw error;
        }
    }
    async actualizar(payload: {
        id: number,
        marca: string,
        modelo: string,
        anio: number
    }) {
        try {
            const vehiculo = new Vehiculo({
                id: payload.id,
                marca: payload.marca,
                modelo: payload.modelo,
                anio: payload.anio
            });
            const result = await this.repository.actualizarVehiculo(vehiculo);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Vehiculo actualizado correctamente'};
            } else {
                return {ok: false, message: 'Error al actualizar el vehiculo'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al actualizar el vehiculo", error.message);
            throw error;
        }
    }

    async eliminar(idVehiculo: number) {
        try {
            const result = await this.repository.eliminarVehiculo(idVehiculo);
            if (result.affectedRows == 1) {
                return {ok: true, message: 'Vehiculo eliminado correctamente'};
            } else {
                return {ok: false, message: 'Error al eliminar el vehiculo'};
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar el vehiculo", error.message);
            throw error;
        }
    }
}