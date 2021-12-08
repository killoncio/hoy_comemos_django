var receipts =  $('.receipt');
var addForm = $('#addRecetaForm');
var purchaseList = '';
var chooseWeeklyMenuTemplate = $('#choose_weekly_menu_template').html();
var mealsListTemplate = $('#meals_list_template').html();
var footer = $('.footer');
var selectedFilters = [];
var filtersModalHeight = 0;
var filterVisible = false;
var inputFilter = $('.js-autocomplete');

function render(template, dataObject) {
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, dataObject);
	$('#meals-list').html(rendered);
}

// data structure: {"id": 1, "nombre":"pittige varkenhaas", "category":"carne"}
var mealsData = [];

var weeklyMenu = {
	daylyCategory: ["pasta","pescado","guiso","verduras","pizza","pasta","carne"],
	day: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
	currentDate: new Date(),
	menuIds: [],
	dayIndex: 0,
	selectedWeeklyMenu: [],
	init: function() {
		this.render();
		this.setCurrentDateToMonday();
	},
	setCurrentDateToMonday: function() {
		var day = this.currentDate.getDay();
		while (day !==1) {
			this.currentDate.setDate(this.currentDate.getDate() + 1);
			day = this.currentDate.getDay();
		}
	},
	onSelect: function(e) {
		var id = $(e.target).closest('.receipt').attr('id');
		this.store(id);
		this.dayIndex++;
		this.currentDate.setDate(this.currentDate.getDate() + 1);

		if (this.dayIndex < this.daylyCategory.length) {
			// show next day/category to choose meal
			this.render();
		} else {
			// show weekly menu selected
			var meals = mealsData.filter(function(meal) { return weeklyMenu.menuIds.indexOf(meal.id) > -1 });
			// add day and sort by day
			$(meals).each(function(index, meal){
				var index = weeklyMenu.menuIds.indexOf(meal.id);
				meal.day = weeklyMenu.day[index];
				weeklyMenu.selectedWeeklyMenu[index] = meal;
			});
			render(mealsListTemplate, {'receipts': weeklyMenu.selectedWeeklyMenu});
		}
	},
	getMeal: function(id) {
		return mealsData.filter(function(meal) { return meal.id === parseInt(id) });
	},
	store: function(id) {
		// save it locally to render final menu
		this.menuIds.push(parseInt(id));

		var meal = this.getMeal(id)[0];

		var data = {
			name : meal.name,
			category: meal.category,
			date: helper.getFormattedDay(this.currentDate)
		}

	    $.ajax({
	        url: 'save_weekly_menu.php',
	        method: 'POST',
	        data: data
	    }).done(function(data){
	    	// todo: show success or error message
	    	// todo: change icon
			console.log("done");
	    });
	},
	render: function() {
		var currentCategory = this.daylyCategory[this.dayIndex];
		var meals = mealsData.filter(function(meal) {return meal.category === currentCategory});
		render(chooseWeeklyMenuTemplate,{'receipts': meals});
	}
}

var renderView = function(e) {
	var button = $(e.target);
	var type = button.data('type');

	if (receipts.length === 0) {
		receipts = $('.receipt');
	}

	button.closest('li').addClass('active').siblings('.active').removeClass('active');

	if (type === "todo" || type === "add" || type === "lista") {
		receipts.toggleClass('hide', type !== "todo");
		addForm.toggleClass('hide', type !== "add");
	} else if (type === "weekly_menu") {
		weeklyMenu.init();
	} else if (type === "new") {
		receipts.addClass('hide').filter(".receipt_new").removeClass('hide');
	} else {
		receipts.addClass('hide').filter("[data-category=" + type + "]").removeClass('hide');
	}
}

function showRandomElement() {
	var receiptsSinPostres = receipts.filter('[data-tipo!=postre]');
	var randomNumber = Math.floor(Math.random() * receiptsSinPostres.length);
	receiptsSinPostres.eq(randomNumber).removeClass('hide');
}



var dropzone = $('#meals-list'),
    leftOffset = 0,
    leftX = 0,
    overallMovement = 0;

var placeholder;
var isPlaceholderAppended = false;

var onTouchStart = function(event) {
	var $this = $(event.currentTarget);
	var offset = $this.offset();
	var width = $this.outerWidth();
	var height = $this.outerHeight();

	placeholder = '<li style="width:' + width + 'px; height:' + height + 'px;"></li>';
	leftX = offset.left;
	var touches = event.originalEvent.changedTouches;
	leftOffset = touches[0].clientX - leftX;
}

var onTouchMove = function(event) {
	var $this = $(event.currentTarget);
	var touches = event.originalEvent.changedTouches;
	var leftMovement = touches[0].clientX - leftOffset;

	if (leftMovement > -10) {

	} else {
		event.preventDefault();
		$this.css({'position': 'relative',
		         'left': leftMovement});

		overallMovement = Math.abs(leftMovement - leftX);
		if (overallMovement > 199) {
			$this.fadeOut(200);
		}
	}
}

var onTouchEnd = function(event) {
	var $this = $(event.currentTarget);

	if (overallMovement < 200) {
		$this.css({'position': 'relative',
			'left': leftX});
	}



    leftOffset = 0;
    leftX = 0;
    overallMovement = 0;
}

function showIngredients(event) {
	event.preventDefault();
	var trigger = $(event.target);
	var ingredients = trigger.parent('.receipt_name').siblings('.receipt_ingredients').text();

	var template = $('.js-ingredients_template').clone();
	// Mustache.parse(template);   // optional, speeds up future uses
	// var rendered = Mustache.render(template,{'ingredients': ingredients});
	template.removeClass('hide').find('.ingredients_list').html(ingredients);
	$('#ingredients_text').html(template);

}

function promptUrlField(event) {
	event.preventDefault();
	var url = prompt("introduce la url de la receta");
	var id = $(event.target).closest('.receipt').attr('id');

	if (url != null) { // I should check whether is a correct url and prevent injection attacks
		saveUrl(id,url);
	}
}

function saveUrl(id, url) {
    $.ajax({
        url: 'save_url.php',
        method: 'POST',
        data:{
        	id: id,
        	link: url
        }
    }).done(function(data){
    	// todo: show success or error message
    	// todo: change icon
		console.log("url " + url + " saved in id " + id);
    });
}

function getFiltersModalHeight() {
	if (!filtersModalHeight) {
		filtersModalHeight = $('.footer ul').innerHeight() - 10;
	}

	return filtersModalHeight;
}

function toggleFiltersModal() {
	var height = filterVisible ? 0 : getFiltersModalHeight();
	footer.css({'-webkit-transform':'translateY(-' + height + 'px)'});
	filterVisible = !filterVisible
}

function applyFilters(e) {
	if (receipts.length === 0) {
		receipts = $('.receipt');
	}

	var filter = $(e.target).data('category');

	// multifiltering supported
	if (selectedFilters.indexOf(filter) > -1) {
		selectedFilters.splice(selectedFilters.indexOf(filter),1)
	} else {
		selectedFilters.push(filter)
	}

	if (selectedFilters.length > 0) {
		receipts.addClass('hide').filter(function() {
			for (var i=0; i < selectedFilters.length; i++) {
				return ( $(this).data('category') === selectedFilters[i] || $(this).data('preferred') === selectedFilters[i] )
			}
		}).removeClass('hide');
	} else {
		receipts.removeClass('hide');
	}

}

function filterByName(e) {

	var value = $(e.target).val().toLowerCase();
	if (value === "") {
		return;
	}

	var re = new RegExp(value,'g');

	if (receipts.length === 0) {
		receipts = $('.receipt');
	}

	receipts.addClass('hide').filter(function() {
		var name = $(this).find('.receipt_name').text().trim().toLowerCase();
		return re.test(name);
	}).removeClass('hide');

}

function attachEvents() {
	$('#meals-list')
		// .on('touchstart', '.receipt', onTouchStart) // after last css changes, this does not behave that well, disabling it, maybe I'll fix it later
		// .on('touchmove', '.receipt', onTouchMove)
		// .on('touchend', '.receipt', onTouchEnd)
		.on('click', '.ingredients_trigger', showIngredients)
		.on('click', '.url_set', promptUrlField)
		.on('click', '.choose_receipt', weeklyMenu.onSelect.bind(weeklyMenu));

	$('#type_selector').on('click','a', renderView);

	inputFilter.on('keyup',filterByName);

	footer
		.on('click','button', toggleFiltersModal)
		.on('click','.meal_filter input', applyFilters);
}

function init() {
	attachEvents();
}

init();

var helper = {
	getFormattedDay: function(day) {
		var dd = day.getDate();
		var mm = day.getMonth() + 1; //January is 0!
		var yyyy = day.getFullYear();
		if (dd < 10) {
		  dd = '0' + dd;
		}
		if (mm < 10) {
		  mm = '0' + mm;
		}

		return dd + '/' + mm + '/' + yyyy;
	}
}

