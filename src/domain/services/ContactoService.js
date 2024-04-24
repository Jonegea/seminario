const SQL = require("../../persistence/sql");

class ContactoService
{
    async getContacto(payload)
    {
        return SQL.getContacto(payload.id);
    }

    async list()
    {
        return SQL.getContactos();
    }

    async save(payload)
    {
        return SQL.saveContacto(payload.nombre, payload.apellido, payload.email);
    }

    async update(payload)
    {
        return SQL.updateContacto(payload.id, payload.nombre, payload.apellido, payload.email);
    }

    async delete(payload)
    {
        return SQL.deleteContacto(payload.id);
    }

    async agregarTelefono(payload)
    {
        return SQL.saveContactoTelefonos(payload.id, payload.telefono);
    }

    async listContactoTelefonos(payload)
    {
        return SQL.listContactoTelefonos(payload.id);
    }
}

module.exports = {
  ContactoService
}
