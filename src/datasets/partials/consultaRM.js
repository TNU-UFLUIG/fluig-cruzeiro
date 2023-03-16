function consultaRM(service, fields) {
  const xmlResultados = new XML(callService(service));
  const arrayResult = [];

  for (let i = 0; i < xmlResultados.Resultado.length(); i++) {
    const reg = {};
    fields.forEach((campo) => {
      reg[campo] = xmlResultados.Resultado[i][campo];
    });
    arrayResult.push(reg);
  }

  return arrayResult;
}

function callService(serviceName) {
  const serviceData = {
    fluigService: 'wsSQL',
    operation: 'realizarConsultaSQL',
    soapService: 'WsConsultaSQL',
    portType: 'IwsConsultaSQL',
    locatorClass: 'com.totvs.WsConsultaSQL',
    portTypeMethod: 'getRMIwsConsultaSQL',
    parameters: [],
    inputValues: {
      codColigada: 0,
      codSentenca: serviceName,
      parameters: '?',
      codSistema: 'V'
    },
    inputAssignments: {
      codColigada: 'VALUE',
      codSentenca: 'VALUE',
      parameters: 'VALUE',
      codSistema: 'VALUE'
    },
    outputValues: {},
    outputAssignments: {},
    extraParams: {
      enabled: false
    }
  };
  const params = serviceData.inputValues;
  var assigns = serviceData.inputAssignments;

  verifyConstraints(serviceData.inputValues, constraints);

  var serviceHelper = ServiceManager.getService(serviceData.fluigService);

  var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
  var service = serviceLocator.getRMIwsConsultaSQL();

  var helperServico = serviceHelper.getBean();
  // Autenticação no serviço  
  var authServico = helperServico.getBasicAuthenticatedClient(service, "com.totvs.IwsConsultaSQL", "integracaofluig", "integra@Fluig#2022");

  var response = authServico.realizarConsultaSQL(getParamValue(params.codSentenca, assigns.codSentenca), getParamValue(params.codColigada, assigns.codColigada),
    getParamValue(params.codSistema, assigns.codSistema), getParamValue(params.parameters, assigns.parameters)
  );

  response = response.split("&#x5").join("")


  return response;
}
