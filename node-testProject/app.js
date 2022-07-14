
const express = require("express");  //import express
const app = express();  //initialize express
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const usertRoutes = require("./api/users/user.controller");
const departmentRoutes = require("./api/department/department.controller");
const categoryRoutes = require("./api/category/category.controller");
const donorRoutes = require("./api/donors/donors.controller");
const itemsRoutes = require ("./api/items/items.controller");
const donationRoutes = require ("./api/donations/donations.controller");
const stockRoutes = require ("./api/stock/stock.controller");
const requestRoutes = require("./api/request/request.controller");
const issuanceRoutes = require("./api/issuance/issuance.controller");
const bookingRoutes = require("./api/booking/bookings.controller");


app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); //get the request from the form
app.use(express.json()); //convert json obj to js objects
app.use(cors());

app.use(errorHandler);

//routes which should handle request
app.use("/system-user",jwt(), usertRoutes);
app.use("/department", departmentRoutes);
app.use("/category",jwt(), categoryRoutes);
app.use("/donors",jwt(), donorRoutes );
app.use("/items",jwt(), itemsRoutes );
app.use("/donations",jwt(), donationRoutes);
app.use("/stock",jwt(), stockRoutes);
app.use("/requests",jwt(),requestRoutes);
app.use("/issuance",jwt(), issuanceRoutes);
app.use("/bookings", bookingRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status  = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;