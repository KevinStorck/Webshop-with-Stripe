const express = require("express")
const router = express.Router()
const fetchAdresses = require("./controllers")

router.post("/delivery-adress", fetchAdresses)

module.exports = router