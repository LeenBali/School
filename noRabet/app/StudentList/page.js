/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StudentsPage = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const tableRef = useRef();
  //استخدم الكود tableRef للإشارة إلى عنصر الجدول في الـ DOM، وذلك لكي تتمكن مكتبة html2canvas من معرفة الجزء الذي تريد تصويره.

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);

  const Handledelete = (e) => {
    const newStudents = students.filter((item) => item !== e);
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
    //لازم نبعت لها النسخة الجديدة المحدثة عشان لما تعمل تحديث للصفحة (Refresh) ما يرجع الطالب المحذوف.
    alert("تم حذف الطالب بنجاح");
  };
  //هون بنخزن "ترتيب" الطالب (Index) في الذاكرة. ليش؟
  // عشان لما ننتقل لصفحة التعديل، تعرف هذيك الصفحة أي طالب بدنا نعدل بياناته
  const HandleEdit = (index) => {
    localStorage.setItem("editIndex", index);
    router.push("/EditStudent");
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
    pdf.save("الطلاب.pdf");
  };

  return (
    <>
      <Header />
      <div className="h-auto mt-14 bg-white rounded-lg shadow-lg p-9">
        <h1 className="text-center font-bold py-6 pe-22 text-2xl">
          عرض سجل الطلاب
        </h1>

        <button
          onClick={exportPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors ms-9 mb-2 shadow-md"
        >
          📄 تصدير PDF
        </button>

        <div className="overflow-x-auto ms-10 text-gray-500 rounded-lg">
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
                    الصف
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
                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-gray-300 p-3 text-center"
                    >
                      لا يوجد طلاب
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
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
                            onClick={() => Handledelete(student)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.city || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.class || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.phone || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.date || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.email || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.lastname || "-"}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.name || "-"}
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

export default StudentsPage;
