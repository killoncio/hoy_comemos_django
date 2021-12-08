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
				alt="Uh Oh, didn't show!"
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

var vm = new Vue({
	delimiters: ['[[', ']]'],
 	el: '#meals-list',
	data: {
  		'receipts': [],
	},
	mounted: function() {
		fetch('app/ajax/get_meals/')
			.then(response => response.json())
			.then(function(data) {
				vm.receipts = vm.sortReceipts(data);
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
	},
});
