// toilet-paper-icon_32 from Rokey (http://www.iconarchive.com/show/smooth-icons-by-rokey/toilet-paper-icon.html)
// 48-fork-and-knife-icon by Glyphish (http://glyphish.com/)
// test 
// cfx run --binary-args="-url http://www.rightmove.co.uk/property-for-sale/property-33577650.html"

var listingPostcode = $("a.icon-before.icon-broadband").attr('href').split('#')[1].split('/')[0].replace('_','');

alert(listingPostcode);

self.port.emit("queryPostcode", {postcode:listingPostcode});

// Set up the listener for the result returned from the addon script
self.port.on("postcodeLocation", function(location) {
	console.log("lat " + location.lat + ", lng " + location.lng);
});
/*
var restaurantEntries = $("div.restaurant");

var config = document.createElement('div');
config.id = "nomorvom_config"
config.style.border = "thin dashed red";
config.style.padding = "5px 10px 25px 10px";
config.style.margin = "5px";

var sliderLabel = document.createElement('p');
sliderLabel.id = "nomorvom_config_title";
sliderLabel.appendChild(document.createTextNode("Move the sliders to filter results by hygiene rating:"));
config.appendChild(sliderLabel);

var scoreFilterSlider = document.createElement('div');
scoreFilterSlider.id = "scoreFilterSlider";
$(scoreFilterSlider).slider({
	range: true,
	values: [0, 5],
	min: 0,
	max: 5,
	step: 1,
	slide: function( event, ui ) {
		ApplyFilter(ui.values, restaurantEntries);
	}
});

//
// Add labels to slider whose values 
// are specified by min, max and whose
// step is set to 1
//

// Get the number of possible values
var vals = $(scoreFilterSlider).slider("option", "max") - $(scoreFilterSlider).slider("option", "min");

// Space out values
for (var i = 0; i <= vals; i++) {
	var el = $('<label>'+(i)+'</label>').css('left',(i/vals*100)+'%');

	$(scoreFilterSlider).append(el);
}

config.appendChild(scoreFilterSlider);

var excludeNoDataLabel = document.createElement('p');
excludeNoDataLabel.id = "nomorvom_config_title";
excludeNoDataLabel.style.padding = "20px 0px";
excludeNoDataLabel.appendChild(document.createTextNode("Exclude 'No Result' Entries:"));

var excludeNoDataCheckbox = document.createElement('input');
excludeNoDataCheckbox.type = "checkbox"
excludeNoDataCheckbox.id = "nomorvom_config_excludeNoData";
$(excludeNoDataCheckbox).prop('checked', true);
$(excludeNoDataCheckbox).change(function() {
	ApplyFilter($(scoreFilterSlider).slider("values"), restaurantEntries, $(excludeNoDataCheckbox).prop('checked'));
});
excludeNoDataLabel.appendChild(excludeNoDataCheckbox);

//config.appendChild(excludeNoDataLabel);

$("div.restaurants").prepend(config);

// Set up the listener for the result returned from the addon script
self.port.on("restaurantScore", function(restaurantScore) {
	//console.log("id " + restaurantScore.id + ", rating " + restaurantScore.rating);
	// find the score placeholder for the restaurant we've got a result for
	var restaurantScorePlaceholder = $("div.restaurant[data-nomorvom-id='"+restaurantScore.id+"'] div#nomorvom");
	restaurantScorePlaceholder.attr("data-rating", restaurantScore.rating);
	$("p#nomorvom_loading", restaurantScorePlaceholder).remove();
	$("div#nomorvom_progressbar", restaurantScorePlaceholder).remove();
	
	if (restaurantScore.rating > 0) {
		for (var i = 0; i < restaurantScore.rating; i++) {
			AppendImg(restaurantScorePlaceholder, '48-fork-and-knife-icon.png');
		}
		for (var i = 0; i < 5 - restaurantScore.rating; i++) {
			AppendImg(restaurantScorePlaceholder, 'toilet-paper-icon_32.png');
		}
	}

	var resultText = document.createElement('div');
	resultText.id = "hygieneScore"
	resultText.style.fontWeight = "bold";
	resultText.style.margin = "0px 5px";

	if (restaurantScore.rating == "AwaitingInspection") {
		$(resultText).text("This takeaway is awaiting inspection");					
		restaurantScore.rating = 0;
	}	
	else {
		if (restaurantScore.rating == -1) {
			$(resultText).text("Sorry, no food hygiene data found");
		}
		else {
			$(resultText).text("Hygiene Score : " + restaurantScore.rating + "/5");
		}
	}
	restaurantScorePlaceholder.append(resultText);

	// Filter accordingly
	var ratingFilterRange = $(scoreFilterSlider).slider("values");
	//var excludeNoData =  $(excludeNoDataCheckbox).prop('checked');
	//if ( ((rating == -1) && excludeNoData) || (rating < ratingFilterRange[0]) || (rating > ratingFilterRange[1]) ) { 
	if ((restaurantScore.rating < ratingFilterRange[0]) || (restaurantScore.rating > ratingFilterRange[1])) { 
		$("div.restaurant[data-nomorvom-id='"+restaurantScore.id+"']").hide();
	}
	else
	{
		$("div.restaurant[data-nomorvom-id='"+restaurantScore.id+"']").show();
	}

});


var restaurantId = 0;

restaurantEntries.each(function () {
    var _this = $(this);
    var name = $("h2.name a:first", this).text().trim(); 
    var address = $("p.address:first", this)
    	.clone()
    	.children()
    	.remove()
    	.end()
    	.text().trim();

    self.port.emit("queryRestaurant", {id:restaurantId, name:name, address:address});

//    var url = "http://api.ratings.food.gov.uk/Establishments?name=" + encodeURIComponent(name) + "&address=" + encodeURIComponent(address);

    var scorePlaceholder = document.createElement('div');
	scorePlaceholder.id = "nomorvom";
	scorePlaceholder.style.border = "thin dashed red";
    scorePlaceholder.style.padding = "5px";
	scorePlaceholder.style.margin = "5px";
	scorePlaceholder.width = "50%";
	
	var loadingText = document.createElement('p');
	loadingText.id = "nomorvom_loading";
	loadingText.style.fontWeight = "bold";
	loadingText.style.padding = "0px 5px";
	$(loadingText).text("Loading food scores...");
	
    var loaderImg = document.createElement('div');
	loaderImg.id = "nomorvom_progressbar";
	$(loaderImg).progressbar({
      value: false
	});
	
	scorePlaceholder.appendChild(loadingText);
	scorePlaceholder.appendChild(loaderImg);
	
	$(scorePlaceholder).attr("data-rating", 0);

	_this.attr("data-nomorvom-id", restaurantId);

    _this.append(scorePlaceholder);
    
    restaurantId++;
});

*/