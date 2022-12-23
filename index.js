global.__basedir = __dirname;

const express=require('express');
const routes=require('./routes');

const app = express();
const port = process.env.API_PORT;
const host = process.env.API_HOST;

routes(app);

app.listen(port, host, ()=>{ 
    console.log(`servidor está rodando no host ${host} na porta ${port}`);
});

module.exports=app;