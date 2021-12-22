Vue.component('receipt-item', {
	delimiters: ['[[', ']]'],
	props: ['receipt'],
	template:`
		<li
			:class="{receipt: true, receipt__new: receipt.is_new, hide: !receipt.is_preferred}"
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
	emits:['get-new-meal'],
	template:`
		<li class="menu__meal">
			<a v-if="meal.name" :href="'app/meal/' + [[meal.id]]" target='_blank'>
				[[meal.name]]
			</a>
			<span v-else>[[meal.name || meal]]</span>
			<button @click="$emit('get-new-meal', meal.category)">New</button>
		</li>
	`
});


var vm = new Vue({
	delimiters: ['[[', ']]'],
 	el: '#app',
	data: {
  		'receipts': [],
  		'menu':[],
  		'receiptsByCategory': {},
	},
	mounted: function() {
		fetch('app/ajax/get_meals/')
			.then(response => response.json())
			.then(function(data) {
				vm.receipts = vm.sortReceipts(data);
				vm.loadMenu();
			});
	},
	methods: {
		sortReceipts: (data) => {
			const receiptsByCategory = vm.receiptsByCategory;

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
		loadMenu() {
			// creating weekly menu from the 'preferred' meals
			// todo:
			// - add it to a different page
			// - be able to refresh per day
			// - add button to save
			// - keep menu for a week, do not create new one on each reload (maybe store it locally, just redo if button clicked)
			// - maybe show the rest of unchosen meals, so it's possible to choose manually?
			// -

			if (window.localStorage.getItem('menu')) {
				vm.menu = JSON.parse(window.localStorage.getItem('menu'));
			} else {
				this.createMenu();
			}
		},
		createMenu() {
			vm.menu = [
				'sopa',
				vm.getRandomElement('guiso'),
				vm.getRandomElement('pasta'),
				vm.getRandomElement('carne'),
				'pizza',
				vm.getRandomElement('pescado'),
				vm.getRandomElement('pasta'),
			];
		},
		getRandomElement(category) {
			function getRandomIndex(max) {
				return Math.floor(Math.random() * max);
			}

			const preferred = vm.receiptsByCategory[category].filter(receipt => receipt.is_preferred);


			// local db does not have preferred ones, so adding this to avoid error
			if (!preferred.length) {
				return `no hay un plato preferido en la categoria ${category}`;
			}

			return preferred[getRandomIndex(preferred.length)];
		},
		getNewMeal(category, index) {
			// in order to keep reactivity, you can't just substitute element of array
			// one of the ways to solve that is replace the whole array https://vuejs.org/v2/guide/list.html#Replacing-an-Array
			const newMeal = vm.getRandomElement(category);
			const newMenu = vm.menu.slice();
			newMenu[index] = newMeal;

			vm.menu = newMenu;
		},
		saveMenu() {
			window.localStorage.setItem('menu', JSON.stringify(vm.menu));
		},
	},
});
