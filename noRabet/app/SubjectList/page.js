/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SubjectsPage = () => {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);

  const tableRef = useRef();
  useEffect(() => {
    const stored = localStorage.getItem("subjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  }, []);

  const Handledelete = (e) => {
    const newSubjects = subjects.filter((item) => item !== e);
    setSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
    alert("تم حذف المادة بنجاح");
  };

  const HandleEdit = (index) => {
    localStorage.setItem("editSubjectIndex", index);
    router.push("/EditSubject");
  };

  const exportPDF = async () => {
    if (!tableRef.current) return;

    const canvas = await html2canvas(tableRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: tableRef.current.scrollWidth,
      windowHeight: tableRef.current.scrollHeight,
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
    pdf.save("المواد.pdf");
  };

  return (
    <>
      <Header />
      <div className="h-auto mt-14 bg-white rounded-lg shadow-lg p-9">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-center font-bold text-2xl flex-1">
            عرض سجل المواد
          </h1>
        </div>
        {/* زر التصدير */}
        <button
          onClick={exportPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors ms-9 mb-2 shadow-md "
        >
          تصدير كملف
        </button>
        {/* الجدول المراد تصديره */}
        <div ref={tableRef} className="overflow-x-auto ms-9 text-gray-500">
          <table className="w-6xl text-right border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  إجراءات
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  نوع المادة
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  علامة الامتحان النهائي
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  علامة امتحان الثاني
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  علامة امتحان الأول
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  المعلم المسؤول
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  عدد الحصص
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  العلامة الكاملة
                </th>
                <th className="border text-sm border-gray-300 p-3 text-center font-bold">
                  اسم المادة
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="border border-gray-300 p-3 text-center"
                  >
                    لا يوجد مواد
                  </td>
                </tr>
              ) : (
                subjects.map((subjectItem, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
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
                          onClick={() => Handledelete(subjectItem)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.type || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.finalExamMark || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.secondExamMark || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.firstExamMark || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.teacher || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.hours || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.fullMark || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {subjectItem.name || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default SubjectsPage;
