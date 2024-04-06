const exppress = require("express")
const { fetchProducts, checkout, verifyPayment } = require("./controllers")
const router = exppress.Router()

router.get("/products", fetchProducts)
router.post("/checkout", checkout)
router.post("/verify-payment", verifyPayment)

module.exports = router