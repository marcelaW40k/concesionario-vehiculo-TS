import { FieldPacket, Pool, ResultSetHeader } from "mysql2/promise";
import { Reserva } from "../../domain/models/Reserva";
import { getPooledConnection } from "../../../config/database";

export class ReservaRepository {

    async agregarReserva(reserva: Reserva): Promise<ResultSetHeader> {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'INSERT INTO reservas (usuario_id, vehiculo_id, fecha_reserva) VALUES (?, ?, ?)';
        const values: Array<string | number | Date>= [
            reserva.usuario_id, 
            reserva.vehiculo_id, 
            reserva.fecha_reserva,
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerReservas() {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'SELECT * FROM reservas';
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql);
        return result[0];
    }

    async actualizarReserva(reserva: Reserva) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'UPDATE reservas SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ?';
        const values= [
            reserva.usuario_id, 
            reserva.vehiculo_id, 
            reserva.fecha_reserva,
            reserva.id
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
    async eliminarReserva(idReserva: number) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'DELETE FROM reservas WHERE id = ?';
        const values= [idReserva];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}