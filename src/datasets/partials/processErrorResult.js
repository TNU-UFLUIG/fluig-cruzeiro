function processErrorResult(error, constraints) {
  const dataset = DatasetBuilder.newDataset();

  const params = data().inputValues;
  verifyConstraints(params, constraints);

  dataset.addColumn('error');
  dataset.addColumn('codColigada');
  dataset.addColumn('codSentenca');
  dataset.addColumn('parameters');
  dataset.addColumn('codSistema');

  const codColigada = isPrimitive(params.codColigada) ? params.codColigada : JSONUtil.toJSON(params.codColigada);
  const codSentenca = isPrimitive(params.codSentenca) ? params.codSentenca : JSONUtil.toJSON(params.codSentenca);
  const parameters = isPrimitive(params.parameters) ? params.parameters : JSONUtil.toJSON(params.parameters);
  const codSistema = isPrimitive(params.codSistema) ? params.codSistema : JSONUtil.toJSON(params.codSistema);

  dataset.addRow([error.message, codColigada, codSentenca, parameters, codSistema]);

  return dataset;
}