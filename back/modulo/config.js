/*********************** Mensagens de erro ******************************* */
const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido' }
const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Não foram encontrados itens' }
const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na comunicação com o banco de dados. Contate o administrador' }
const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos ou não atendem aos critérios de digitação!!' }
const ERROR_CONTENT_TYPE = { status: false, status_code: 415, message: 'O contentType encaminhado na requisição não é permitido pelo servidor da API, deve usar somente application/JSON!!' }
const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na camada Controller do projeto. Contate o Administrador da API!!' }

/*********************** Mensagens de sucesso ************************************/

const SUCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item criado com sucesso' }
const SUCESS_DELETE_ITEM = { status: true, status_code: 201, message: 'Item deletado com sucesso' }
const SUCESS_UPTADE_ITEM = { status: true, status_code: 200, message: 'Item editado com sucesso' }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETE_ITEM,
    SUCESS_UPTADE_ITEM
}
