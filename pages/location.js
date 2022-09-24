import React, { useEffect, useRef } from "react";
import { useUser } from "../context/user";

export default function Location() {
  const { isLoading } = useUser();
  return (
    <>
      {!isLoading && (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl pt-5 px-4  sm:px-6 lg:px-8 grid justify-center">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              How to Find Us
            </h2>
            <div className="mt-12 flex justify-center h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4551.541353236336!2d-76.5741133577061!3d39.060037310465425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fa406f812743%3A0x3eed4d15d78e6e2d!2s390%20Locust%20Trail%2C%20Crownsville%2C%20MD%2021032!5e0!3m2!1sen!2sus!4v1664028075847!5m2!1sen!2sus"
                // width="600"
                // height="450"
                width="100%"
                // className="md:w-600px h-450px"
                //   style={border: "0"}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-5">
              <p className="underline">Address</p>
              <p>390 Locust Trail</p>
              <p>Crownsville, MD 21032</p>
            </div>
            <div className="mt-5">
              <p className="underline">Parking</p>
              <p>
                There is parking right in front of the yoga studio. If that is
                full, you may park on the street. Just be mindful of the parking
                signs.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
