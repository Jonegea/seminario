require('dotenv').config();

const { App } = require('./app');

void (async() =>
{
    try
    {
        const app = new App()
        app.initConfig()
        await app.build()
        app.listen()
    }
    catch (error)
    {
        console.log('Error while connecting to the database', error);
        throw error;
    }
})();
