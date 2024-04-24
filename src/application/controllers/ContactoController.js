const { StatusCode } = require("../../helpers/statusCode");
const { ContactoService} = require("../../domain/services/ContactoService");

async function save(ctx)
{
    const service = new ContactoService();
    const data = await service.save(ctx.request.body);

    ctx.status = StatusCode.HTTP_CREATED.code;

    return ctx.body = {
        data
    };
}

async function list(ctx)
{
    const service = new ContactoService();
    const data = await service.list();

    ctx.status = StatusCode.HTTP_OK.code;

    return ctx.body = {
        data
    };
}

async function getOne(ctx)
{
    const service = new ContactoService();
    const data = await service.getContacto({ ...ctx.request.body, ...ctx.params });

    ctx.status = StatusCode.HTTP_OK.code;

    return ctx.body = {
        data
    };
}

async function update(ctx)
{
    const service = new ContactoService();
    const data = await service.update({ ...ctx.request.body, ...ctx.params });

    ctx.status = StatusCode.HTTP_CREATED.code;

    return ctx.body = {
        data
    };
}

async function remove(ctx)
{
    const service = new ContactoService();
    const data = await service.delete(ctx.params);

    ctx.status = StatusCode.HTTP_CREATED.code;

    return ctx.body = {
        data
    };
}

async function agregarTelefono(ctx)
{
    const service = new ContactoService();
    const data = await service.agregarTelefono({ ...ctx.request.body, ...ctx.params });

    ctx.status = StatusCode.HTTP_CREATED.code;

    return ctx.body = {
        data
    };
}

async function listTelefonos(ctx)
{
    const service = new ContactoService();
    const data = await service.listContactoTelefonos(ctx.params);

    ctx.status = StatusCode.HTTP_CREATED.code;

    return ctx.body = {
        data
    };
}

module.exports = {
    save,
    list,
    getOne,
    update,
    remove,
    agregarTelefono,
    listTelefonos
}
