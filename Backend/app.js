const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const { request, application } = require('express');
const session = require('express-session');
const accountsRouter = require('./app/routes/account.route');
const brandsRouter = require('./app/routes/brand.route');
const productsRouter = require('./app/routes/product.route');
const ApiError = require('./app/api-error');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const oneDay = 1000 * 60 * 60 * 24;
app.use(cors());
app.use(express.json());
app.use(session({
    secret: "nguyenb2014678@student.ctu.edu.vn",
    saveUninitialized: true,
    cookie: {maxAge : oneDay},
    resave: false
}))


app.get("/", (req, res) => {
    res.json({ message: "Welcome to project book application." });
});

app.use("/api/products",productsRouter);
app.use("/api/accounts/", accountsRouter);
app.use("/api/brands/", brandsRouter);

app.use((req, res, next) => {

    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;