const Router = require("koa-router");
const { save,
    getOne,
    list,
    update,
    remove,
    agregarTelefono,
    listTelefonos
} = require("../../application/controllers/ContactoController");

const routerOpts = {
    prefix: "/api/contactos"
};

const ContactoRoute = new Router(routerOpts);

ContactoRoute.post("/", save);
ContactoRoute.get("/", list);
ContactoRoute.get("/:id", getOne);
ContactoRoute.put("/:id", update);
ContactoRoute.delete("/:id", remove);

ContactoRoute.post("/:id/telefonos", agregarTelefono);
ContactoRoute.get("/:id/telefonos", listTelefonos);

module.exports = {
  ContactoRoute
}
