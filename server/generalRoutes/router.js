const express = require("express")
const router = express.Router()
const fetchOrders = require("./controllers")

router.get("/orders/:id", fetchOrders)

module.exports = router