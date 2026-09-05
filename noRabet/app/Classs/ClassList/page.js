/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // أضف هذا للتوجيه
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ClassPage = () => {
  const router = useRouter(); // للتوجيه
  const [classes, setClasses] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem("classes");
    if (stored) {
      const parsedClasses = JSON.parse(stored);
      console.log("Loaded classes:", parsedClasses); // للتحقق في console
      setClasses(parsedClasses);
    }
  }, []);

  const Handledelete = (e) => {
    const newClasses = classes.filter((item) => item !== e);
    setClasses(newClasses);
    localStorage.setItem("classes", JSON.stringify(newClasses));
    alert("تم حذف الصف بنجاح");
  };

  // دالة التعديل - تخزن رقم الصف وتنتقل للصفحة
  const HandleEdit = (index) => {
    localStorage.setItem("editClassIndex", index);
    router.push("/EditClass"); // انتقل إلى صفحة تعديل الصف
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
    pdf.save("الصفوف.pdf");
  };

  return (
    <>
      <Header />
      <div className="h-auto mt-14 bg-white rounded-lg shadow-lg p-9">
        <h1 className="text-center font-bold py-6 pe-22 text-2xl">
          عرض سجل الصفوف
        </h1>
        <button
          onClick={exportPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors ms-9 mb-2 shadow-md"
        >
          تصدير كملف PDF
        </button>
        <div ref={tableRef} className="overflow-x-auto ms-10 text-gray-500">
          <table className="w-6xl text-right border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  إجراءات
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  العام الدراسي
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  الشعبة
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  القاعة الدراسية
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  عدد المقاعد
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  الصف
                </th>
                <th className="border text-sm text-gray-600 border-gray-300 p-3 text-center font-bold">
                  المعلم المسؤول
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border border-gray-300 p-3 text-center"
                  >
                    لا يوجد صفوف
                  </td>
                </tr>
              ) : (
                classes.map((classItem, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    style={{ transition: "background-color 0.3s" }}
                  >
                    <td className="border border-gray-300 p-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => HandleEdit(index)} // تمرير index
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => Handledelete(classItem)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.year || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.section || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.classroom || "-"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.seats || "20"}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.type || "-"}{" "}
                      {/* تغيير من studentsCount إلى type */}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      {classItem.teacher || "-"}
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

export default ClassPage;
