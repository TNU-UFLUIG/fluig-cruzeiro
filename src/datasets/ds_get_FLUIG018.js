// INSTITUIÇÃO DE ENSINO

const campos = ['CODCOLIGADA', 'CODFILIAL', 'CNPJ', 'NOME', 'NOMEFANTASIA'];
const display = ['CNPJ', 'NOME'];
const dePara = campos;

function defineStructure() {

  campos.forEach(function (campo) {
    addColumn(campo);
  });

  addColumn('displaykey');
  setKey(['CODCOLIGADA', 'CODFILIAL', 'CNPJ']);

}

function onSync(lastSyncDate) {
  return buscaDataset();
}

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  let instituicoes = consultaRM('FLUIG.018', campos);

  let json = {
    instituicoes
  };

  return montaDataset(json.ttErro, json.instituicoes, campos, display, null, true);
}

/*$$ partials/functions.js $$*/
/*$$ partials/processErrorResult.js $$*/
/*$$ partials/consultaRM.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
