"use client";
import Link from "next/link";
import { useState } from "react";
import { RiFacebookFill, RiGoogleFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    confirm: "",
  });
  const handelEmail = (e) => {
    e.preventDefault();
    if (
      login.email == "" ||
      login.password == "" ||
      login.name == "" ||
      login.lastname == "" ||
      confirm == ""
    ) {
      alert("الرجاء تعبئة جميع الحقول");
      return;
    }
    if (login.password !== login.confirm) {
      alert("كلمة السر غير متطابقة");
      return;
    }
    if (login.password.length < 6) {
      alert("كلمة المرور قصيرة ");
      return;
    }
    alert("تم تسجيل الدخول بنجاح");
    navigate("/Dashboard");
  };
  return (
    <div
      className="text-center  m-0 p-0 h-screen"
      style={{ backgroundColor: "#4e73df" }}
    >
      <div className="bg-white w-4xl m-auto mt-15 p-10 rounded-xl">
        <h1 className=" text-gray-900 mb-4 font-black text-2xl">انشاء حساب</h1>
        <form onSubmit={handelEmail}>
          <div className="flex justify-center gap-5">
            <input
              type="text"
              value={login.lastname}
              onChange={(e) => setlogin({ ...login, lastname: e.target.value })}
              className=" w-60 p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="  اسم الأخير"
            />
            <input
              type="text"
              value={login.name}
              onChange={(e) => setlogin({ ...login, name: e.target.value })}
              className=" w-60 p-3.5 mt-5 rounded-3xl text-xs text-right input"
              placeholder=" اسم الأول "
            />
          </div>
          <div>
            <input
              type="email"
              value={login.email}
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
              className=" w-lg p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="أدخل بريد الالكتروني"
            />
          </div>
          <div>
            <input
              type="password"
              value={login.password}
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
              className=" w-lg p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="أدخل كلمة السر"
            />
          </div>
          <div>
            <input
              type="password"
              value={login.confirm}
              onChange={(e) => setlogin({ ...login, confirm: e.target.value })}
              className=" w-lg p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="تأكيد كلمة المرور"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block w-lg p-3.5  rounded-3xl  text-xs"
            >
              تسجيل الحساب
            </button>
          </div>
          <hr className="text-gray-300 mt-5 w-lg m-auto" />
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-google btn-user btn-block  w-lg p-3.5  rounded-3xl  text-sm"
            >
              <div className="flex justify-center gap-2">
                <RiGoogleFill className="w-5" />
                تسجيل الدخول بواسطة غوغل
              </div>
            </button>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-facebook btn-user btn-block w-lg p-3.5 rounded-3xl  text-xs "
            >
              <div className="flex justify-center gap-2 items-center">
                <RiFacebookFill className="w-5" /> تسجيل الدخول بواسطة فيسبوك
              </div>
            </button>
          </div>
          <hr className="text-gray-300 mt-5 w-lg m-auto" />

          <div className="text-center">
            <Link href="/">
              <p className=" text-blue-400 text-xs font-medium mt-3">
                هل لديك حساب بالفعل؟ تسجيل الدخول
              </p>
            </Link>
          </div>
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            Button
          </button>
        </form>
      </div>
    </div>
  );
}
