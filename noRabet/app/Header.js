/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 rtl:space-x-reverse focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-full  from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden">
                <img
                  src="/undraw_profile.svg"
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800 ps-3 ">
                  المديرة لين
                </p>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="flex items-center py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm m-auto">معلومات الشخصية</span>
                  </a>
                </div>

                <div className="border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full  py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <span className="text-sm font-medium m-auto">
                      تسجيل الخروج
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-10"></div>
        </div>
      </nav>
    </>
  );
};

export default Header;
