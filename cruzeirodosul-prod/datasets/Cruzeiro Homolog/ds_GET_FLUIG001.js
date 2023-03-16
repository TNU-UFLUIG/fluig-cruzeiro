/* ** ************
 * DATASET CONSULTA RM FLUIG.001 - Dados de Funcionários
 */

function createDataset(fields, constraints, sortFields) {
	log.info("=== ds_GET_FLUIG001");
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch (e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
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

function defineStructure() {

	addColumn('CODCOLIGADA');
	addColumn('CODPESSOA');
	addColumn('CHAPA');
	addColumn('CPF');
	addColumn('NOME');

	setKey(["CODCOLIGADA", "CODPESSOA"]);
}

function onSync(lastSyncDate) {


	var dataset = DatasetBuilder.newDataset();
	var xmlResultados = new XML(callService(null, null, null));


	for (var i = 0; i < xmlResultados.Resultado.length(); i++) {



		wc1 = "";
		try {
			wc1 = xmlResultados.Resultado[i].CODCOLIGADA.toString();
		} catch (e) {
			wc1 = "";
		}

		wc2 = "";
		try {
			wc2 = xmlResultados.Resultado[i].CODPESSOA.toString();
		} catch (e) {
			wc2 = "";
		}

		wc3 = "";
		try {
			wc3 = xmlResultados.Resultado[i].CHAPA.toString();
		} catch (e) {
			wc3 = "";
		}

		wc4 = "";
		try {
			wc4 = xmlResultados.Resultado[i].CPF.toString();
		} catch (e) {
			wc4 = "";
		}

		wc5 = "";
		try {
			wc5 = xmlResultados.Resultado[i].NOME.toString();
		} catch (e) {
			wc5 = "";
		}


		dataset.addOrUpdateRow(new Array(
			wc1,
			wc2,
			wc3,
			wc4,
			wc5
		));
	}
	return dataset;


}

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch (e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();


	//** TRABALHAR RETORNO XML
	var xmlResultados = new XML(result);


	dataset.addColumn('CODCOLIGADA');
	dataset.addColumn('CODPESSOA');
	dataset.addColumn('CHAPA');
	dataset.addColumn('CPF');
	dataset.addColumn('NOME');

	for (var i = 0; i < xmlResultados.Resultado.length(); i++) {

		wc1 = "";
		try {
			wc1 = xmlResultados.Resultado[i].CODCOLIGADA.toString();
		} catch (e) {
			wc1 = "";
		}

		wc2 = "";
		try {
			wc2 = xmlResultados.Resultado[i].CODPESSOA.toString();
		} catch (e) {
			wc2 = "";
		}

		wc3 = "";
		try {
			wc3 = xmlResultados.Resultado[i].CHAPA.toString();
		} catch (e) {
			wc3 = "";
		}

		wc4 = "";
		try {
			wc4 = xmlResultados.Resultado[i].CPF.toString();
		} catch (e) {
			wc4 = "";
		}

		wc5 = "";
		try {
			wc5 = xmlResultados.Resultado[i].NOME.toString();
		} catch (e) {
			wc5 = "";
		}


		dataset.addRow(new Array(
			wc1,
			wc2,
			wc3,
			wc4,
			wc5
		));
	}
	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
	verifyConstraints(params, constraints);

	dataset.addColumn('error');
	dataset.addColumn('codColigada');
	dataset.addColumn('codSentenca');
	dataset.addColumn('parameters');
	dataset.addColumn('codSistema');

	var codColigada = isPrimitive(params.codColigada) ? params.codColigada : JSONUtil.toJSON(params.codColigada);
	var codSentenca = isPrimitive(params.codSentenca) ? params.codSentenca : JSONUtil.toJSON(params.codSentenca);
	var parameters = isPrimitive(params.parameters) ? params.parameters : JSONUtil.toJSON(params.parameters);
	var codSistema = isPrimitive(params.codSistema) ? params.codSistema : JSONUtil.toJSON(params.codSistema);

	dataset.addRow([error.message, codColigada, codSentenca, parameters, codSistema]);

	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.ObjectFactory");

	return objectFactory;
}

function data() {
	return {
		"fluigService": "wsSQL",
		"operation": "realizarConsultaSQL",
		"soapService": "WsConsultaSQL",
		"portType": "IwsConsultaSQL",
		"locatorClass": "com.totvs.WsConsultaSQL",
		"portTypeMethod": "getRMIwsConsultaSQL",
		"parameters": [],
		"inputValues": {
			"codColigada": 0,
			"codSentenca": "FLUIG.001",
			"parameters": "?",
			"codSistema": "V"
		},
		"inputAssignments": {
			"codColigada": "VALUE",
			"codSentenca": "VALUE",
			"parameters": "VALUE",
			"codSistema": "VALUE"
		},
		"outputValues": {},
		"outputAssignments": {},
		"extraParams": {
			"enabled": false
		}
	}
}