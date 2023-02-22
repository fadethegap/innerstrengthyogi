import initStripe from "stripe";
import { getServiceSupabase } from "../../utils/supabase";

const handler = async (req, res) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  console.log("STRIPE CUSTOMER", customer);
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("profile")
    .update({
      stripe_customer_id: customer.id,
    })
    .eq("id", req.body.record.id);

  console.log("DATA", data);

  // await supabase.rpc("insert_into_profile_history", {
  //   user_id: profile.id,
  // });

  res.send({ message: `stripe customer created: ${customer.id}` });
};

export default handler;
