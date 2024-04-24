const mysql = require("mysql2/promise");

let connection;
let connectionEstablished = false;

module.exports = {
    initConnection: async () => {
        if (!connectionEstablished) {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            connectionEstablished = true;
        }
    },
    closeConnection: async () => {
        if (connectionEstablished) {
            await connection.end();
            connectionEstablished = false;
        }
    },
    getContactos: async () => {
        try {
            const [contactos] = await connection.execute("SELECT * FROM contactos", []);
            return contactos;
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    getContacto: async (id) => {
        try {
            const [contacto] = await connection.execute("SELECT * FROM contactos WHERE id = ?", [id]);
            return contacto;
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    saveContacto: async (nombre, apellido, email) => {
        try {
            await connection.execute('INSERT INTO contactos (nombre, apellido, email) VALUES (?, ?, ?)', [nombre, apellido, email]);
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    updateContacto: async (id, nombre, apellido, email) => {
        try {
            await connection.execute('UPDATE contactos SET nombre = ?, apellido = ?, email = ? WHERE id = ?', [nombre, apellido, email, id]);
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    deleteContacto: async (id) => {
        try {
            await connection.execute('DELETE FROM contactos WHERE id = ?', [id]);
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    saveContactoTelefonos: async (id, telefono) => {
        try {
            const res = await connection.execute('INSERT INTO telefonos (telefono) VALUES (?)', [telefono]);
            await connection.execute('INSERT INTO contacto_telefono (contacto_id, telefono_id) VALUES (?, ?)', [id, res[0].insertId]);
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
    listContactoTelefonos: async (id) => {
        try {
            const [telefonos] = await connection.execute(`
                SELECT telefonos.telefono as telefonos

                FROM contacto_telefono
                
                LEFT JOIN contactos ON
                contactos.id =  contacto_telefono.contacto_id
                
                LEFT JOIN telefonos ON
                telefonos.id =  contacto_telefono.telefono_id
                WHERE contacto_id = (?)
            `, [id]);
            return telefonos.map(telefono => telefono.telefonos);
        } catch (error) {
            console.log("error", error);
            return [{ data: 'error', message: error }];
        }
    },
};

