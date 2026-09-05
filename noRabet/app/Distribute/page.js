/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function DistributePage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  // القيمة الافتراضية "الكل" لعرض جميع غير الموزعين
  const [selectedClass, setSelectedClass] = useState("الكل");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);
    updateSectionsList(storedStudents);
  };

  const updateSectionsList = (allStudents) => {
    const sectionsMap = new Map();
    allStudents.forEach((s) => {
      if (s.distributed && s.section) {
        const count = sectionsMap.get(s.section) || 0;
        sectionsMap.set(s.section, count + 1);
      }
    });
    setSections(
      Array.from(sectionsMap.entries()).map(([name, count]) => ({
        name,
        count,
      })),
    );
  };

  const distributeStudent = (student) => {
    let targetSection = sections.find(
      (sec) => sec.name.startsWith(student.class) && sec.count < 50,
    );

    if (!targetSection) {
      const sameClassCount = sections.filter((sec) =>
        sec.name.startsWith(student.class),
      ).length;
      targetSection = {
        name: `${student.class} - شعبة ${sameClassCount + 1}`,
        count: 0,
      };
    }

    const updatedStudents = students.map((s) =>
      s.id === student.id
        ? { ...s, distributed: true, section: targetSection.name }
        : s,
    );

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    updateSectionsList(updatedStudents);
    alert(
      `✅ تم توزيع ${student.fullName || student.name} على ${targetSection.name}`,
    );
  };

  // تصفية الطلاب بناءً على الاختيار (الكل أو صف محدد)
  const waitingStudents = students.filter((s) => {
    const isNotDistributed = !s.distributed;
    if (selectedClass === "الكل") return isNotDistributed;
    return isNotDistributed && s.class === selectedClass;
  });

  const filteredSections = sections.filter((sec) =>
    selectedClass === "الكل" ? true : sec.name.startsWith(selectedClass),
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container w-6xl px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ marginLeft: "112px" }}
          >
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-6">
                توزيع الطلاب على الشعب
              </h1>
              <div className="flex justify-center gap-3 mb-4">
                {/* إضافة زر "الكل" بجانب الصفوف */}
                {["ثالث ثانوي", "ثاني ثانوي", "أول ثانوي", "الكل"].map(
                  (cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        selectedClass === cls
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {cls === "الكل" ? "غير الموزعين (الكل)" : cls}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="p-10">
              <div className="text-right mb-3">
                <span className="text-gray-600 font-medium">
                  الطلاب غير الموزعين حالياً ({waitingStudents.length})
                </span>
              </div>
              {waitingStudents.length > 0 ? (
                <div className="space-y-3 overflow-y-auto max-h-96">
                  {waitingStudents.map((s, i) => (
                    <div
                      key={s.id}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex justify-between items-center hover:bg-white hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => distributeStudent(s)}
                        className="bg-green-600 px-5 py-2 rounded-lg text-white text-sm hover:bg-green-700"
                      >
                        توزيع الآن
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium text-gray-700 leading-tight">
                            {s.fullName || s.name}
                          </p>
                          <p className="text-xs text-gray-400">{s.class}</p>
                        </div>
                        <span className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-teal-50 rounded-xl p-16 text-center border-2 border-teal-100">
                  <p className="text-teal-600 font-bold text-lg">
                    {selectedClass === "الكل"
                      ? "رائع! لا يوجد طلاب غير موزعين في المدرسة"
                      : `جميع طلاب ${selectedClass} موزعون`}
                  </p>
                </div>
              )}

              {/* قسم الشعب يظهر فقط عند اختيار صف محدد، أو يظهر الكل عند اختيار "الكل" */}
              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                    السعة القصوى: 50 طالب
                  </div>
                  <span className="text-gray-600 font-medium">
                    {selectedClass === "الكل"
                      ? "إحصائيات كافة الشعب"
                      : `شعب ${selectedClass}`}
                  </span>
                </div>
                {filteredSections.map((sec, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 bg-gray-50 border border-gray-100 flex justify-between items-center"
                  >
                    <button
                      onClick={() =>
                        router.push(
                          `/DistributeList?section=${encodeURIComponent(sec.name)}`,
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                    >
                      عرض القائمة ({sec.count})
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {sec.count} / 50
                      </span>
                      <span className="font-bold text-gray-800 text-lg">
                        {sec.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
