import React, { useState, useEffect, useRef } from "react";
import initStripe from "stripe";
import { useUser } from "../../context/user";
import { supabase } from "../../utils/supabase";
import Image from "next/image";
import { getCookie } from "../../utils/cookies";

export default function ClassDetail({ cls, products }) {
  const { isLoading } = useUser();
  const [imageURL, setImageURL] = useState(null);
  // const productID = useRef("productID");
  // console.log("Class", cls);
  // console.log("All Products", products);

  useEffect(() => {
    if (cls.image_name) {
      const iUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/images/${cls?.image_name}`;
      setImageURL(iUrl);
      // console.log("Image URL", iUrl);
    } else {
      setImageURL(null);
    }
  }, []);

  const handleSelectedProduct = (prodID) => {
    console.log("Product ID", prodID);
    document.cookie = `productID=${prodID}`;
  };

  return (
    <>
      {!isLoading && (
        <div className="relative overflow-hidden bg-white py-16">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {cls.title}
              </span>
            </h1>
          </div>
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
              <figure>
                <Image
                  className="w-full rounded-lg"
                  src={imageURL}
                  alt=""
                  width={1310}
                  height={873}
                />
              </figure>

              {products.length ? (
                <div className="flex flex-wrap justify-around mb-5">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 min-w-[300px] h-auto rounded-lg grid justify-center border-2 border-gray-300 m-2"
                    >
                      <div className="text-center text-xl text-gray-700">
                        {p.name}
                      </div>
                      <div className="text-center">${p.price}</div>
                      <p className="text-center max-w-[290px]">
                        {p.description}
                      </p>
                      <button
                        type="button"
                        className="flex w-[290px] h-fit disabled:bg-fossilDisabled justify-center rounded-md border border-transparent bg-fossilOcean py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fossilOceanHover focus:outline-none focus:ring-2 focus:ring-fossilOceanHover focus:ring-offset-2"
                        onClick={() => handleSelectedProduct(p.id)}
                      >
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-fossilOcean p-3 w-full text-center text-white rounded-lg mb-5">
                  Coming Soon
                </div>
              )}
              <div>{cls.markup}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const { data: classes } = await supabase.from("classes").select("slug");

  const paths = classes.map(({ slug }) => ({
    params: {
      slug: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data: cls } = await supabase
    .from("classes")
    .select("*")
    .eq("slug", slug)
    .single();

  let omProducts = [];
  const { data: productIDs, error: productError } = await supabase
    .from("class_product_joiner")
    .select("stripe_product_id")
    .eq("class_id", cls.id);
  if (productError) {
    console.error(productError);
  } else {
    omProducts = productIDs;
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { data: allPrices } = await stripe.prices.list();

  let prices = [];
  if (omProducts) {
    allPrices.map((ap) => {
      omProducts.map((op) => {
        if (ap.product === op.stripe_product_id) {
          prices.push(ap);
        }
      });
    });
  }

  let products = [];
  if (prices) {
    const allProducts = await stripe.products.list({
      limit: 100,
    });
    prices.map((price) => {
      allProducts.data.map((prod) => {
        if (price.product === prod.id) {
          products.push({
            id: prod.id,
            name: prod.name,
            price: price.unit_amount / 100,
            description: prod.description,
          });
        }
      });
    });
  }

  return {
    props: {
      cls,
      products,
    },
  };
};
