'use strict';

angular.module('dubidubaApp')
.directive('cart', function() {
	return {
		templateUrl: 'partials/cart.html',
		restrict: 'A',
		link: function(scope, element, attrs, $q){

		},
		controller: function postLink($scope, $element, $q, Flickr) {

			if(!sessionStorage.getItem("inSessionSC")){
				simpleCart.empty();
				sessionStorage.setItem("inSessionSC", "true");
			}

			simpleCart({
				// array representing the format and columns of the cart,
				// see the cart columns documentation
				cartColumns: [
					{ view: "image" , attr: "thumb", label: false },
					{ attr: "name", label: "Producto"},
					{ attr: "size", label: "Talla"},
					{ attr: "quantity", label: "Cantidad"},
					{ view: "currency", attr: "price", label: "Precio"},
					{ view: "currency", attr: "total", label: "SubTotal" },
					{ view: "remove", text: "", label: false}
				],

				// "div" or "table" - builds the cart as a 
				// table or collection of divs
				cartStyle: "table", 

				// how simpleCart should checkout, see the 
				// checkout reference for more info 
				checkout: { 
					type: "PayPal" , 
					//email: "testingdubidubavendor@gmail.com",
					email: "dubidubacanastillas@gmail.com",
					sandbox: false,
					success: "http://dubi-duba.com/"
				},

				// set the currency, see the currency 
				// reference for more info
				currency: "EUR",

				// collection of arbitrary data you may want to store 
				// with the cart, such as customer info
				data: {},

				// set the cart langauge 
				// (may be used for checkout)
				language: "spanish-es",

				// array of item fields that will not be 
				// sent to checkout
				excludeFromCheckout: ['indexsize', 'thumb', 'articleid', 'idsize', 'currentquantity'],

				// custom function to add shipping cost
				shippingCustom: null,

				// flat rate shipping option
				shippingFlatRate: 0,

				// added shipping based on this value 
				// multiplied by the cart quantity
				shippingQuantityRate: 0,

				// added shipping based on this value 
				// multiplied by the cart subtotal
				shippingTotalRate: 0,

				// tax rate applied to cart subtotal
				taxRate: 0,

				// true if tax should be applied to shipping
				taxShipping: true,

				// event callbacks 
				beforeAdd			: null,
				afterAdd			: null,
				load				: null,
				beforeSave		: null,
				afterSave			: null,
				update			: null,
				ready			: null,
				checkoutSuccess	: null,
				checkoutFail		: null,
				beforeCheckout		: null,
				beforeRemove           : null
			});

			simpleCart.load();
		}
	};
});

