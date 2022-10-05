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

            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.0143587090356!2d-76.57502148426424!3d39.06058694491259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fa40630b1fcb%3A0xca3ca2e7f77aa6f2!2s389%20Hemlock%20Trail%2C%20Crownsville%2C%20MD%2021032!5e0!3m2!1sen!2sus!4v1664985283703!5m2!1sen!2sus"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}

            <div className="mt-12 flex justify-center h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.0143587090356!2d-76.57502148426424!3d39.06058694491259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7fa40630b1fcb%3A0xca3ca2e7f77aa6f2!2s389%20Hemlock%20Trail%2C%20Crownsville%2C%20MD%2021032!5e0!3m2!1sen!2sus!4v1664985283703!5m2!1sen!2sus"
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
              <p>389 Hemlock Trail</p>
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
