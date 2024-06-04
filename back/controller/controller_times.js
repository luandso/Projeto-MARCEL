const timesDAO = require('../model/DAO/times') 

const message = require('../modulo/config')

const getTimes = async function () { 
    
    try {

        let timesJson = {}
        let dadosTimes = await timesDAO.selectTimes() 
        

        if (dadosTimes) {

            if (dadosTimes.length > 0) {
                timesJson.times = dadosTimes 
                timesJson.status_code = 200

                return timesJson
            } else {
                console.log('Algo deu errado no processamento de Dados!')
            }
        }

    } catch (error) {
        console.log(error)
    }
}

const setInserirNovoTime = async (dadosTimes, contentType) => { 

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoTimeJson = {}

            if (dadosTimes.ano_fundacao == '' || dadosTimes.ano_fundacao == undefined || dadosTimes.ano_fundacao == null ||
                dadosTimes.clube == '' || dadosTimes.clube == undefined || dadosTimes.clube == null || dadosTimes.clube.length > 100 ||
                dadosTimes.estadio == '' || dadosTimes.estadio == undefined || dadosTimes.estadio == null || dadosTimes.estadio.length > 100 ||
                dadosTimes.cidade == '' || dadosTimes.cidade == undefined || dadosTimes.cidade == null || dadosTimes.cidade.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                //Validação para verificar se clube e ano de fundação têm um conteúdo válido
                if (dadosTimes.clube != '' &&
                    dadosTimes.clube != null &&
                    dadosTimes.clube != undefined &&
                    dadosTimes.ano_fundacao != '' &&
                    dadosTimes.ano_fundacao != null &&
                    dadosTimes.ano_fundacao != undefined

                ) {
                    if (dadosTimes.clube.length > 50 && isNaN(dadosTimes.ano_fundacao)) {
                        return message.ERROR_REQUIRED_FIELDS // 400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //Encaminha os dados para o DAO inserir
                    let novoTime = await timesDAO.insertTimes(dadosTimes)

                    if (novoTime) {

                        let id = await timesDAO.selectLastId() 

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoTimeJson.status = message.SUCESS_CREATED_ITEM.status
                        novoTimeJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoTimeJson.message = message.SUCESS_CREATED_ITEM.message
                        novoTimeJson.id = id[0].id
                        novoTimeJson.time = dadosTimes 


                        console.log(novoTime, dadosTimes, id[0].id)
                        return novoTimeJson // 201

                    } else {
                        console.log(novoTime, dadosTimes);
                        return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.log("Erro na controller:", error); 
        return message.ERROR_INTERNAL_SERVER 
    }

}

const setAtualizarNovoTime = async function (idTimes, dadosTimesUpdate, content) { 
    if (String(content).toLowerCase() == 'application/json') {
        
        let updateTimesJson = {}
        try {
            const validaId = await timesDAO.selectTimesById(idTimes) 
            
            if (validaId) {
                const TimeAtualizado = await timesDAO.updateTimes(idTimes, dadosTimesUpdate) 
                
                if (TimeAtualizado) {
                    updateTimesJson.id = validaId
                    updateTimesJson.status = message.SUCESS_UPTADE_ITEM.status
                    updateTimesJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                    updateTimesJson.message = message.SUCESS_UPTADE_ITEM.message
                    updateTimesJson.time = TimeAtualizado 

                    console.log(updateTimesJson);

                    return updateTimesJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setExcluirTime = async function (id) { 
    let deleteTimesJson ={}
    
    try {
        const validaId = await timesDAO.selectTimesById(id) 
        
        if (validaId) {
            const apagarTimes = await timesDAO.deleteTimes(id) 
            
            if (apagarTimes) {
                deleteTimesJson.status = message.SUCESS_DELETE_ITEM.status
                deleteTimesJson.status_code = message.SUCESS_DELETE_ITEM.status_code
                deleteTimesJson.message = message.SUCESS_DELETE_ITEM.message
                deleteTimesJson.id = validaId

                return deleteTimesJson
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        return message.ERROR_UPDATED_ITEM
    }
}

module.exports = {
    getTimes,
    setInserirNovoTime,
    setAtualizarNovoTime,
    setExcluirTime
}
