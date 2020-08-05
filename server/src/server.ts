import express from "express";

const app = express();

app.get('/users', () => {
  console.log('Acessou a rota')
  //36:12
})

app.listen(3333);
