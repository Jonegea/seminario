const Koa = require('koa');
const cors = require('koa-cors');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

const { errorHandler } = require('./helpers/errorHandler');

const { loggerMiddleware} = require('./helpers/middlewares/loggerMiddleware');
const { ContactoRoute } = require("./presentation/routes/ContactoRoute");
const SQL = require('./persistence/sql');

class App
{
    constructor()
    {
        this.app = require('koa-qs')(new Koa());
    }

    initConfig()
    {
        this.port = process.env.SERVER_PORT || 8090;

        this.app.use(cors({
            credentials: true
        }));
        this.app.proxy = process.env.env === 'production';
        this.app.use(helmet());

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));

        // Generic error handling middleware.
        this.app.use(errorHandler);
        this.app.use(loggerMiddleware);
    }

    async build()
    {
        this.app.use(ContactoRoute.routes());
        this.app.use(ContactoRoute.allowedMethods());

        await SQL.initConnection()
    }

    listen()
    {
        this.server = this.app.listen(this.port, () =>
        {
            console.log(`Koa is listening to http://localhost:${this.port}`);
        });

        return this.server;
    }

    callback()
    {
        return this.app.callback();
    }

    close()
    {
        if (this.server)
        {
            this.server.close();
        }
    }
}

module.exports = {
  App
}
