import { FieldPacket, ResultSetHeader, Pool } from "mysql2/promise";
import { getPooledConnection } from "../../../config/database";
import { Usuario } from "../../domain/models/Usuario";

export class UsuarioRepository {

    async agregarUsuario(usuario: Usuario): Promise<ResultSetHeader> {
        // Lógica para agregar un usuario a la base de datos
        const connection: Pool = getPooledConnection();
        const querySql: string = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
        const values: Array<string | number>= [
            usuario.nombre, 
            usuario.email, 
            usuario.telefono
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtenerUsuarios() {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'SELECT * FROM usuarios';
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql);
        return result[0];
    }

    async actualizarUsuario(usuario: Usuario) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
        const values= [
            usuario.nombre, 
            usuario.email, 
            usuario.telefono,
            usuario.id
        ];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async eliminarUsuario(idUsuario: number) {
        const connection: Pool = getPooledConnection();
        const querySql: string = 'DELETE FROM usuarios WHERE id = ?';
        const values= [idUsuario];
        const result:[ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

}