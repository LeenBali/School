/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";

const EditClass = () => {
  const router = useRouter();
  const [editData, setEditData] = useState({
    year: "",
    section: "",
    classroom: "",
    seats: "",
    studentsCount: "",
    teacher: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const editIndexStored = localStorage.getItem("editClassIndex");
    const classesData = localStorage.getItem("classes");

    if (editIndexStored !== null && classesData) {
      const index = parseInt(editIndexStored);
      const allClasses = JSON.parse(classesData);

      if (allClasses[index]) {
        const classItem = allClasses[index];
        setEditData({
          year: classItem.year || "",
          section: classItem.section || "",
          classroom: classItem.classroom || "",
          seats: classItem.seats || "",
          studentsCount: classItem.studentsCount || "",
          teacher: classItem.teacher || "",
        });
        setEditIndex(index);
      }
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const allClasses = JSON.parse(localStorage.getItem("classes")) || [];

      // تحديث بيانات الصف في الموقع المحدد
      allClasses[editIndex] = editData;

      // حفظ البيانات
      localStorage.setItem("classes", JSON.stringify(allClasses));

      alert("تم تعديل بيانات الصف بنجاح");
    }
  };

  return (
    <div>
      <Header />

      <div
        className="bg-white w-5xl p-10 m-auto card shadow-lg mt-20"
        style={{ marginRight: "390px" }}
      >
        <div>
          <h1 className="text-center mb-10 font-bold text-3xl">
            تعديل بيانات الصف
          </h1>
          <div className="flex justify-center mt-8 gap-8">
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  عدد الطلاب
                </p>
              </div>
              <input
                type="number"
                value={editData.studentsCount}
                onChange={(e) =>
                  setEditData({ ...editData, studentsCount: e.target.value })
                }
                placeholder="أدخل عدد الطلاب"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  المعلم المسؤول
                </p>
              </div>
              <input
                type="text"
                value={editData.teacher}
                onChange={(e) =>
                  setEditData({ ...editData, teacher: e.target.value })
                }
                placeholder="أدخل اسم المعلم"
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
                value={editData.classroom}
                onChange={(e) =>
                  setEditData({ ...editData, classroom: e.target.value })
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
                type="number"
                value={editData.seats}
                onChange={(e) =>
                  setEditData({ ...editData, seats: e.target.value })
                }
                placeholder="أدخل عدد المقاعد"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
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
                value={editData.year}
                onChange={(e) =>
                  setEditData({ ...editData, year: e.target.value })
                }
                placeholder="أدخل العام الدراسي"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">الشعبة</p>
              </div>
              <input
                type="text"
                value={editData.section}
                onChange={(e) =>
                  setEditData({ ...editData, section: e.target.value })
                }
                placeholder="أدخل الشعبة"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn p-4 bg-green-500 text-white rounded-2xl flex-1 hover:bg-green-600 transition-colors mt-8"
          onClick={handleUpdate}
        >
          حفظ التعديلات
        </button>
      </div>
      <Sidebar />
    </div>
  );
};

export default EditClass;
