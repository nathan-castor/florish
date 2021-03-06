var Product = require('../models/Product.js');

function getAllProducts(req,res){
	Product.find({}, function(err, products){
		res.json(products)
	})
}

function createProduct(req,res){
	var newProduct = new Product
	newProduct.avatar_url = req.body.avatar_url
	newProduct.name = req.body.name
	newProduct.size = req.body.size
	newProduct.type = req.body.type
	newProduct.lightNeed = req.body.lightNeed
	newProduct.description = req.body.description
	newProduct.price = req.body.price

	newProduct.save(function(err, product){
		if(err) throw err
		console.log(product)
		res.json({message: "Product Saved!", product: product})
	})
}

function getOneProduct(req,res){
	Product.findById(req.params.id, function(err,product){
		if(err) throw err
		res.json(product)
	})
}

function updateProduct(req,res){
	Product.findOneAndUpdate({_id: req.params.id}, req.body, function(err,product){
		if(err) throw err
		Product.findById(req.params.id, function(err,updatedProduct){
			res.json(updatedProduct)
		})
	})
}

function deleteProduct(req,res){
	Product.findOneAndRemove({_id: req.params.id}, req.body, function(err,product){
		if(err) throw err
		res.json({message:"product deleted"})
	})
}

function getAllPots(req,res){
	Pot.find({}, function(err, pots){
		res.json(pots)
	})
}

function createPot(req,res){
	var newPot = new Pot
	newPot.avatar_url = req.body.avatar_url
	newPot.name = req.body.name
	newPot.size = req.body.size
	newPot.type = req.body.type
	newPot.lightNeed = req.body.lightNeed
	newPot.description = req.body.description
	newPot.price = req.body.price

	newPot.save(function(err, pot){
		if(err) throw err
		console.log(pot)
		res.json({message: "Pot Saved!", pot: pot})
	})
}

module.exports = {
	getAllProducts : getAllProducts,
	createProduct : createProduct,
	getOneProduct : getOneProduct,
	updateProduct : updateProduct,
	deleteProduct : deleteProduct,
	getAllPots : getAllPots,
	createPot : createPot

}
