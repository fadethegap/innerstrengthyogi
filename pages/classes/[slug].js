import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Image from "next/image";

export default function ClassDetail({ cls }) {
  const [imageURL, setImageURL] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("Class", cls);

  useEffect(() => {
    if (cls.image_name) {
      const iUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/images/${cls?.image_name}`;
      setImageURL(iUrl);
      console.log("Image URL", iUrl);
    } else {
      setImageURL(null);
    }
    setIsLoaded(true);
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="relative overflow-hidden bg-white py-16">
          {/* <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {cls.title}
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
              <figure>
                <Image
                  className="w-full rounded-lg"
                  src={imageURL}
                  alt=""
                  width={1310}
                  height={873}
                />
              </figure>
              <h2>{cls.title}</h2>
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

  return {
    props: {
      cls,
    },
  };
};
