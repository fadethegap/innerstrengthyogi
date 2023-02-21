import React, { useState, useEffect } from "react";
import { supabase, getServiceSupabase } from "../utils/supabase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useUser } from "../context/user";
import redFlower from "../public/redFlower.jpg";
import { useClasses } from "../context/classes";

export default function ClassesList({ stripeClasses }) {
  const { classes, setClasses } = useClasses();
  // const [classes, setClasses] = useState();
  const [imageName, setImageName] = useState();
  const [imageURL, setImageURL] = useState();

  // const getClasses = async () => {
  //   let { data: classes, error } = await supabase.from("classes").select("*");
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     return classes;
  //   }
  // };
  console.log(stripeClasses);
  useEffect(async () => {
    // const data = await getClasses();
    // const assets = data.map((asset) => {
    //   asset.imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/images/${asset.imageName}`;
    //   return asset;
    // });
    setClasses(stripeClasses);
  }, []);

  return (
    <>
      {classes && (
        <div className="bg-white">
          {/* <video
            muted
            autoPlay
            loop
            src="blackWater.mp4"
            type="video/mp4"
            className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          >
            <track
              src="captions_en.vtt"
              kind="captions"
              srcLang="en"
              label="english_captions"
            ></track>
          </video> */}
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Choose Your Experience
              </h2>

              {/* <a
            href="#"
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a> */}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-0 lg:gap-x-8">
              {classes.map((cls) => (
                <Link
                  href="/classes/[slug]"
                  as={`/classes/${cls.id}`}
                  key={cls.id}
                >
                  <div className="group relative mb-5 cursor-pointer">
                    <div className="relative h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                      <Image
                        src={cls.images[0]}
                        alt={`${cls.name} Image`}
                        className="h-full w-full object-cover object-center cursor-pointer"
                        // height={1920}
                        // width={1080}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-700">
                      <a href={cls.href}>
                        <span className="absolute inset-0" />
                        {cls.name}
                      </a>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">
                      {cls.description}
                    </p> */}
                    {/* <p className="mt-1 text-sm font-medium text-gray-900">
                    ${cls.price}
                  </p> */}
                  </div>
                </Link>
              ))}
            </div>

            {/* <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {classes.map((cls) => (
                <div key={cls.id} className="group relative">
                  <div className="relative h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                    <Link href="/classes/[slug]" as={`/classes/${cls.slug}`}>
                      <Image
                        src={cls.imageUrl}
                        alt={cls.imageAlt}
                        className="h-full w-full object-cover object-center cursor-pointer"
                        // height={1920}
                        // width={1080}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Link>
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    <a href={cls.href}>
                      <span className="absolute inset-0" />
                      {cls.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {cls.description}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    ${cls.price}
                  </p>
                </div>
              ))}
            </div> */}

            <div className="mt-8 text-sm md:hidden">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
