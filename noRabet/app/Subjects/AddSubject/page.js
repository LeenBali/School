/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useState, useEffect } from "react";

const AddSubject = () => {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState({
    name: "",
    fullMark: "",
    firstExamMark: "",
    secondExamMark: "",
    finalExamMark: "",
    type: "",
    hours: "",
    teacher: "",
  });

  useEffect(() => {
    const storedSubjects = localStorage.getItem("subjects");
    if (storedSubjects) {
      setData(JSON.parse(storedSubjects));
    }
  }, []);

  function HandleAdd() {
    const news = [...data, add];
    setData(news);
    localStorage.setItem("subjects", JSON.stringify(news));
    alert("تم إضافة المادة بنجاح");

    // إعادة تعيين الحقول
    setAdd({
      name: "",
      fullMark: "",
      firstExamMark: "",
      secondExamMark: "",
      finalExamMark: "",
      type: "",
      hours: "",
      teacher: "",
    });
  }

  return (
    <div>
      <>
        <Header />
        <div
          className="bg-white w-5xl p-10 m-auto mt-10 card shadow-lg"
          style={{ marginRight: "400px" }}
        >
          <div>
            <h1 className="text-center mb-10 font-bold text-3xl">إضافة مادة</h1>
            {/* الصف الأول: اسم المادة والعلامة الكاملة */}
            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    العلامة الكاملة
                  </p>
                </div>
                <input
                  type="number"
                  value={add.fullMark}
                  onChange={(e) => setAdd({ ...add, fullMark: e.target.value })}
                  placeholder="أدخل العلامة الكاملة"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    اسم المادة
                  </p>
                </div>
                <input
                  type="text"
                  value={add.name}
                  onChange={(e) => setAdd({ ...add, name: e.target.value })}
                  placeholder="أدخل اسم المادة"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    المعلم المسؤول
                  </p>
                </div>
                <input
                  type="text"
                  value={add.teacher}
                  onChange={(e) => setAdd({ ...add, teacher: e.target.value })}
                  placeholder="أدخل اسم المعلم المسؤول"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    عدد الحصص
                  </p>
                </div>
                <input
                  type="number"
                  value={add.hours}
                  onChange={(e) => setAdd({ ...add, hours: e.target.value })}
                  placeholder="أدخل عدد الحصص"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
            </div>
            {/* الصف الثاني: علامة امتحان الأول وعلامة امتحان الثاني */}
            <div className="flex justify-center mt-8 gap-8">
              {" "}
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    علامة امتحان الثاني
                  </p>
                </div>
                <input
                  type="number"
                  value={add.secondExamMark}
                  onChange={(e) =>
                    setAdd({ ...add, secondExamMark: e.target.value })
                  }
                  placeholder="أدخل علامة امتحان الثاني"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    علامة امتحان الأول
                  </p>
                </div>
                <input
                  type="number"
                  value={add.firstExamMark}
                  onChange={(e) =>
                    setAdd({ ...add, firstExamMark: e.target.value })
                  }
                  placeholder="أدخل علامة امتحان الأول"
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                />
              </div>
            </div>
            {/* الصف الثالث: علامة الامتحان النهائي ونوع المادة */}
            <div className="flex justify-center mt-8 gap-8">
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    نوع المادة
                  </p>
                </div>
                <select
                  value={add.type}
                  onChange={(e) => setAdd({ ...add, type: e.target.value })}
                  className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                  required
                >
                  <option value="">اختر</option>
                  <option value="شرعي">شرعي</option>
                  <option value="اساسي">اساسي</option>
                </select>
              </div>
              <div className="col">
                <div className="text-right">
                  <p className="text-gray-600 font-medium text-lg pb-3">
                    علامة الامتحان النهائي
                  </p>
                </div>
                <input
                  type="number"
                  value={add.finalExamMark}
                  onChange={(e) =>
                    setAdd({ ...add, finalExamMark: e.target.value })
                  }
                  placeholder="أدخل علامة الامتحان النهائي"
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
            إضافة الطالب
          </button>
        </div>
        <Sidebar />
      </>
    </div>
  );
};

export default AddSubject;
