var Util = (function ( $ ) {

	var Log = function ( domain, enabled ) {
		
		var enabled = enabled || false,
			allowedDomain = domain || "/";
		
		if (document.URL.indexOf( allowedDomain ) !== -1 ||
			document.URL.indexOf( "localhost" )   !== -1) {
				enabled = true;
		}
		
		this.print = function ( msg ) {
			if (enabled && window.console && window.console.log) {
				console.log( msg );
			}		
		}
		
		return this;
	};	
	
	var Event = function (namespace, target) {
			
			this.namespace = namespace ? "." + namespace : "";
			this.target = target || $( {} );
			this.log = new Log();
	};
	
	Event.prototype.setTarget = function (target) {
		this.target = target;
	};

	Event.prototype.subscribe = function (topic, callback) {
		
		var that = this,
			topic = topic + this.namespace;
		
		that.target.on(topic, function (e, params) {
			if ( callback && (typeof callback === "function") ) {
				callback.apply(callback, [e, params]);
			}
		});
		
		that.log.print("subscribe -> " + topic);
	};
	
	Event.prototype.unsubscribe = function (topic) {	

		var topic = topic + this.namespace;
		this.target.off(topic);
		this.log.print("unsubscribe -> " + topic);
	};
	
	Event.prototype.publish = function (topic, params) {

		var that = this,
			params = params || null,
			topic = topic + this.namespace;
		
		that.target.trigger(topic, [params]);
		
		that.log.print("publish -> " + topic);
		that.log.print(params);
	};
	
	return { Log : Log, Event : Event };

})( jQuery );	

// use

var Event = new Util.Event("somenamespace");

Event.subscribe("sometopic", function (e, params) { 
	console.log("callback");
	console.log(params);		
	console.log(e.namespace);
	console.log(this);
});

Event.publish("sometopic", [{a:1}, "!#", {"ASDASD":123}]);
Event.unsubscribe("sometopic");	
Event.publish("sometopic", [{a:1}, "!#", {"ASDASD":123}]);
