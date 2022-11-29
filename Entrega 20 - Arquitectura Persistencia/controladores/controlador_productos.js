const { response } = require("express");

const getProduct = (req, res = response) => {
	res.json({
		msg: "get carrito"
	});
};

const postProduct = (req, res = response) => {
	res.json({
		msg: "post Product"
	});
};

const deleteProduct = (req, res = response) => {
	res.json({
		msg: "delete Product"
	});
};

const putProduct = (req, res = response) => {
	res.json({
		msg: "update Product"
	});
};

module.exports = {
	getProduct,
	postProduct,
	deleteProduct,
	putProduct
};