// MOTIVO DE DEMISSÃO

const campos = ['CODCOLIGADA', 'CODIGO', 'DESCRICAO'];
const display = ['CODCOLIGADA', 'CODIGO'];
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
  let motivosDemissao = consultaRM('FLUIG.017', campos);

  let json = {
    motivosDemissao
  };

  return montaDataset(json.ttErro, json.motivosDemissao, campos, display, null, true);
}

/*$$ partials/functions.js $$*/
/*$$ partials/processErrorResult.js $$*/
/*$$ partials/consultaRM.js $$*/
/*$$ partials/getDataset.js $$*/
/*$$ partials/montaDataset.js $$*/
