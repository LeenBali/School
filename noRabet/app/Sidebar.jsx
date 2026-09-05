/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menu) => {
    if (!isCollapsed) {
      setOpenMenu(openMenu === menu ? null : menu);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setOpenMenu(null);
    }
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 h-screen sidebar sidebar-dark accordion transition-all duration-300 z-50 ${
          isCollapsed ? "w-48" : "w-64"
        }`}
        style={{
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          backgroundColor: "#4e73df",
        }}
      >
        <ul className="h-full p-5" dir="rtl">
          <a
            className={`sidebar-brand d-flex align-items-center justify-content-center mb-4 transition-all duration-300 ${
              isCollapsed ? "scale-90" : ""
            }`}
            href="/Dashboard"
          >
            <div className="sidebar-brand-icon">
              <img
                src="/logo-removebg-preview (1).png"
                className={`m-auto transition-all duration-300 ${
                  isCollapsed ? "w-20" : "w-28"
                }`}
                alt="logo"
              />
            </div>
          </a>

          <hr className="sidebar-divider my-3 text-white opacity-50" />

          {/* لوحة التحكم */}
          <a
            className="nav-item active text-right block py-2 px-3 transition-colors mb-2 text-white"
            href="/Dashboard"
            style={{ textDecoration: "none" }}
          >
            <h6 className="sidebar-text">لوحة التحكم</h6>
          </a>

          {/* ادارة الطلاب */}
          <li className="nav-item mb-2 relative" style={{ listStyle: "none" }}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => toggleMenu("students")}
              style={{ cursor: "pointer" }}
            >
              <h6 className="text-white">ادارة الطلاب</h6>
              {!isCollapsed && (
                <span className="flex items-center gap-2">
                  {openMenu === "students" ? (
                    <ChevronRightRoundedIcon className="text-white" />
                  ) : (
                    <ChevronLeftRoundedIcon className="text-white" />
                  )}
                </span>
              )}
            </div>
            {!isCollapsed && openMenu === "students" && (
              <div className="absolute right-full top-0 mr-2 bg-white rounded-lg py-2 shadow-md  z-50">
                <Link href="/Addstudent">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    اضافة طالب
                  </span>
                </Link>
                <Link href="/StudentList">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    عرض طلاب
                  </span>
                </Link>
                <Link href="/StudentAttance">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    تتبع حضور الطلاب
                  </span>
                </Link>
              </div>
            )}
          </li>

          {/* ادارة الأساتذة */}
          <li className="nav-item mb-2 relative" style={{ listStyle: "none" }}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => toggleMenu("teachers")}
              style={{ cursor: "pointer" }}
            >
              <h6 className="text-white">ادارة الأساتذة</h6>
              {!isCollapsed && (
                <span className="flex items-center gap-2">
                  {openMenu === "teachers" ? (
                    <ChevronRightRoundedIcon className="text-white" />
                  ) : (
                    <ChevronLeftRoundedIcon className="text-white" />
                  )}
                </span>
              )}
            </div>
            {!isCollapsed && openMenu === "teachers" && (
              <div className="absolute right-full top-0 mr-2 bg-white rounded-lg py-2 shadow-md z-50">
                <Link href="/AddTeacher">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    اضافة استاذ
                  </span>
                </Link>
                <Link href="/TeacherList">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    عرض أساتذة
                  </span>
                </Link>
                <Link href="/TeacherAttance">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    تتبع حضور الأساتذة
                  </span>
                </Link>
                <Link href="/Evacuation/Model">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    عرض الجلاءات
                  </span>
                </Link>
                <Link href="/Evacuation/Clearances">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    تحديد موعد الجلاء
                  </span>
                </Link>
              </div>
            )}
          </li>

          {/* ادارة الشعب */}
          <li className="nav-item mb-2 relative" style={{ listStyle: "none" }}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => toggleMenu("classes")}
              style={{ cursor: "pointer" }}
            >
              <h6 className="text-white">ادارة الشعب</h6>
              {!isCollapsed && (
                <span className="flex items-center gap-2">
                  {openMenu === "classes" ? (
                    <ChevronRightRoundedIcon className="text-white" />
                  ) : (
                    <ChevronLeftRoundedIcon className="text-white" />
                  )}
                </span>
              )}
            </div>
            {!isCollapsed && openMenu === "classes" && (
              <div className="absolute right-full top-0 mr-2 bg-white rounded-lg py-2 shadow-md z-50">
                <Link href="/Classs/AddClass">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    اضافة شعبة
                  </span>
                </Link>
                <Link href="/Classs/ClassList">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    عرض الشعب
                  </span>
                </Link>
                <Link href="/Distribute">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    توزيع الطلاب
                  </span>
                </Link>
              </div>
            )}
          </li>

          {/* ادارة المواد */}
          <li className="nav-item mb-2 relative" style={{ listStyle: "none" }}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => toggleMenu("subjects")}
              style={{ cursor: "pointer" }}
            >
              <h6 className="sidebar-text flex-1 text-right text-white">
                ادارة المواد
              </h6>
              {!isCollapsed && (
                <span className="flex items-center gap-2">
                  {openMenu === "subjects" ? (
                    <ChevronRightRoundedIcon className="text-white" />
                  ) : (
                    <ChevronLeftRoundedIcon className="text-white" />
                  )}
                </span>
              )}
            </div>
            {!isCollapsed && openMenu === "subjects" && (
              <div className="absolute right-full top-0 mr-2 bg-white rounded-lg py-2 shadow-md z-50">
                <Link href="/Subjects/AddSubject">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    اضافة المواد
                  </span>
                </Link>
                <Link href="/SubjectList">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    عرض المواد
                  </span>
                </Link>
              </div>
            )}
          </li>

          {/* احصائيات */}
          <li className="nav-item mb-2 relative" style={{ listStyle: "none" }}>
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => toggleMenu("stat")}
              style={{ cursor: "pointer" }}
            >
              <h6 className="sidebar-text flex-1 text-right text-white">
                احصائيات
              </h6>
              {!isCollapsed && (
                <span className="flex items-center gap-2">
                  {openMenu === "stat" ? (
                    <ChevronRightRoundedIcon className="text-white" />
                  ) : (
                    <ChevronLeftRoundedIcon className="text-white" />
                  )}
                </span>
              )}
            </div>
            {!isCollapsed && openMenu === "stat" && (
              <div className="absolute right-full top-0 mr-2 bg-white rounded-lg py-2 shadow-md  z-50">
                <Link href="/Reports">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition-colors text-right whitespace-nowrap">
                    تقارير معلومات الشعبة
                  </span>
                </Link>
              </div>
            )}
          </li>

          <hr className="sidebar-divider my-3 text-white opacity-50" />

          {/* Sidebar Toggler Button */}
          <div className="text-center mt-auto">
            <button
              onClick={toggleSidebar}
              className="rounded-full border-0 bg-blue-300 text-white p-2 hover:bg-blue-400 transition-colors"
            >
              {isCollapsed ? (
                <ChevronLeftIcon className="text-white" />
              ) : (
                <ChevronRightIcon className="text-white" />
              )}
            </button>
          </div>
        </ul>
      </div>

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "mr-48" : "mr-64"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
