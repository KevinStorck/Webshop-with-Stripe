const fs = require("fs").promises

const fetchOrders = async (req, res) => {
    const customerId = req.params.id
    const orders = JSON.parse(await fs.readFile("./database/orders.json"))
    let userOrders = [];
    orders.forEach(o => {
        if (o.customerId === customerId) userOrders.push(o)
    })
    if (userOrders.lenght <= 0 ) return res.status(400).json("No orders found")
    res.status(200).json(userOrders)
}

module.exports = fetchOrders