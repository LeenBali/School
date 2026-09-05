"use client";
import Link from "next/link";
import { useState } from "react";
import { RiFacebookFill, RiGoogleFill } from "@remixicon/react";
export default function Home() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handelEmail = (e) => {
    e.preventDefault();
    if (login.email == "" || login.password == "") {
      alert("الرجاء تعبئة جميع الحقول");
      return;
    }
    if (login.password.length < 6) {
      alert("كلمة المرور قصيرة ");
      return;
    }

    window.location.href = "/Dashboard";
  };
  const [check, setcheck] = useState(false);
  return (
    <div
      className="text-center m-0 p-0 h-screen"
      style={{ backgroundColor: "#4e73df" }}
    >
      <div className="bg-white w-4xl m-auto mt-30 p-12 rounded-xl">
        <h1 className=" text-gray-900 mb-4 font-black text-2xl">
          مرحبا بعودتك
        </h1>
        <form onSubmit={handelEmail}>
          <div>
            <input
              type="email"
              value={login.email}
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
              className=" w-96 p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="أدخل بريد الالكتروني"
            />
          </div>
          <div>
            <input
              value={login.password}
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
              type="password"
              className=" w-96 p-3.5 mt-5 rounded-3xl text-right text-xs input"
              placeholder="أدخل كلمة السر"
            />
          </div>
          <div className="flex items-center gap-48 justify-center text-sm mt-4">
            <Link href="/forget">
              <p className=" text-blue-400 font-medium text-xs">
                نسيت كلمة السر؟
              </p>
            </Link>

            <div className="flex gap-1 text-gray-400 text-sm font-medium">
              <input
                type="checkbox"
                checked={check}
                onChange={(e) => setcheck(e.target.checked)}
              />
              <p>تذكرني</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block w-96 p-3.5  rounded-3xl  text-xs"
            >
              تسجيل الدخول
            </button>
          </div>
          <hr className="text-gray-300 mt-5 w-96 m-auto" />
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-google btn-user btn-block  w-96 p-3.5  rounded-3xl  text-sm"
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
              className="btn btn-facebook btn-user btn-block w-96 p-3.5 rounded-3xl  text-xs "
            >
              <div className="flex justify-center gap-2 items-center">
                <RiFacebookFill className="w-5" /> تسجيل الدخول بواسطة فيسبوك
              </div>
            </button>
          </div>
          <hr className="text-gray-300 mt-5 w-96 m-auto" />
          <Link href="/register">
            <div className="text-center">
              <span className=" text-blue-400 text-xs font-medium">
                انشاء حساب جديد
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
