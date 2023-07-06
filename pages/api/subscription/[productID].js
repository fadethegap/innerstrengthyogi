import { supabase } from "../../../utils/supabase";
import cookie from "cookie";
import initStripe from "stripe";

const handler = async (req, res) => {
  //   const supabase = getServiceSupabase();
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const token = cookie.parse(req.headers.cookie)["sb-access-token"];

  supabase.auth.session = () => ({
    access_token: token,
  });

  const {
    data: { stripe_customer_id },
  } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { productID } = req.query;

  const product = await stripe.products.retrieve(productID);
  const priceID = product.default_price;
  const productName = product.name;
  const image = product.images[0];

  const lineItems = [
    {
      price: priceID,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_id,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/success?user_id=${user.id}&product_id=${productID}&product_name=${productName}&image=${image}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  console.log("lineItems", lineItems);

  res.send({ id: session.id });
};

export default handler;
