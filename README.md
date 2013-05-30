CEvent
=============

jQuery custom event wrapper class.

Use:

var Event = new Utils.CEvent("somenamespace");

Event.subscribe("sometopic", function (e, params) { 
  console.log("callback");
	console.log(params);		
	console.log(e.namespace);
	console.log(this);
});

Event.publish("sometopic", [{a:1}, "!#", {"ASDASD":123}]);
Event.unsubscribe("sometopic");	
Event.unsubscribe("somenamespace");  
Event.publish("sometopic", [{a:1}, "!#", {"ASDASD":123}]);
