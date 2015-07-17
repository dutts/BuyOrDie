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
		var Request = require("sdk/request").Request;
		Request({
  			url: url,
  			headers: {'x-api-version':2, 'Content-Type':'application/json', 'Accept':'application/json'},
			onComplete: function (postcodeResponse) {	
				if (postcodeResponse.json != null) {
					//worker.port.emit("postcodeLocation", {lat:postcodeResponse.json.result.latitude, lng:postcodeResponse.json.result.longitude});
					var policeUrl = "https://data.police.uk/api/crimes-street/all-crime?lat=" + encodeURIComponent(postcodeResponse.json.result.latitude) + "&lng=" + encodeURIComponent(postcodeResponse.json.result.longitude);
					Request({
  						url: policeUrl,
  						headers: {'x-api-version':2, 'Content-Type':'application/json', 'Accept':'application/json'},
						onComplete: function (policeResponse) {
							worker.port.emit("policeData", {data:policeResponse});
						}
					}).get();
				}
			}
		}).get();
	});	
}