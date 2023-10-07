const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// body-parser middleware to parse incoming request bodies. This allows to access req.body in the route handlers.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
const port = process.env.PORT;
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello S-MART!");
});

// Create a specific route for payment
// When the front-end sends a POST request to "/pay", this route is invoked. It receives the payment token and the total amount from the front-end in req.body.
app.post("/pay", async (req, res) => {
  console.log(req.body.token);
  await Stripe.charges.create({
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
