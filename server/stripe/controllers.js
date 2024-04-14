require("dotenv").config();
const generateId = require("../utils/generateId");
const initStripe = require("./initStripe");
const fs = require("fs").promises;
const stripe = initStripe();

const fetchProducts = async (req, res) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  res.status(200).json(response);
};

const checkout = async (req, res) => {
  req.session.servicePoint = req.body.servicePoint
  let discounts = []
  if (req.body.coupon){
  const coupons = await stripe.coupons.list({limit: 99})
  const coupon = coupons.data.find(c => c.name === req.body.coupon)
  if (coupon) discounts.push({coupon: coupon.id})
  }
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: req.body.id,
    discounts,
    line_items: req.body.cart.map((i) => {
      return { price: i.id, quantity: i.quantity };
    }),
    success_url: "http://localhost:5173/payment-result",
    cancel_url: "http://localhost:5173/checkout",
  });

  res.status(200).json({ url: session.url, sessionId: session.id });
};

const verifyPayment = async (req, res) => {
    const { payment_status, customer_details, amount_total, customer} = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    if (payment_status === "paid") {
      const orders = JSON.parse(await fs.readFile("./database/orders.json"));
      await fs.writeFile(
          "./database/orders.json",
          JSON.stringify([
              ...orders,
              {
                  id: generateId(orders),
                  customerId: customer,
                  customerName: customer_details.name,
                  servicePoint: req.session.servicePoint,
                  products: (await stripe.checkout.sessions.listLineItems(req.body.sessionId, {expand: ["data.price.product"]})).data,
                  cost: amount_total,
                  date: new Date(),
                },
            ], null, 2)
        );
        return res.status(200).json({isPayed: true})
    }
  res.status(200).json("something went wrong")
  res.status(400).json("something went wrong")
};

module.exports = { fetchProducts, checkout, verifyPayment };
