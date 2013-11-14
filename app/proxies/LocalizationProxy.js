(function(){
	
	var LocalizationProxy = function() {
		if (LocalizationProxy.instance===null) {
			LocalizationProxy.instance = this;
			this.initialize();
		}else{
			Chaos.logger.error("You should not call the constructor for " + this.toString() + " directly.  It is a singleton, so you should use getInstance()");
		}
	};

	LocalizationProxy.instance = null;

	LocalizationProxy.getInstance = function (){
		
		if(LocalizationProxy.instance===null){
			LocalizationProxy.instance = new LocalizationProxy();
		}
			
		return LocalizationProxy.instance;
	};
	
	LocalizationProxy.DEFAULT_LOCALE_CODE = "en_us";
	
	var p = LocalizationProxy.prototype;
	
	p.locales;
	p.localizedContent;
	p.sections;
	p.sectionsHash;
	p.envConfig;
	p.service;
	
	p.initialize = function (){
		this.appSettings = Chaos.AppSettings.getInstance();
		this.service = Chaos.LocalizationService.getInstance();
		this.locales = [];
		this.localizedContent = [];
		this.sections = [];
		this.sectionsHash = [];
	};
	
	p.loadLocalizedContent = function ($locale){
		
		var localeCode;

		if($locale)
			localeCode = $locale;
		else
			localeCode = Chaos.AppProperties.getInstance().locale || LocalizationProxy.DEFAULT_LOCALE_CODE;
		
		var scope = this;
		this.service.getLocalizedContent(localeCode, function ($event){scope.handleLoadLocalizedContentSuccess($event);}, function ($event){scope.handleLoadLocalizedContentFault($event);} );
	};
	
	p.handleLoadLocalizedContentSuccess = function($event){

		var result = $event;
		
		var sections = [];
		
		for (var i = result.length - 1; i >= 0; i--){
			sections.push(Chaos.LocalizedSection.deserialize(result[i]));
		}
		
		this.localizedContent = sections;
		
		new Chaos.LocalizationProxyEvent(Chaos.LocalizationProxyEvent.LOAD_LOCALIZATION_CONTENT_SUCCESS).dispatch();
	};

	p.handleLoadLocalizedContentFault = function($event){
		new Chaos.LocalizationProxyEvent(Chaos.LocalizationProxyEvent.LOAD_LOCALIZATION_CONTENT_FAULT).dispatch();
	};

	p.toString = function (){
		return "[LocalizationProxy]";
	};
	
Chaos.LocalizationProxy = LocalizationProxy;
}());