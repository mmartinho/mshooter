/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Ponto de "entrada" principal da aplicação. Cria a instância "express",
 *          define variáveis globais, carrega todas as rotas, a inicia o servidor
 *          da aplicação 
 ************************************************************************************/
global.__basedir = __dirname;

const express=require('express');
const routes=require('./routes');
const Network=require('./models/classes/network');
 
/** 
 * Pega o IP que estiver em Wi-Fi (conseguido normalmente em Home Office) 
 */
const oneIPv4WifiAddress = Network.oneIPv4WifiAddress();
const app = express();
const port = process.env.API_PORT;
/**
 * Se existir um IP em Wi-Fi, use-o para que seja possível acessar a 
 * App de outro computador na rede "Home Office"
 */
const host = oneIPv4WifiAddress ? oneIPv4WifiAddress : process.env.API_HOST;

routes(app);

app.listen(port, host, ()=>{ 
    console.log(`servidor está rodando no host ${host} na porta ${port}`);
});

module.exports=app;