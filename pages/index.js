import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useUser } from "../context/user";
import ClassesList from "../components/ClassesList";
import initStripe from "stripe";

export default function Index({ stripeClasses }) {
  const router = useRouter();
  const { isLoading } = useUser();
  const [imageURLs, setImageURLs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [webpageData, setWebpageData] = useState({});

  return (
    <>
      <ClassesList stripeClasses={stripeClasses} />
    </>
  );
}

export const getStaticProps = async () => {
  const { data: supabaseClasses, error: supabaseError } = await supabase
    .from("classes")
    .select("*");

  if (supabaseError) {
    console.error(supabaseError);
  } else {
    // console.log("SUPABASE CLASSES", supabaseClasses);
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const allStripeData = await stripe.products.list({
    limit: 100,
  });
  const stripeClasses = allStripeData.data;

  return {
    props: {
      stripeClasses,
    },
  };
};
