// DADOS DE FUNCIONÁRIOS

const campos = ['CODCOLIGADA', 'CODPESSOA', 'CHAPA', 'CPF', 'NOME'];
const display = ['CPF', 'NOME'];
const dePara = campos;

function defineStructure() {

  campos.forEach(function (campo) {
    addColumn(campo);
  });

  addColumn('displaykey');
  setKey(['CODCOLIGADA', 'CODPESSOA']);

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
  let funcionarios = consultaRM('FLUIG.001', campos);

  let json = {
    funcionarios
  };

  return montaDataset(json.ttErro, json.funcionarios, campos, display, null, true);
}

/*$$ partials/functions.js $$*/
/*$$ partials/processErrorResult.js $$*/
/*$$ partials/consultaRM.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
