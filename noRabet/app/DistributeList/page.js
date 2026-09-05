/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

function DistributeContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    const filtered = storedStudents.filter((s) => s.section === section);
    setStudents(filtered);
  }, [section]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-xl" style={{ width: "82%" }}>
        <div className="p-5 text-center ms-12">
          <h1 className="text-2xl font-bold mt-4">
            طلاب {section || "غير محدد"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            إجمالي المقيدين: {students.length} طالب
          </p>
        </div>
        <div className="p-6">
          {students.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border border-gray-300 text-center">
                    الصف
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    اسم الطالب
                  </th>
                  <th className="p-3 border border-gray-300 text-center">#</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={s.id}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 border border-gray-300 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {s.class}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-300 text-center font-semibold">
                      {s.fullName || s.name}
                    </td>
                    <td className="p-3 border border-gray-300 text-center">
                      {i + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16 text-gray-600">
              لا يوجد طلاب في هذه الشعبة
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DistributeList() {
  return (
    <div>
      <Header />
      <div className="min-h-screen p-6">
        <Suspense fallback={<div>جاري التحميل...</div>}>
          <DistributeContent />
        </Suspense>
      </div>
      <Sidebar />
    </div>
  );
}
