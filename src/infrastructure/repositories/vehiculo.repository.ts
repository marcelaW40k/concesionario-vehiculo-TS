import { FieldPacket, Pool, ResultSetHeader } from "mysql2/promise";
import { getPooledConnection } from "../../../config/database";
import { Vehiculo } from "../../domain/models/Vehiculo";

export class VehiculoRepository {

    async agregarVehiculo(vehiculo: Vehiculo): Promise<ResultSetHeader> {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'INSERT INTO vehiculos (marca, modelo, anio,) VALUES (?, ?, ?, ?)';
        const values: Array<string | number>= [
            vehiculo.marca, 
            vehiculo.modelo, 
            vehiculo.anio,
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerVehiculos() {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'SELECT * FROM vehiculos';
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql);
        return result[0];
    }

    async actualizarVehiculo(vehiculo: Vehiculo) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'UPDATE vehiculos SET marca = ?, modelo = ?, anio = ? WHERE id = ?';
        const values= [
            vehiculo.marca, 
            vehiculo.modelo, 
            vehiculo.anio,
            vehiculo.id
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async eliminarVehiculo(idVehiculo: number) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'DELETE FROM vehiculos WHERE id = ?';
        const values= [idVehiculo];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}