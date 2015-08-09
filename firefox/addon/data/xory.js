// toilet-paper-icon_32 from Rokey (http://www.iconarchive.com/show/smooth-icons-by-rokey/toilet-paper-icon.html)
// 48-fork-and-knife-icon by Glyphish (http://glyphish.com/)
// test 
// cfx run --binary-args="-url http://www.rightmove.co.uk/property-for-sale/property-33577650.html"

var listingPostcode = $("a.icon-before.icon-broadband").attr('href').split('#')[1].split('/')[0].replace('_','');

alert(listingPostcode);

self.port.emit("queryPostcode", {postcode:listingPostcode});

// Set up the listener for the result returned from the addon script
self.port.on("postcodeLocation", function(msg) {
	console.log("lat " + msg.lat + ", lng " + msg.lng);
});

self.port.on("policeData", function(msg) {
	console.log(msg.name + " " + msg.number);
});