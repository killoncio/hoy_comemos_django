Vue.component('receipt-item', {
  props: ['receipt'],
  template:`
  	<li :class="{receipt: true, receipt__new: receipt.is_new}" :data-category="receipt.category" draggable="true">
		<div class="receipt_name">
			{{ receipt.name }}
			<span v-if="receipt.ingredients" class="ingredients_trigger">-i-</span>
			<span v-if="receipt.link"><a :href="receipt.link" target='_blank'>+</a></span>
			<span v-if="receipt.is_new" class="label label-success">New!</span>
		</div>
		<div class='receipt_image img-wrapper'>
			<img class='img-responsive' :src="receipt.image"
				onerror="this.onerror=null;this.src='assets/img/placeholder.jpg';">
		</div>
		<div v-if="receipt.ingredients" class="receipt_ingredients hide">
			{{ receipt.ingredients }}
		</div>
	</li>
  	`
});

function fetchData() {
    $.ajax({
        url: 'get_receipts.php',
        method: 'GET',
        dataType:'json'
    }).done(function(data){
    	var receipts = createImageName(data);
        loadReceipts({'receipts': receipts});
    });
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
		receipt.image = "assets/img/" + image_name + ".jpg";

		if (receipt.ingredients) {
			receipt.ingredients = receipt.ingredients.replace(/-|\+/g,'</br><input type="checkbox">');
		}
	}

	return receipts;
}

new Vue({
 	el: '#receipt-list',
	data: {
  		'receipts': []
	},
	created: function() {
		var vm = this;
		fetch('get_receipts.php')
			.then(function (response) {
				return response.json()
		})
		.then(function (data) {
			var receipts = createImageName(data);
			vm.receipts = receipts
		})
	}
});
