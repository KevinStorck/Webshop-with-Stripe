const exppress = require("express")
const { fetchProducts } = require("./controllers")
const router = exppress.Router()

router.get("/products", fetchProducts)

module.exports = router