const Book = require("../models/book");
const User = require("../models/user");
const catchAsyncError = require("../utils/cathcAsyncError");
const pagination = require("../utils/pagination");

exports.getBooks = catchAsyncError(async (req, res, next) => {
	const query = Book.find();
	const paginationData = await pagination(req, query);

	const books = await Book.find()
		.select("-seller -author -summary -date -tags")
		.limit(paginationData.limit)
		.skip(paginationData.skip);

	res.status(200).render("home", {
		books,
		current: "",
		loggedIn: Boolean(req.user),
		...paginationData,
	});
});
exports.getBook = catchAsyncError(async (req, res, next) => {
	const book = await Book.findById(req.params.bookId);
	res
		.status(200)
		.render("book", { book, current: "book", loggedIn: Boolean(req.user) });
});

exports.getUserBook = async (req, res, next) => {
	const user = await User.findById(req.params.sellerId)
		.select("selling name")

		.populate("selling", "-tag -__v");

	res.status(200).render("userBooks", {
		loggedIn: req.user,
		books: user.selling,
		name: user.name,
	});
};
exports.getCategoryBooks = async (req, res, next) => {
	const query = Book.find({ tag: req.params.tag });
	const paginationData = await pagination(req, query);

	const books = await Book.find({ tag: req.params.tag })
		.limit(paginationData.limit)
		.skip(paginationData.skip);
	res.status(200).render("home", {
		loggedIn: req.user,
		books,
		category: req.params.tag,
		...paginationData,
	});
};
