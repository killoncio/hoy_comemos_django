var receipts =  $('.receipt');
var addForm = $('#addRecetaForm');
var purchaseListWrapper = $('#purchase_text');
var purchaseList = '';
var chooseWeeklyMenuTemplate = $('#choose_weekly_menu_template').html();
var mealsListTemplate = $('#meals_list_template').html();
var footer = $('.footer');
var selectedFilters = [];
var filtersModalHeight = 0;
var filterVisible = false;

function render(template, dataObject) {
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, dataObject);
	$('#receipt_list').html(rendered);
}

function createImageName(receipts) {
	var wordsToReplace = [" a la ", " a las ", " y "," con "," al "," met "," de "," la "," las "," en ", " a ", " and ", " "];

	for (var i=0; i < receipts.length; i++) {
		var receipt = receipts[i];
		var image_name = receipt.name.toLowerCase();
		var re;
		for (var j=0; j < wordsToReplace.length;j++) {
			re = new RegExp(wordsToReplace[j], "g");
			image_name = image_name.replace(re, "_");
		}
		receipt.image = image_name;

		if (receipt.ingredients) {
			receipt.ingredients = receipt.ingredients.replace(/-|\+/g,'</br><input type="checkbox">');
		}
	}

	return receipts;
}

// data structure: {"id": 1, "nombre":"pittige varkenhaas", "category":"carne"}
var mealsData = [];

function loadMealsList() {
    $.ajax({
        url: 'get_receipts.php',
        method: 'GET',
        dataType:'json'
    }).done(function(data){
    	mealsData = createImageName(data);
        render(mealsListTemplate, {'receipts': mealsData});
    });
}



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
		purchaseListWrapper.toggleClass('hide', type !== "lista");
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



var dropzone = $('#receipt_list'),
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

	var template = $('#ingredients_template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template,{'ingredients': ingredients});
	$('#ingredients_text').html(rendered);

}

function hideIngredients(){
	$('#ingredients_text').empty();
}

function addIngredientsToPurchaseList(event) {
	var items = $(event.target).siblings('.ingredients_list').find('input:checked').html();
	purchaseList += items;
	var template = $('#purchase_list_template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template,{'purchaseList': purchaseList});
	purchaseListWrapper.html(rendered);
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
		filtersModalHeight = $('.footer ul').innerHeight();
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

	if (selectedFilters.indexOf(filter) > -1) {
		selectedFilters.splice(selectedFilters.indexOf(filter),1)
	} else {
		selectedFilters.push(filter)
	}

	if (selectedFilters.length > 0) {
		receipts.addClass('hide').filter(function() {
			for (var i=0; i < selectedFilters.length; i++) {
				return $(this).data('category') === selectedFilters[i] 
			}
		}).removeClass('hide');
	} else {
		receipts.removeClass('hide');
	}

}

function attachEvents() {
	$('#receipt_list')
		.on('touchstart', '.receipt', onTouchStart)
		.on('touchmove', '.receipt', onTouchMove)
		.on('touchend', '.receipt', onTouchEnd)
		.on('click', '.ingredients_trigger', showIngredients)
		.on('click', '.url_set', promptUrlField)
		.on('click', '.choose_receipt', weeklyMenu.onSelect.bind(weeklyMenu));

	$('#type_selector').on('click','a', renderView);
	$('#ingredients_text')
		.on('click','.ingredients_close_button',hideIngredients)
		.on('click','.ingredients_submit_button',addIngredientsToPurchaseList);
	footer
		.on('click','button', toggleFiltersModal)
		.on('click','.meal_filter input', applyFilters)
}

function init() {


// createImageName();
	loadMealsList();
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

