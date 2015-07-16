var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
    include: ["http://www.rightmove.co.uk/property-for-sale/*", "http://rightmove.co.uk/property-for-sale/*"],
 	contentStyleFile: [self.data.url("jquery-ui-1.11.4/jquery-ui.min.css"), self.data.url("buyordie.css")],
    contentScriptOptions: {prefixDataURI: self.data.url("")},
	contentScriptFile: [self.data.url("jquery-2.1.3/jquery-2.1.3.min.js"), self.data.url("jquery-ui-1.11.4/jquery-ui.min.js"), self.data.url("xory.js")],
	contentScriptWhen: "ready",
	onAttach: startListening
});

function startListening(worker) {
	worker.port.on("queryPostcode", function(msg) {
		
		var url = "http://api.postcodes.io/postcodes/" + encodeURIComponent(msg.postcode); 
		var rating = 0;

		var Request = require("sdk/request").Request;
		Request({
  			url: url,
  			headers: {'x-api-version':2, 'Content-Type':'application/json', 'Accept':'application/json'},
			onComplete: function (response) {	
				if (response.json != null) {
					worker.port.emit("postcodeLocation", {lat:response.json.result.latitude, lng:response.json.result.longitude});
				}
			}
		}).get();
	});	
}
