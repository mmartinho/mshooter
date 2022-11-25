global.__basedir = __dirname;

const express=require('express');
const routes=require('./routes');

const app = express();
const port = process.env.API_PORT;

routes(app);

app.listen(port, ()=>{ 
    console.log(`servidor está rodando na porta ${port}`);
});

module.exports=app;