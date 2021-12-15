'use strict';

const e = React.createElement;

// function Meal(props) {
// 	const receipt = props.receipt;

// 	return (
// 		<li
// 				key={receipt.id}
// 				data-category={receipt.category}
// 				data-preferred={receipt.is_preferred ? 'preferred' : ''}
// 				draggable="true"
// 			>
// 			<div class='receipt_image img-wrapper' style="position: relative">
// 				<img
// 					src={receipt.image}
// 					alt={receipt.name}
// 					onerror="this.src='/media/images/placeholder.jpg';"
// 				>
// 			</div>
// 			<div class="receipt_name">
// 				<a class="text-primary" href="'app/meal/' + {receipt.id}" target='_blank'>
// 					{receipt.name}
// 				</a>
// 				{
// 					receipt.ingredients && <span v-if="receipt.ingredients" class="glyphicon glyphicon glyphicon-menu-right ingredients_trigger" aria-hidden="true"></span>
// 				}
// 			</div>
// 			<div class="receipt_ingredients hide">
// 				{receipt.ingredients}
// 			</div>
// 		</li>
// 	);
// }

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	  		// receipts: [
	  		// 	{
	  		// 		image: '/media/images/pittige_varkenhaas.jpg',
	  		// 		name: 'pittige varkenhaas',
	  		// 		is_preferred: true,
	  		// 		id: 1,
	  		// 		ingredients: 'none',
	  		// 		is_new: true,
	  		// 	}
	  		// ],
		}
	}

	render() {
		// const mealsList = (
		// 	<ul id="meals-list">
		// 		{this.state.receipts.map(meal =>
		// 			<Meal receipt={meal} />

		// 		)}
		// 	</ul>
		// );

		return (
			<h1>Hello</h1>
			// {mealsList}
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
