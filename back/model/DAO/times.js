const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectTimes = async function () { 
  try {
    let sql = 'select * from tbl_times_futebol' 
    let resultadoTimes = await prisma.$queryRawUnsafe(sql) 

    return resultadoTimes 
  } catch (error) {
    return false
  }
}

const selectTimesById = async function (id) { 
  try {
    let sql = `select * from tbl_times_futebol where id = ${id}` 
    let resultadoTimes = await prisma.$queryRawUnsafe(sql) 

    return resultadoTimes 
  } catch (error) {
    return false
  }
}

const insertTimes = async (dadosTimes) => { 
  try {

    if (dadosTimes.clube != null || 
      dadosTimes.clube != undefined ||
      dadosTimes.clube != '' ||
      dadosTimes.ano_fundacao != null || 
      dadosTimes.ano_fundacao != undefined ||
      dadosTimes.ano_fundacao != ''
    ) {
      sql = `INSERT INTO tbl_times_futebol (
        clube, 
        ano_fundacao,
        estadio,
        cidade,
        preco_minimo,
        data_inicio,
        data_fim
      ) VALUES (
        '${dadosTimes.clube}', 
        '${dadosTimes.ano_fundacao}', 
        '${dadosTimes.estadio}',
        '${dadosTimes.cidade}',
        '${dadosTimes.preco_minimo}',
        '${dadosTimes.data_inicio}',
        '${dadosTimes.data_fim}'
      );`
    }

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return true
    else
      return false
  } catch (error) {
    return false
  }
}

const selectLastId = async function () {
  try {
    let sql = 'select tbl_times_futebol.id from tbl_times_futebol where id order by id Desc;' 
    let resultadoTimes = await prisma.$queryRawUnsafe(sql) 

    return resultadoTimes 
  } catch (error) {
    return false
  }
}

const updateTimes = async function (id, dadosTimesUpdate) { 
  try {
    let sql = `UPDATE tbl_times_futebol SET ` 
    const keys = Object.keys(dadosTimesUpdate)

    keys.forEach((key, index) => {
      sql += `${key} = '${dadosTimesUpdate[key]}'`
      if (index !== keys.length - 1) {
        sql += `,`
      }
    })

    sql += `WHERE id = ${id}` 
    console.log(sql)
    let result = await prisma.$executeRawUnsafe(sql) 

    return result 
  } catch (error) {
    return false
  }
}

const deleteTimes = async function (id) { 
  try {
    let sql = `delete from tbl_times_futebol where id = ${id};` 
    let result = await prisma.$queryRawUnsafe(sql) 

    return result 
  } catch (error) {
    return false
  }
}

module.exports = {
  selectTimes,
  selectTimesById,
  insertTimes,
  selectLastId,
  updateTimes,
  deleteTimes
}
