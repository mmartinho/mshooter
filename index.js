const express=require('express');
const routes=require('./routes');

const app = express();
const port = process.env.NODE_ENV == 'development' ? process.env.DEV_API_PORT : process.env.PROD_API_PORT;

routes(app);

app.listen(port, ()=>{ 
    console.log(`servidor está rodando na porta ${port}`);
});

module.exports=app;