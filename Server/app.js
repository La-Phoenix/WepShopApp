const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const stripe = require("stripe")(
  "sk_test_51M99ksLEW99x4RKTUmamruejImCRc6JJe7cetIAe7uuF5FGqNdOv7DDivW0xXecSC6OZNLkJ8x4IrHs4LK5qHHdh00us9kppXl"
);

app.post("/checkout", async (req, res, next) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: items.map((_item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: _item.name,
            images: [_item.product],
          },
          unit_amount: _item.price * 100,
        },
        quantity: _item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen("4242", () => {
  console.log("App is running on 4242");
});
