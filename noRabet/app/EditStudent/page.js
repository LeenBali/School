/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const EditStudent = () => {
  const [editData, setEditData] = useState({
    name: "",
    lastname: "",
    email: "",
    pass: "",
    city: "",
    class: "",
    date: "",
    phone: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    const editIndexStored = localStorage.getItem("editIndex");
    const studentsData = localStorage.getItem("students");
    if (editIndexStored !== null && studentsData) {
      const index = parseInt(editIndexStored);
      const allStudents = JSON.parse(studentsData);
      if (allStudents[index]) {
        const student = allStudents[index];
        setEditData({
          name: student.name || "",
          lastname: student.lastname || "",
          email: student.email || "",
          pass: student.pass || "",
          city: student.city || "",
          class: student.class || "",
          date: student.date || "",
          phone: student.phone || "",
        });
        setEditIndex(index);
      }
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const allStudents = JSON.parse(localStorage.getItem("students")) || [];
      allStudents[editIndex] = editData;
      localStorage.setItem("students", JSON.stringify(allStudents));
      alert("تم تعديل بيانات الطالب بنجاح");
    }
  };

  return (
    <div>
      <Header />

      <div
        className="bg-white w-5xl p-10 m-auto card shadow-lg mt-16"
        style={{ marginRight: "400px" }}
      >
        <div>
          <h1 className="text-center mb-10 font-bold text-3xl">
            تعديل بيانات الطالب
          </h1>

          <div className="flex justify-center mt-8 gap-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  الاسم الأخير
                </p>
              </div>
              <input
                type="text"
                value={editData.lastname}
                onChange={(e) =>
                  setEditData({ ...editData, lastname: e.target.value })
                }
                placeholder="أدخل الاسم الأخير"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuLastName"
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
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="أدخل الاسم الأول"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuFirstName"
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
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="أدخل البريد الالكتروني"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuEmail"
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
                value={editData.pass}
                onChange={(e) =>
                  setEditData({ ...editData, pass: e.target.value })
                }
                placeholder="أدخل كلمة السر"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuPassword"
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
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                placeholder="أدخل رقم الموبايل"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuPhone"
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
                value={editData.date}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuBirthday"
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
                value={editData.city}
                onChange={(e) =>
                  setEditData({ ...editData, city: e.target.value })
                }
                placeholder="أدخل المدينة"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuCity"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">الصف</p>
              </div>
              <input
                type="text"
                value={editData.class}
                onChange={(e) =>
                  setEditData({ ...editData, class: e.target.value })
                }
                placeholder="أدخل الصف"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                id="stuClass"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn p-4 bg-green-500 text-white rounded-2xl flex-1 hover:bg-green-600 transition-colors mt-4"
          onClick={handleUpdate}
        >
          حفظ التعديلات
        </button>
      </div>
      <Sidebar />
    </div>
  );
};

export default EditStudent;
