import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";

// import Yoga1 from "../public/yoga1.jpg";
// import Yoga2 from "../public/yoga2.jpg";
// import Yoga3 from "../public/yoga5.jpg";

// const classes = [
//   {
//     title: "Play Together, Stay Together",
//     href: "#",
//     category: { name: "Article", href: "#" },
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",
//     imageUrl: Yoga1,
//     readingTime: "6 min",
//     author: {
//       name: "Roel Aufderehar",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     title: "Health and Vitality With Friends",
//     href: "#",
//     category: { name: "Video", href: "#" },
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
//     date: "Mar 10, 2020",
//     datetime: "2020-03-10",
//     imageUrl: Yoga2,
//     readingTime: "4 min",
//     author: {
//       name: "Brenna Goyette",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     title: "Family Focused Fun",
//     href: "#",
//     category: { name: "Case Study", href: "#" },
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
//     date: "Feb 12, 2020",
//     datetime: "2020-02-12",
//     imageUrl: Yoga3,
//     readingTime: "11 min",
//     author: {
//       name: "Daniela Metz",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
// ];

export default function Classes({ classes }) {
  const [imageURL, setImageURL] = useState(null);

  // if (data?.image_filename) {
  //   const iUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/images/${data?.image_filename}`;
  //   setImageURL(iUrl);
  // } else {
  //   setImageFilename("");
  //   setImageURL("");
  // }

  console.log("Classes:", classes);
  return (
    <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Inner Strength Classes
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {classes.map((c, i) => (
            <Link key={c.id} href={`/${c.id}`}>
              <>
                {/* <div>
                  <Moment format="MM/DD/YYYY">{c.created_at}</Moment>
                </div> */}
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                  {/* <div className="flex-shrink-0 relative">
                    <Image
                      className="h-48 w-full object-cover"
                      src={c.imageUrl}
                      alt=""
                      // layout="fill"
                      //   objectFit="contain"
                    />
                  </div> */}
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <a href={c.href} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {c.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {c.description}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data: classes } = await supabase.from("classes").select("*");

  return {
    props: {
      classes,
    },
  };
};
