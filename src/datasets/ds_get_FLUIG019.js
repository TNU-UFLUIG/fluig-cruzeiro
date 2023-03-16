// GESTORES

const campos = ['CODCOLIGADA', 'CODFILIAL', 'CHAPA', 'NOME'];
const display = ['CHAPA', 'NOME'];
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
  let gestores = consultaRM('FLUIG.019', campos);

  let json = {
    gestores
  };

  return montaDataset(json.ttErro, json.gestores, campos, display, null, true);
}

/*$$ partials/functions.js $$*/
/*$$ partials/processErrorResult.js $$*/
/*$$ partials/consultaRM.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
