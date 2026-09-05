"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useState, useEffect } from "react";

const page = () => {
  const [data, setdata] = useState([]);
  const [add, setadd] = useState({
    teacher: "",
    studentsCount: "",
    classroom: "",
    seats: "20",
    year: "",
    section: "",
    type: "", // Added missing 'type' field
  });

  useEffect(() => {
    const storedClasses = localStorage.getItem("classes");
    if (storedClasses) {
      setdata(JSON.parse(storedClasses));
    }
  }, []);

  function HandleAdd() {
    // Validation to ensure required fields are filled
    if (
      !add.type ||
      !add.teacher ||
      !add.classroom ||
      !add.year ||
      !add.section
    ) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const news = [...data, add];
    setdata(news);
    localStorage.setItem("classes", JSON.stringify(news));
    alert("تم إضافة الصف بنجاح");
    setadd({
      teacher: "",
      studentsCount: "",
      classroom: "",
      seats: 20,
      year: "",
      section: "",
      type: "", // Reset type field as well
    });
  }

  return (
    <div>
      <>
        <Header />
        <div
          className="bg-white w-5xl p-10 m-auto mt-24 card shadow-lg"
          style={{ marginRight: "400px" }}
        >
          <div>
            <h1 className="text-center mb-10 font-bold text-3xl">إضافة صف</h1>

            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">الصف</p>
                </div>
                <select
                  value={add.type}
                  onChange={(e) => setadd({ ...add, type: e.target.value })} // Fixed: changed setAdd to setadd
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                >
                  <option value="">اختر</option>
                  <option value="العاشر">العاشر</option>
                  <option value="الحادي عشر">الحادي عشر</option>
                  <option value="البكالوريا">البكالوريا</option>
                </select>
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    المعلم المسؤول
                  </p>
                </div>
                <input
                  type="text"
                  value={add.teacher}
                  onChange={(e) => setadd({ ...add, teacher: e.target.value })}
                  placeholder="أدخل المعلم المسؤول"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    القاعة الدراسية
                  </p>
                </div>
                <input
                  type="text"
                  value={add.classroom}
                  onChange={(e) =>
                    setadd({ ...add, classroom: e.target.value })
                  }
                  placeholder="أدخل القاعة الدراسية"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    عدد المقاعد
                  </p>
                </div>
                <input
                  type="text"
                  value={add.seats}
                  onChange={(e) => setadd({ ...add, seats: e.target.value })}
                  placeholder="20"
                  className="form-control rounded-xl p-2 form input text-right text-lg"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    العام الدراسي
                  </p>
                </div>
                <input
                  type="text"
                  value={add.year}
                  onChange={(e) => setadd({ ...add, year: e.target.value })}
                  placeholder="أدخل العام الدراسي"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    الشعبة
                  </p>
                </div>
                <input
                  type="text"
                  value={add.section}
                  onChange={(e) => setadd({ ...add, section: e.target.value })}
                  placeholder="أدخل اسم الشعبة"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn p-4 btn-primary btn-block mt-7 rounded-2xl"
            onClick={HandleAdd}
          >
            إضافة صف
          </button>
        </div>
        <Sidebar />
      </>
    </div>
  );
};

export default page;
