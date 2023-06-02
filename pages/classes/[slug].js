import React, { useState, useEffect, useRef } from "react";
import initStripe from "stripe";
import { useUser } from "../../context/user";
import { supabase } from "../../utils/supabase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useClasses } from "../../context/classes";
import { isAbsoluteUrl } from "next/dist/shared/lib/utils";
import axios from "axios";

export default function ClassDetail({ product }) {
  const { classes } = useClasses();
  const user = useUser();
  const router = useRouter();
  const productID = router.query.slug;
  const { isLoading } = useUser();
  const [imageURL, setImageURL] = useState(null);
  const cls = "";
  const products = "";
  console.log({ user });

  useEffect(() => {}, []);

  const handleSelectedProduct = (prodID) => {
    // if (!user.is_authenticated) {
    //   console.log("Not a user");
    //   router.push("/signup");
    // } else {
    //   console.log("User");
    // }
    // console.log("Product ID", prodID);
    // document.cookie = `productID=${prodID}`;
    if (user?.isAuthenticated) {
      console.log("Authenticated");
    } else {
      router.push("/signup");
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="relative overflow-hidden bg-white">
          {/* <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {product?.name}
              </span>
            </h1>
          </div> */}
          <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
            <div
              className="relative mx-auto h-full max-w-prose text-lg"
              aria-hidden="true"
            >
              <svg
                className="absolute top-12 left-full translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute bottom-12 left-full translate-x-32 transform"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
              <div className="flex flex-wrap justify-around mb-5">
                <div
                  key={product?.id}
                  className="p-5 min-w-[300px] h-auto rounded-lg grid justify-center border-2 border-gray-300 m-2"
                >
                  <Image
                    className="w-full rounded-lg"
                    src={product.images[0]}
                    alt=""
                    width={1310}
                    height={873}
                  />
                  <div className="text-center text-xl text-gray-700 mt-5">
                    {product?.name}
                  </div>{" "}
                  <div className="text-center">${product.price / 100}</div>
                  <p className="text-left">{product?.description}</p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="flex w-[290px] h-fit disabled:bg-fossilDisabled justify-center rounded-md border border-transparent bg-fossilOcean py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fossilOceanHover focus:outline-none focus:ring-2 focus:ring-fossilOceanHover focus:ring-offset-2"
                      onClick={() => handleSelectedProduct(product?.id)}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const allStripeData = await stripe.products.list({
    limit: 100,
  });
  const stripeClasses = allStripeData.data;

  const paths = stripeClasses.map((c) => {
    return {
      params: { slug: c.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const product = await stripe.products.retrieve(slug);
  const price = await stripe.prices.retrieve(product.default_price);
  product.price = price.unit_amount;

  return {
    props: { product },
  };
};
