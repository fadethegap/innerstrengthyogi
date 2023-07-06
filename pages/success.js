import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import initStripe from "stripe";
import Image from "next/image";

export default function Success() {
  const router = useRouter();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const [productName, setProductName] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const { user_id, product_id } = router.query;
    const { product_name } = router.query;
    const { image } = router.query;
    if (product_name) {
      setProductName(product_name);
    }
    if (image) {
      setImage(image);
    }
    if (product_id) {
      const insertProduct = async () => {
        const { data, error } = await supabase.from("customer_classes").insert([
          {
            user_id: user_id,
            product_id: product_id,
            product_name: product_name,
            image_url: image,
          },
        ]);
        if (error) {
          console.log(error);
        }
        // Remove the query parameters from the URL
        router.replace(`${router.pathname}?product_name=${product_name}`);
      };
      insertProduct();
    }

    // Include router.query in the dependencies array so the effect is re-run whenever the query parameters change
  }, [router.query]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid justify-center mt-10">
        <div className="relative h-56 w-full rounded">
          <Image
            src={image}
            alt={`${image} Image`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center py-5 max-w-[400px]">
          Thank you for purchasing{" "}
          <span className="text-lg font-bold">{productName}</span>.
        </div>
        <div className="text-center">I can't wait to see you there!</div>
      </div>
    </div>
  );
}
