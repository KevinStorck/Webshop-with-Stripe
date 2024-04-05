require("dotenv").config()
const initStripe = require("./initStripe")
const stripe = initStripe()

const fetchProducts = async (req, res) => {
    const response = await stripe.products.list({expand: ["data.default_price"]})
    res.status(200).json(response)
}

const checkout = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: req.body.id,
        line_items: req.body.cart.map(i => {return {price: i.id, quantity: i.quantity}}),
        success_url: "http://localhost:5173",
        cancel_url: "http://localhost:5173/checkout"
    })
    console.log(session);

    res.status(200).json({url: session.url, sessionId: session.id})
}

module.exports = {fetchProducts, checkout}