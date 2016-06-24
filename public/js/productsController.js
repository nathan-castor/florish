angular
	.module('Florish')
	.controller('ProductsController', ProductsController)


ProductsController.$inject = ['productsFactory','potsFactory', '$modal', '$window', '$state']

function ProductsController (productsFactory, potsFactory, $modal, $window, $state){
	var vm = this;
	vm.api = productsFactory
	vm.potsapi = potsFactory
	vm.products = []
	vm.newProduct = {}
	vm.api.list()
		.success(function(res){
			vm.products = res
			//console.log('vm.products',vm.products)
		})

	// *************** stuff to set upon SHOP view ***************
	if ($window.localStorage.step == 'results') {
		vm.step = 4
		vm.filtered = JSON.parse($window.localStorage.filtered)
		console.log('vm.filtered',vm.filtered)
		console.log('$window.localStorage.basket',$window.localStorage.basket)
		vm.cart = JSON.parse($window.localStorage.basket)
		//vm.cart = $window.localStorage.basket
		vm.showBack = true
		vm.showReset = true
	}else{
		vm.step = 0
		$window.localStorage.filtered = []
		$window.localStorage.basket = []
		$window.localStorage.filterArray =[]
		vm.filtered = []
		vm.filterArray = []
		vm.cart = [];
	}
	console.log('step:',vm.step)
	console.log('vm.filtered:',vm.filtered)

	// *************** END stuff to set upon SHOP view ***************

	vm.addProduct = function(avatar_url, name, size, lightNeed, type, price, description){
		var data = {avatar_url:avatar_url, name:name, size:size, lightNeed: lightNeed, type:type, price:price, description:description}
		console.log(data)

		vm.api.addProduct(data)
			.then(function success(res){
				console.log(data)
				vm.products.push(res.data.product)
				vm.newProduct = {}

				console.log(res.data.product.avatar_url)
				alert("product created")
			})
	}

	vm.addPot = function(avatar_url, name, type, price, description){
		var data = {avatar_url:avatar_url, name:name, size:size, lightNeed: lightNeed, type:type, price:price, description:description}
		console.log(data)

		vm.potsapi.addPot(data)
			.then(function success(res){
				console.log(data)
				vm.pots.push(res.data.pot)
				vm.newPot = {}

				console.log(res.data.pot.avatar_url)
				alert("pot created")
			})
	}

	vm.findByFilters = function(array) {
		console.log('vm.filterArray',vm.filterArray)

		if (array.indexOf('hanging') == -1) {
			console.log("Potted Results")
			for (var i = 0; i < vm.products.length; i++) {
				//console.log('vm.products'+ i + '.size',vm.products[i].size)
				if (vm.products[i].size == array[0] && vm.products[i].lightNeed == array[2]) {
					//console.log('vm.products[i]',vm.products[i])
					vm.filtered.push(vm.products[i])
				}
			}
		}else{
			console.log("hanging results")
			for (var i = 0; i < vm.products.length; i++) {
				//console.log('vm.products'+ i + '.size',vm.products[i].size)
				if (vm.products[i].type == array[0] && vm.products[i].lightNeed == array[2]) {
					//console.log('vm.products[i]',vm.products[i])
					vm.filtered.push(vm.products[i])
				}
			}
		}
		console.log('vm.filtered from findByFilters',vm.filtered)
		$window.localStorage.filtered = JSON.stringify(vm.filtered)
	}

		vm.showSize = true
		vm.showWater = false
		vm.showLight = false
		vm.showWords = true
		vm.showBack = false
		vm.showReset = false

		vm.nextStep = function(back) {
			if (back) {
				vm.step--
				if (vm.step == 3) {
					//vm.filterArray.splice((vm.step), 1)
					vm.filterArray.splice((vm.step -1), 1)
					vm.filtered = []
				}else{
					vm.filterArray.splice((vm.step), 1)
					vm.filtered = []
				}
				console.log('vm.filterArray',vm.filterArray)
			}else{
				vm.step++
				console.log('vm.filterArray',vm.filterArray)
			}
			console.log("step:",vm.step)

			if(vm.step == 0){
				vm.showSize = true
				vm.showWater = false
				vm.showLight = false
				vm.showWords = true
				vm.showBack = false
				vm.showReset = false
			}else if (vm.step == 1) {
				vm.showSize = false
				vm.showWater = true
				vm.showWords = false
				vm.showLight = false
				vm.showBack = true
				vm.showReset = true
			}else if (vm.step == 2) {
				vm.showWater = false
				vm.showLight = true
				vm.showBack = true
				vm.showReset = true
			}else if (vm.step == 3) {
				vm.showLight = false
				vm.showBack = true
				vm.showReset = true
				$window.localStorage.filterArray = vm.filterArray
				vm.findByFilters(vm.filterArray)
			}else{
				$window.localStorage.step = 'results'
				console.log('$window.localStorage.filterArray',$window.localStorage.filterArray)
			}
		}
		vm.back = function() {
			console.log('hit back')
			vm.nextStep(true)
		}
		vm.reset = function() {
			console.log('reset')
			vm.step = 0
			vm.showSize = true
			vm.showWater = false
			vm.showLight = false
			vm.showWords = true
			vm.showBack = false
			vm.showReset = false
			vm.filterArray = []
			vm.filtered = []
		}

		// vm.hideAllBtns = hideAllBtns
		//
		//********************** SIZE *********************
		vm.selectSmall = function() {
			console.log('selected small')
			//vm.filterProducts('size', 'S')
			vm.filterArray.push('S')
			vm.nextStep()
		}
		vm.selectMedium = function() {
			//vm.filterProducts('size', 'M')
			vm.filterArray.push('M')
			vm.nextStep()
		}
		vm.selectLarge = function() {
			//vm.filterProducts('size', 'L')
			vm.filterArray.push('L')
			vm.nextStep()
		}
		//****************** POTTED OR HANGING ******************
		vm.selectPotted = function() {
			//vm.filterProducts('type', 'potted')
			vm.filterArray.push('potted')
			vm.nextStep()
		}
		vm.selectHanging = function() {
			//vm.filterProducts('type', 'hanging')
			vm.filterArray.push('hanging')
			vm.nextStep()
		}
		//****************** AMOUNT OF WATER ******************
		vm.selectLotsWater = function() {
			//vm.filterProducts('type', 'hanging')
			vm.filterArray.push('lotsWater')
			vm.nextStep()
		}
		vm.selectLittleWater = function() {
			//vm.filterProducts('type', 'hanging')
			vm.filterArray.push('littleWater')
			vm.nextStep()
		}
		//****************** LIGHT ******************
		vm.selectLowLight = function() {
			//vm.filterProducts('lightNeed', 'low')
			vm.filterArray.push('low')
			vm.nextStep()
		}
		vm.selectBrightLight = function() {
			//vm.filterProducts('lightNeed', 'bright')
			vm.filterArray.push('bright')
			vm.nextStep()
		}
		//vm.done = false
		vm.finalStep = function() {
			if (vm.step == 3 || vm.step == 4){return true}
			return false
			//vm.done = true
		}
		vm.whichStep = function(x) {
			if (x == vm.step) {return true}
				return false
		}
		// function selectLarge() {
		// 	vm.customerPreference.large = true
		// 	vm.swapBtns()
		// }
		// function selectLowLight() {
		// 	vm.customerPreference.lowLight = true
		// 	vm.hideAllBtns()
		// }
		// function selectBrightLight() {
		// 	vm.customerPreference.brightLight = true
		// 	vm.hideAllBtns()
		// }
		//

		//

		//
		// function hideAllBtns(){
		// 	vm.options.light = false
		// }


	vm.addToCart = function (product) {
		console.log('product added to cart!:',product)
		$window.localStorage.currentProductId = product._id
		$window.localStorage.currentProductUrl = product.avatar_url
		var found = false;
		vm.cart.forEach(function (item) {
			if (item._id === product._id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			vm.cart.push(angular.extend({quantity: 1}, product))
		}
		$window.localStorage.basket = JSON.stringify(vm.cart)
	};

	vm.product = $window.localStorage.currentProductId
	vm.productUrl = $window.localStorage.currentProductUrl

	vm.getCartPrice = function () {
		var total = 0;
		vm.cart.forEach(function (product) {
			total += product.price * product.quantity;
		});
		return total;
	};

	vm.checkout = function () {
		console.log("about to open modal")
		$modal.open({
			templateUrl: './partials/checkout.html',
			controller: 'CheckoutCtrl',
			resolve: {
				totalAmount: vm.getCartPrice
			}
		});
	};

	vm.uploadFile = function($window){
		function init_upload(){
			console.log("here")
		}
	}

	vm.sthree = function(){
	 /*
				Function to carry out the actual PUT request to S3 using the signed request from the app.
		*/
	function upload_file(file, signed_request, url){
		console.log(file)
		console.log(signed_request)
		console.log(url)
		$window.localStorage.setItem('url', url)
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", signed_request);
		xhr.setRequestHeader('x-amz-acl', 'public-read');
		xhr.onload = function() {
			if (xhr.status === 200) {
					document.getElementById("preview").src = url;
					document.getElementById("avatar_url").value = url;
					vm.newProduct.avatar_url = url
			}
		};
		xhr.onerror = function() {
				console.log("vanilla AJax call : " + JSON.stringify(xhr))
				alert("Could not upload file.");
		};
		xhr.send(file);
	}
	/*
		Function to get the temporary signed request from the app.
		If request successful, continue to upload the file using this signed
		request.
	*/
	function get_signed_request(file){
		console.log("getting signed request")
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://florish-app.herokuapp.com/sign_s3?file_name="+file.name+"&file_type="+file.type);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				var response = JSON.parse(xhr.responseText);
				upload_file(file, response.signed_request, response.url);
			}
			else{
				alert("Could not get signed URL.");
			}
		}
	};
	xhr.send();
	}
	/*
	 Function called when file input updated. If there is a file selected, then
	 start upload procedure by asking for a signed request from the app.
	*/
		function init_upload(){
			console.log("here");
			var files = document.getElementById("file_input").files;
			var file = files[0];
			if(file == null){
				alert("No file selected.");
				return;
			}
			get_signed_request(file);
			}
			/*
			 Bind listeners when the page loads.
			*/
			(function() {
						window.document.querySelector("#file_input").addEventListener('change', init_upload)
			})();
		}

}
