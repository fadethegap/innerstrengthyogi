import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Moment from "react-moment";

export default function Classes({ data }) {
  const router = useRouter();
  const [imageURLs, setImageURLs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [webpageData, setWebpageData] = useState({});

  const loadWebPageData = async () => {
    const pathName = router.pathname;
    let { data, error } = await supabase
      .from("webpage_data")
      .select("id, title, description")
      .eq("pathname", pathName)
      .single();

    if (error) {
      console.error(error);
    } else {
      setWebpageData(data);
    }
  };

  useEffect(() => {
    loadWebPageData();
    let filteredClasses = data.filter((c) => {
      if (c.is_active && c.is_displayed) {
        return c;
      }
    });
    filteredClasses = filteredClasses.sort(
      (a, b) => a.display_order - b.display_order
    );

    setClasses(filteredClasses);
    const newArr = [];
    filteredClasses.map((c) => {
      if (c.image_name) {
        const iUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/images/${c?.image_name}`;
        newArr.push(iUrl);
      } else {
        setImageURLs([]);
      }
    });
    setImageURLs(newArr);
  }, []);

  return (
    <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {webpageData && (
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {webpageData.title}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              {webpageData.description}
            </p>
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {classes?.map(
            (c, i) =>
              c.is_displayed && (
                // <Link href="/asset/[slug]" as={`/asset/${asset?.slug}`}></Link>
                <Link
                  key={c.id}
                  href="/classes/[slug]"
                  as={`/classes/${c.slug}`}
                >
                  {/* <div>
                      <Moment format="MM/DD/YYYY">{c.created_at}</Moment>
                    </div> */}
                  <div className="flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer">
                    <div className="flex-shrink-0 relative">
                      {imageURLs[i] && (
                        <Image
                          className="h-48 w-full object-cover"
                          src={imageURLs[i]}
                          alt=""
                          width={500}
                          height={281.25}
                          // layout="fill"
                          //   objectFit="contain"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-gray-900">
                          {c.title}
                        </p>
                        <p className="text-sm mt-1">{c.date_time}</p>
                        {/* {c.active ? (
                              <p>{c.event_period}</p>
                            ) : (
                              <p>Not Scheduled</p>
                            )} */}
                        <p className="mt-3 text-base text-gray-500">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data, error } = await supabase.from("classes").select("*");

  if (error) {
    console.error(error);
  }

  return {
    props: {
      data,
    },
  };
};
