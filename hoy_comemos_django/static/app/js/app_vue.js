Vue.component('receipt-item', {
	delimiters: ['[[', ']]'],
	props: ['receipt'],
	template:`
		<li
			:class="{receipt: true, receipt__new: receipt.is_new}"
			:data-category="receipt.category"
			:data-preferred="[[ receipt.is_preferred ? 'preferred' : '']]"
			draggable="true"
		>
		<div class='receipt_image img-wrapper' style="position: relative">
			<img class='img-responsive'
				:src="[[receipt.image]]"
				:alt="[[receipt.name]]"
				onerror="this.src='/media/images/placeholder.jpg';"
			>
		</div>
		<div class="receipt_name">
			<a class="text-primary" :href="'app/meal/' + [[receipt.id]]" target='_blank'>
				[[receipt.name]]
			</a>
			<span v-if="receipt.ingredients" class="glyphicon glyphicon glyphicon-menu-right ingredients_trigger" aria-hidden="true"></span>
		</div>
		<div class="receipt_ingredients hide">
			[[receipt.ingredients]]
		</div>
	</li>
		`
});

Vue.component('menu-item', {
	delimiters: ['[[', ']]'],
	props: ['meal'],
	template:`
		<li>
			[[meal]]
		</li>
	`
});


var vm = new Vue({
	delimiters: ['[[', ']]'],
 	el: '#app',
	data: {
  		'receipts': [],
  		'menu':[],
	},
	mounted: function() {
		fetch('app/ajax/get_meals/')
			.then(response => response.json())
			.then(function(data) {
				vm.receipts = vm.sortReceipts(data);
				vm.menu = vm.createMenu(data);
			});
	},
	methods: {
		sortReceipts: (data) => {
			const receiptsByCategory = {};

			Object.values(data).map(receipt => {
				if (!receiptsByCategory[receipt.category]) {
					receiptsByCategory[receipt.category] = [];
				}
				receiptsByCategory[receipt.category].push(receipt);
			});

			const categoryOrder = [
				'carne',
				'guiso',
				'pasta',
				'especial',
				'pescado',
				'verduras',
				'postre',
			];

			return categoryOrder.reduce((prev, curr) => prev.concat(receiptsByCategory[curr]), []);
		},
		createMenu: (data) => {
			// creating weekly menu from the 'preferred' meals
			// todo:
			// - add it to a different page
			// - be able to refresh per day
			// - keep menu for a week, do not create new one on each reload (maybe store it locally, just redo if button clicked)
			// - maybe show the rest of unchosen meals, so it's possible to choose manually?
			//
			const receiptsByCategory = {};

			Object.values(data).map(receipt => {
				if (!receipt.is_preferred) {
					return false;
				}
				if (!receiptsByCategory[receipt.category]) {
					receiptsByCategory[receipt.category] = [];
				}
				receiptsByCategory[receipt.category].push(receipt);
			});

			function getRandomIndex(max) {
				return Math.floor(Math.random() * max);
			}

			function getRandomElement(category) {
				// local db does not have preferred ones, so adding this to avoid error
				if (!receiptsByCategory[category]) {
					return `no hay un plato preferido en la categoria ${category}`;
				}

				return receiptsByCategory[category][getRandomIndex(receiptsByCategory[category].length)].name;
			}

			const menu = [
				'sopa',
				getRandomElement('guiso'),
				getRandomElement('pasta'),
				getRandomElement('carne'),
				'pizza',
				getRandomElement('pescado'),
				getRandomElement('pasta'),
			];

			return menu;
		},
	},
});
