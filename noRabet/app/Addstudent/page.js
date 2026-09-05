/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Page = () => {
  const [data, setdata] = useState([]);
  const [add, setadd] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    pass: "",
    city: "",
    class: "",
    date: "",
    phone: "",
    distributed: false,
    section: null,
    createdAt: "",
  });

  useEffect(() => {
    const storedStudents = localStorage.getItem("students"); //التحقق من البيانات مخزنة مسبقاً تحت مفتاح "students" في الـ localStorage.
    if (storedStudents) {
      setdata(JSON.parse(storedStudents)); //إذا وجدت، يتم تحويلها من نص (JSON string) إلى مصفوفة كائنات وتخزينها في data
    }
  }, []);

  const HandleAdd = () => {
    if (
      !add.name ||
      !add.class ||
      !add.lastname ||
      !add.city ||
      !add.date ||
      !add.email ||
      !add.phone ||
      !add.pass
    ) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    const news = [...data, add];
    setdata(news);
    localStorage.setItem("students", JSON.stringify(news)); //يقوم بتحديث المصفوفة data ثم يحفظ النسخة الجديدة في الـ localStorage.

    alert(`✅ تم إضافة الطالب بنجاح `);

    setadd({
      id: "",
      name: "",
      lastname: "",
      email: "",
      pass: "",
      city: "",
      class: "",
      date: "",
      phone: "",
      distributed: false,
      section: null,
      createdAt: "",
    });
  };

  return (
    <>
      <Header />
      <div
        className="bg-white w-5xl p-10 m-auto card shadow-lg"
        style={{ marginRight: "400px" }}
      >
        <div>
          <h1 className="text-center mb-10 font-bold text-3xl">إضافة طالب</h1>

          <div className="flex justify-center mt-8 gap-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  الاسم الأخير
                </p>
              </div>
              <input
                type="text"
                value={add.lastname}
                onChange={(e) => setadd({ ...add, lastname: e.target.value })}
                placeholder="أدخل الاسم الأخير"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  الاسم الأول
                </p>
              </div>
              <input
                type="text"
                value={add.name}
                onChange={(e) => setadd({ ...add, name: e.target.value })}
                placeholder="أدخل الاسم الأول"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  البريد الإلكتروني
                </p>
              </div>
              <input
                type="email"
                value={add.email}
                onChange={(e) => setadd({ ...add, email: e.target.value })}
                placeholder="أدخل البريد الالكتروني"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  كلمة السر
                </p>
              </div>
              <input
                type="password"
                value={add.pass}
                onChange={(e) => setadd({ ...add, pass: e.target.value })}
                placeholder="أدخل كلمة السر"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  رقم الموبايل
                </p>
              </div>
              <input
                type="text"
                value={add.phone}
                onChange={(e) => setadd({ ...add, phone: e.target.value })}
                placeholder="أدخل رقم الموبايل"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  تاريخ الميلاد
                </p>
              </div>
              <input
                type="date"
                value={add.date}
                onChange={(e) => setadd({ ...add, date: e.target.value })}
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>

          <div className="flex gap-8 justify-center mt-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  المدينة
                </p>
              </div>
              <input
                type="text"
                value={add.city}
                onChange={(e) => setadd({ ...add, city: e.target.value })}
                placeholder="أدخل المدينة"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">الصف</p>
              </div>
              <select
                value={add.class}
                onChange={(e) => setadd({ ...add, class: e.target.value })}
                className="form-control rounded-xl p-1 form input text-right text-gray-500 text-lg"
                required
              >
                <option value="">اختر الصف</option>
                <option value="أول ثانوي">أول ثانوي</option>
                <option value="ثاني ثانوي">ثاني ثانوي</option>
                <option value="ثالث ثانوي">ثالث ثانوي</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn p-4 btn-primary btn-block rounded-2xl mt-8"
          onClick={HandleAdd}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          إضافة الطالب
        </button>
      </div>
      <Sidebar />
    </>
  );
};

export default Page;
