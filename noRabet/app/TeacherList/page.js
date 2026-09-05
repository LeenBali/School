/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const TeachersPage = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem("teachers");
    if (stored) {
      setTeachers(JSON.parse(stored));
    }
  }, []);

  const Handledelete = (e) => {
    const newTeachers = teachers.filter((item) => item !== e);
    setTeachers(newTeachers);
    localStorage.setItem("teachers", JSON.stringify(newTeachers));
    alert("تم حذف الأستاذ بنجاح");
  };

  const HandleEdit = (index) => {
    localStorage.setItem("editTeacherIndex", index);
    router.push("/EditTeacher");
  };

  // ✅ دالة التصدير المعدلة - تتجاهل الألوان المعقدة
  const exportPDF = async () => {
    if (!tableRef.current) return;

    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        ignoreColors: true, // ✅ يتجاهل الألوان المعقدة
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("أساتذة.pdf");
    } catch (error) {
      console.error("خطأ:", error);
      alert("حدث خطأ أثناء التصدير: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="h-auto mt-14 bg-white rounded-lg shadow-lg p-9">
        <h1 className="text-center font-bold py-6 pe-22 text-2xl">
          عرض سجل الأساتذة
        </h1>

        <button
          onClick={exportPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors ms-9 mb-2 shadow-md"
        >
          📄 تصدير PDF
        </button>

        <div className="overflow-x-auto ms-10 text-gray-500">
          <div ref={tableRef}>
            <table className="w-6xl text-right border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    إجراءات
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    المدينة
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    المادة
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    رقم الموبايل
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    تاريخ الميلاد
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    البريد الإلكتروني
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    الاسم الأخير
                  </th>
                  <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                    الاسم الأول
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-gray-300 p-3 text-center"
                    >
                      لا يوجد أساتذة
                    </td>
                  </tr>
                ) : (
                  teachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 p-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => HandleEdit(index)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => Handledelete(teacher)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.city || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.subject || teacher.class || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.phone || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.birthDate || teacher.date || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.email || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.lastname || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {teacher.name || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default TeachersPage;
