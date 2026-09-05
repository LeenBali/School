/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function Distribute() {
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);

    // حساب إحصائيات الشعب ديناميكياً من مصفوفة الطلاب
    const sectionsMap = new Map();
    storedStudents.forEach((student) => {
      if (student.distributed && student.section) {
        const count = sectionsMap.get(student.section) || 0;
        sectionsMap.set(student.section, count + 1);
      }
    });

    const computedSections = Array.from(sectionsMap.entries()).map(
      ([name, count]) => ({ name, count }),
    );
    setSections(computedSections);
  }, []);

  const totalStudents = students.length;
  const distributedStudents = students.filter((s) => s.distributed).length;
  const waitingStudents = totalStudents - distributedStudents;

  return (
    <div>
      <Header />
      <div
        className="p-4 bg-white mt-12"
        style={{ width: "76%", marginLeft: "55px" }}
      >
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">تقارير معلومات الشعب</h1>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="group cursor-pointer text-center">
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <div className="text-white text-2xl font-bold">
                  {waitingStudents}
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm">غير موزعين</p>
          </div>
          <div className="group cursor-pointer text-center">
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <div className="text-white text-2xl font-bold">
                  {distributedStudents}
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm">موزعين</p>
          </div>
          <div className="group cursor-pointer text-center">
            <div className="flex justify-center mb-2">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <div className="text-white text-2xl font-bold">
                  {totalStudents}
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm">جميع الطلاب</p>
          </div>
        </div>

        <div className="rounded-lg">
          <div className="p-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200 border-b-2 border-gray-300">
                  <th className="p-2 border border-gray-300 text-center">
                    الحالة
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    السعة
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    العدد
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    الشعبة
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.length > 0 ? (
                  sections.map((sec, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                    >
                      <td className="border border-gray-300 p-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${sec.count >= 50 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                        >
                          {sec.count >= 50 ? "ممتلئة" : "متاحة"}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        50
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {sec.count}
                      </td>
                      <td className="border border-gray-300 p-2 text-center font-semibold">
                        {sec.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-400">
                      لا توجد بيانات توزيع حالية
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
