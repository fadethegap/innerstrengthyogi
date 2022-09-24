import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/user";
import Logo from "../public/tree_of_life.png";

const navigation = [
  { name: "Classes", href: "/classes" },
  { name: "Workshops", href: "#" },
  { name: "Retreats", href: "#" },
  { name: "Location", href: "/location" },
  // { name: "Marketplace", href: "#" },
  // { name: "Company", href: "#" },
];

export default function NavBar() {
  const { user, isLoading } = useUser();

  return (
    <>
      {!isLoading && (
        <Popover as="header" className="relative">
          <div className="py-3 bg-white">
            <nav
              className="relative mx-auto flex max-w-7xl items-center px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <Image src={Logo} width={50} height={50} />
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-500 p-2 text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:ml-10 md:flex">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      // className="text-base font-medium text-gray-400 hover:text-gray-300"
                    >
                      <span className="text-base font-medium text-gray-700 hover:text-gray-400">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                {!user ? (
                  <>
                    <Link href="/signup">
                      <button
                        type="button"
                        className="ml-4 items-center rounded-full border border-transparent bg-logoTreeDarkGreen px-4 py-2 text-sm tracking-wider text-white shadow-sm hover:bg-fossilOcean focus:outline-none"
                      >
                        <span className="text-base font-medium text-gray-700 ">
                          Join Us
                        </span>
                      </button>
                    </Link>
                    <Link href="/signin">
                      <button
                        type="button"
                        className="ml-4 items-center rounded-full border border-transparent bg-logoTreeDarkGreen px-4 py-2 text-sm tracking-wider text-white shadow-sm hover:bg-fossilOcean focus:outline-none"
                      >
                        <span className="text-base font-medium text-gray-700 ">
                          Log in
                        </span>
                      </button>
                    </Link>
                  </>
                ) : (
                  <Link href="/logout">
                    <button
                      type="button"
                      className="ml-4 items-center rounded-full border border-transparent bg-logoTreeDarkGreen px-4 py-2 text-sm tracking-wider text-white shadow-sm hover:bg-fossilOcean focus:outline-none"
                    >
                      <span className="text-base font-medium text-gray-700 ">
                        Log out
                      </span>
                    </button>
                  </Link>
                )}
                {/* <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  Start free trial
                </a> */}
              </div>
            </nav>
          </div>

          {/* MOBILE MENU */}
          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-50 origin-top transform p-2 transition md:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-gray-700 ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <Link href="/">
                      <Image src={Logo} width={50} height={50} />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      {!user ? (
                        <>
                          <Link
                            href="/signup"
                            className="text-gray-900 hover:underline"
                          >
                            <span className="text-base font-medium text-gray-700 ">
                              Join Us
                            </span>
                          </Link>
                          <Link
                            href="signin"
                            className="text-gray-900 hover:underline"
                          >
                            <span className="text-base font-medium text-gray-700 ml-5 ">
                              Log In
                            </span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          href="/logout"
                          className="text-gray-900 hover:underline"
                        >
                          <span className="text-base font-medium text-gray-700 ml-5 ">
                            Logout
                          </span>
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      )}
    </>
  );
}
