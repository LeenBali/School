"use client";
import { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Link from "next/link";

const AttendancePage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("أول ثانوي"); // الحالة الافتراضية للفلترة

  // تحميل بيانات الشعب من localStorage
  useEffect(() => {
    const loadSections = () => {
      setLoading(true);

      // جلب الطلاب لحساب الشعب بناءً على الصفوف
      const storedStudents = JSON.parse(
        localStorage.getItem("students") || "[]",
      );
      const sectionsMap = new Map();

      storedStudents.forEach((student) => {
        if (student.distributed && student.section) {
          // نستخدم اسم الشعبة كمفتاح ونخزن معها عدد الطلاب
          const count = sectionsMap.get(student.section) || 0;
          sectionsMap.set(student.section, count + 1);
        }
      });

      const computedSections = Array.from(sectionsMap.entries()).map(
        ([name, count]) => ({
          name,
          count,
        }),
      );

      setSections(computedSections);
      setLoading(false);
    };

    loadSections();
  }, []);

  // فلترة الشعب بناءً على الصف المختار (أول، ثاني، ثالث ثانوي)
  const filteredSections = sections.filter((section) =>
    section.name.startsWith(selectedClass),
  );

  const cards = filteredSections.map((section, index) => ({
    id: index + 1,
    title: section.name,
    desc: `عدد الطلاب: ${section.count} / 50`,
    sectionName: section.name,
    studentCount: section.count,
    isFull: section.count >= 50,
  }));

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 mt-10" style={{ marginRight: "300px" }}>
          <div className="container mx-auto text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        </div>
        <Sidebar />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="p-8 mt-10" style={{ marginRight: "300px" }}>
        <div className="container mx-auto">
          {/* أزرار الفلترة حسب الصف - نفس تصميم صفحة التوزيع */}
          <div
            className="flex justify-center gap-3 mb-10"
            style={{ direction: "rtl" }}
          >
            {["أول ثانوي", "ثاني ثانوي", "ثالث ثانوي"].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  selectedClass === cls
                    ? "bg-amber-500 text-white shadow-md" // اللون الجديد عند التحديد
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200" // الحالة العادية
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-dashed border-gray-200">
              <h3 className="text-xl font-bold text-gray-600 mb-2 pt-10">
                لا توجد شعب لـ {selectedClass}
              </h3>
              <p className="text-gray-500">
                تأكد من إضافة وتوزيع الطلاب في هذا الصف أولاً
              </p>
              <Link href="/Distribute">
                <button className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                  الذهاب لتوزيع الطلاب
                </button>
              </Link>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ direction: "rtl" }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300  border-gray-50 ${
                    card.isFull
                      ? "border-r-8 border-r-rose-500"
                      : "border-r-8 border-r-blue-500"
                  }`}
                >
                  <div className="p-4 text-center">
                    <h5 className="font-black text-xl mb-3 text-gray-800">
                      {card.title}
                    </h5>
                    <div className="bg-gray-50 rounded-lg py-2 mb-4">
                      <p className="text-gray-600 font-medium">{card.desc}</p>
                    </div>

                    {card.isFull && (
                      <div className="mb-4">
                        <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
                          مكتملة
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/DetailsAttance?section=${encodeURIComponent(card.sectionName)}`}
                    >
                      <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-100">
                        تسجيل الحضور
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default AttendancePage;
