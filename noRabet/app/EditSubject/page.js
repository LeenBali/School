/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";

const EditSubject = () => {
  const router = useRouter();
  const [editData, setEditData] = useState({
    name: "",
    fullMark: "",
    firstExamMark: "",
    secondExamMark: "",
    finalExamMark: "",
    type: "",
    hours: "",
    teacher: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const editIndexStored = localStorage.getItem("editSubjectIndex");
    const subjectsData = localStorage.getItem("subjects");

    if (editIndexStored !== null && subjectsData) {
      const index = parseInt(editIndexStored);
      const allSubjects = JSON.parse(subjectsData);

      if (allSubjects[index]) {
        const subjectItem = allSubjects[index];
        setEditData({
          name: subjectItem.name || "",
          fullMark: subjectItem.fullMark || "",
          firstExamMark: subjectItem.firstExamMark || "",
          secondExamMark: subjectItem.secondExamMark || "",
          finalExamMark: subjectItem.finalExamMark || "",
          type: subjectItem.type || "",
          hours: subjectItem.hours || "",
          teacher: subjectItem.teacher || "",
        });
        setEditIndex(index);
      }
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const allSubjects = JSON.parse(localStorage.getItem("subjects")) || [];

      // تحديث بيانات المادة في الموقع المحدد
      allSubjects[editIndex] = editData;

      // حفظ البيانات
      localStorage.setItem("subjects", JSON.stringify(allSubjects));

      alert("تم تعديل بيانات المادة بنجاح");
    }
  };

  return (
    <div>
      <Header />

      <div
        className="bg-white w-5xl p-10 m-auto card shadow-lg mt-10"
        style={{ marginRight: "400px" }}
      >
        <div>
          <h1 className="text-center mb-10 font-bold text-3xl">
            تعديل بيانات المادة
          </h1>

          {/* الصف الأول: اسم المادة والعلامة الكاملة */}
          <div className="flex justify-center mt-8 gap-8">
            {" "}
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  العلامة الكاملة
                </p>
              </div>
              <input
                type="number"
                value={editData.fullMark}
                onChange={(e) =>
                  setEditData({ ...editData, fullMark: e.target.value })
                }
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
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="أدخل اسم المادة"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-8">
            {" "}
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
                value={editData.hours}
                onChange={(e) =>
                  setEditData({ ...editData, hours: e.target.value })
                }
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
                value={editData.secondExamMark}
                onChange={(e) =>
                  setEditData({ ...editData, secondExamMark: e.target.value })
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
                value={editData.firstExamMark}
                onChange={(e) =>
                  setEditData({ ...editData, firstExamMark: e.target.value })
                }
                placeholder="أدخل علامة امتحان الأول"
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              />
            </div>
          </div>

          {/* الصف الثالث: علامة الامتحان النهائي ونوع المادة */}
          <div className="flex justify-center mt-8 gap-8">
            {" "}
            <div className="col">
              <div className="text-right">
                <p className="text-gray-600 font-medium text-lg pb-3">
                  نوع المادة
                </p>
              </div>
              <select
                value={editData.type}
                onChange={(e) =>
                  setEditData({ ...editData, type: e.target.value })
                }
                className="form-control rounded-xl p-2 form input text-right text-gray-500 text-lg"
                required
              >
                <option value="">اختر</option>
                <option value="شرعية">شرعية</option>
                <option value="عامة">عامة</option>
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
                value={editData.finalExamMark}
                onChange={(e) =>
                  setEditData({ ...editData, finalExamMark: e.target.value })
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

export default EditSubject;
