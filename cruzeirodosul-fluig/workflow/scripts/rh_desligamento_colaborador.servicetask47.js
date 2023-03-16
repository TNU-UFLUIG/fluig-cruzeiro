function servicetask47(attempt, message) {
 try {
	 var Service = ServiceManager.getService('WS_BUONNY');
	 var serviceHelper = Service.getBean();
  //var serviceLocator = serviceHelper.instantiate('classe.locator');
 } catch(error) { 
	log.error(error);
	throw error;
 }
}