function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}

function getParamValue(param, assignment) {
  if (assignment === 'VARIABLE') {
    return getValue(param);
  } else if (assignment === 'NULL') {
    return null;
  }
  return param;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.ObjectFactory");

	return objectFactory;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}