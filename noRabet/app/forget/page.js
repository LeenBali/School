"use client";
import Link from "next/link";
import { useState } from "react";
export default function Forget() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [check, setcheck] = useState(false);
  return (
    <div
      className="text-center m-0 p-0 h-screen"
      style={{ backgroundColor: "#4e73df" }}
    >
      <div className="bg-white w-4xl m-auto mt-15 p-12 rounded-xl">
        <h1 className=" text-gray-900 mb-4 font-black text-2xl">
          هل نسيت كلمة السر؟
        </h1>
        <div>
          <h2 className="text-gray-500">
            نتفهم ذلك, تحدث بعض الأمور. ماعليك سوى ادخال
          </h2>
          <h2 className="text-gray-500 ">
            عنوان بريدك الالكتروني أدناه وسنرسل لك رابطا
          </h2>
          <h2 className="text-gray-500">لاعادة تعيين كلمة السر</h2>
          <input
            type="email"
            value={login.email}
            onChange={(e) => setlogin({ ...login, email: e.target.value })}
            className=" w-96 p-3.5 mt-5 rounded-3xl text-right text-xs input"
            placeholder="أدخل بريد الالكتروني"
          />
        </div>

        <div className="mt-4">
          <Link href="/">
            <button
              type="submit"
              className="btn btn-primary btn-user btn-block w-96 p-3.5  rounded-3xl  text-xs"
            >
              <i className="fab fa-facebook-f fa-fw"></i>
              اعادة تعيين كلمة المرور
            </button>
          </Link>
        </div>
        <hr className="text-gray-300 mt-5 w-96 m-auto" />
        <Link href="/register">
          <div className="text-center mt-4 mb-3">
            <a className=" text-blue-400 text-xs font-medium">
              انشاء حساب جديد
            </a>
          </div>
        </Link>
        <div className="text-center">
          <Link href="/">
            <p className=" text-blue-400 text-xs font-medium">
              هل لديك حساب بالفعل؟ تسجيل الدخول
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
