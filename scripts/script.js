// **************************back to top sticky button*****************, snippet adapted from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
$(document).ready(function() {
	console.log("ready!");

	window.addEventListener("scroll", function() {
		if (window.scrollY > 100) {
			$('#navs').addClass("backgr");
			$("#topButton").show();
		} else {
			$('#navs').removeClass("backgr");
			$("#topButton").hide();
		}
	});
});
//SMOOTH SCROLLING, code snipped taken from https://css-tricks.com/snippets/jquery/smooth-scrolling/
// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

// ***********************specials modal.************************************* code adapted from https://codepen.io/andrewerrico/pen/Efyrt
$(function() {
	$('#specials').click(function() {
		$('#specialsContent').fadeToggle();
	});

	$(document).mouseup(function(e) {
		var container = $("#specialsContent");

		if (!container.is(e.target) // if the target of the click isn't the container...
			&&
			container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			container.fadeOut();
		}
	});
});

$(function() {
	$(".close").click(function() {
		console.log('clicked');
		$("#specialsContent").fadeOut();
	});
});

// *********************************ACCORDION*************************************************, Jquery UI Accordion widget

var icons = {
	header: "ui-icon-circle-arrow-e",
	activeHeader: "ui-icon-circle-arrow-s"
};

$("#accordion").accordion({
	icons: icons,
	collapsible: true,
	active: false
});
// **********************************MODAL on services page, from http://api.jqueryui.com/dialog/
$(function() {

	// Use jQuery event to trigger price calculator when inputs are changed
	$('.triggerPriceCalcOnChange').change(function() {
		calculateTotal();
	});

	// Also, calculate the price immediately when the page loads, using the
	// default values already in the forms
	calculateTotal();

	// Called when user clicks on any plus icon
	$('.dialogOpener').on('click', function() {

		// We need to close any open dialog boxes, before opening the one that
		// the user clicked. We will loop over all the elements with the
		// dialogOpener class, then call the dialog close method on the relevant
		// dialog ID.
		$('.dialogOpener').each(function(index) {
			// Determine the dialog to open ID for this particular button
			var dialogToOpen = $(this).attr('data-dialog-to-open');
			console.log("Close this dialog: " + dialogToOpen);

			// Call the close dialog method
			$('#' + dialogToOpen + 'Dialog').dialog('close');
		});

		// Now open the specific dialog that the user requested
		var dialogToOpen = $(this).attr('data-dialog-to-open');
		console.log("Open this dialog: " + dialogToOpen);
		$('#' + dialogToOpen + 'Dialog').dialog('open');
	});

	$(".nailsDialog").dialog({
		minWidth: 600,
		closeText: "X",
		autoOpen: false
	});

});
// ****************************************PRICE CALCULATOR,refactored, original from http://javascript-coder.com/javascript-form/javascript-calculator-script.phtml***********************************

function calculateTotal() {
	console.log('called calculateTotal');

	var nailServicePrice = parseInt($('input[name="selectedService"]:checked').val());
	console.log("Selected service price is: " + nailServicePrice);

	var extrasPrice = parseInt($('#extras option:selected').val());
	console.log("Selected extras price is: " + extrasPrice);

	var nailArtPrice = $('#includeNailArt:checked').length ? parseInt($('#includeNailArt').val()) : 0;
	console.log("Include nail art price is: " + nailArtPrice);

	var specialityPrice = $('#includeSpeciality:checked').length ? parseInt($('#includeSpeciality').val()) : 0;
	console.log("Include speciaility price is: " + specialityPrice);

	//Here we get the total price by calling our function
	//Each function returns a number so by calling them we add the values they return together
	var totalPrice = nailServicePrice + extrasPrice + nailArtPrice + specialityPrice;

	// Display the total price
	$('#totalPrice').html('Total Price: $' + totalPrice);
}
// end Price Calculator
// GOOGLE MAP from https://developers.google.com/maps/documentation/javascript/
function initMap() {
	var richmond = {
		lat: -33.6022563,
		lng: 150.7491528
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: richmond
	});
	var marker = new google.maps.Marker({
		position: richmond,
		map: map
	});
}