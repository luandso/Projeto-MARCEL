const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express() 
const bodyParserjson = bodyParser.json()
const { PrismaClient } = require('@prisma/client')

app.use((request, response, next)=>{
  response.header('Access-Control-Allow-Origin', '*') 
  response.header('Access-Control-Allow-Methods', 'GET')
  app.use(cors())
  next();
})

const controllerTimes = require('./BACK/controller/controller_times.js') 

app.get('/v1/leilao/selectTimes', cors(), async(request,response,next) => { 

  let dadosTimes = await controllerTimes.getTimes() 

  if(dadosTimes){
      response.json(dadosTimes),
      response.status(200)
  }
})

app.post('/v1/leilao/postTimes', cors(), bodyParserjson, async function(request, response, next){ 

  let contentType = request.headers['content-type'];

  let dadosBody = request.body;
  let resultDadosNovoTime = await controllerTimes.setInserirNovoTime(dadosBody, contentType); 

  response.status(resultDadosNovoTime.status_code);
  response.json(resultDadosNovoTime);

} )

app.put('/v1/leilao/updateTimes/:id', cors(), bodyParserjson, async function(request, response, next) { 

  let idTimes = request.params.id 
  let contentType = request.headers['content-type']
  let dadosTimesUpdate = request.body 

  let resultDados = await controllerTimes.setAtualizarNovoTime(idTimes, dadosTimesUpdate, contentType) 

  console.log(idTimes, dadosTimesUpdate,resultDados);
  response.status(resultDados.status_code)
  response.json(resultDados)
})

app.delete('/v1/leilao/deleteTimes/:id', cors(), bodyParserjson, async function(request, response, next) { 

  let idTimes = request.params.id 

  let resultDados = await controllerTimes.setExcluirTime(idTimes) 

  response.status(resultDados.status_code)
  response.json(resultDados)
})

app.listen('8080', function(){
  console.log('API funcionando!')
})
