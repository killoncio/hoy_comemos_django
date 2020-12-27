Vue.component('receipt-item', {
  props: ['receipt'],
  template:`
  	<li
  		:class="{receipt: true, receipt__new: receipt.is_new}"
  		:data-category="receipt.category"
  		draggable="true"
  	>
		<div class="receipt_name">
			<a class="text-primary" href="{% url 'app:meal' meal.id %}" target='_blank'><strong>{{receipt.name}}</strong></a>
			<span v-if="receipt.ingredients" class="glyphicon glyphicon glyphicon-menu-right ingredients_trigger" aria-hidden="true"></span>
		</div>
		<div class='receipt_image img-wrapper' style="position: relative">
    		<img class='img-responsive'
    			:src="receipt.image.url"
    			alt="Uh Oh, didn't show!"
    		>
		</div>
		<div class="receipt_ingredients hide">
			{{receipt.ingredients}}
		</div>
	</li>
  	`
});

var vm = new Vue({
	delimiters: ['[[', ']]'],
 	el: '#receipt_list',
	data: {
  		'receipts': [],
	},
	mounted: function() {
		fetch('app/ajax/get_meals/')
			.then(response => response.json())
			.then(function(data) {
				vm.receipts = data;
			});
	},
});
