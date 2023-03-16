// TIPO DE DEMISSÃO

const campos = ['CODIGO', 'DESCRICAO'];
const display = ['CODIGO', 'DESCRICAO'];
const dePara = campos;

function defineStructure() {

  campos.forEach(function (campo) {
    addColumn(campo);
  });

  addColumn('displaykey');
  setKey(['CODIGO']);

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
  let tiposDemissao = consultaRM('FLUIG.016', campos);

  let json = {
    tiposDemissao
  };

  return montaDataset(json.ttErro, json.tiposDemissao, campos, display, null, true);
}

/*$$ partials/functions.js $$*/
/*$$ partials/processErrorResult.js $$*/
/*$$ partials/consultaRM.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
