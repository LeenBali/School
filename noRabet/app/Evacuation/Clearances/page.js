"use client";
import React, { useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";

const Page = () => {
  const [exams, setExams] = useState([]);
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const today = new Date().toISOString().split("T")[0];

  const addExam = (e) => {
    e.preventDefault();
    if (!grade || !date || !time) return alert("يرجى تعبئة جميع الحقول");
    setExams([...exams, { id: Date.now(), grade, date, time }]);
    setGrade("");
    setDate("");
    setTime("");
  };

  const deleteExam = (id) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      setExams(exams.filter((exam) => exam.id !== id));
    }
  };

  const upcomingCount = exams.filter((e) => e.date > today).length;
  const publishedCount = exams.filter((e) => e.date <= today).length;

  const filteredExams = exams.filter((exam) => {
    if (activeTab === "upcoming") return exam.date > today;
    if (activeTab === "published") return exam.date <= today;
    return true;
  });

  return (
    <div className="  min-h-screen">
      <Header />
      <div style={{ marginRight: "200px" }}>
        <div className="max-w-4xl mx-auto px-6 py-8 pt-10">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold ">تحديد موعد الجلاءات</h1>
            <p className="text-gray-400 text-md mt-2">
              نظّم مواعيد الإصدارات والنتائج بسهولة
            </p>
          </div>

          {/* إحصائيات دائرية */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="group cursor-pointer text-center">
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl font-bold">
                    {publishedCount}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-medium text-sm">منشورة</p>
            </div>

            <div className="group cursor-pointer text-center">
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl font-bold">
                    {upcomingCount}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-medium text-sm">قادمة</p>
            </div>

            <div className="group cursor-pointer text-center">
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl font-bold">
                    {exams.length}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-medium text-sm">إجمالي</p>
            </div>
          </div>

          {/* نموذج الإضافة */}
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
            <h2 className="text-gray-700 font-medium mb-4 text-right">
              إضافة موعد جديد
            </h2>
            <form onSubmit={addExam}>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl px-6 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                >
                  إضافة
                </button>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-gray-50 border text-right border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-50 text-right border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />

                <select
                  id="grades"
                  placeholder="الصف الدراسي"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="flex-1 text-right bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 outline-none transition-all"
                >
                  <option> اختر</option>
                  <option>الأول الثانوي</option>
                  <option>الثاني الثانوي</option>
                  <option>البكالوريا</option>
                </select>
              </div>
            </form>
          </div>

          {/* الكارد الرئيسي - يحتوي على الأزرار وقائمة المواعيد */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* رأس الكارد مع الأزرار */}
            <div className="border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-500">
                    {filteredExams.length} مواعيد
                  </span>
                </div>
                <h3 className="text-gray-700 font-medium">قائمة المواعيد</h3>
              </div>

              {/* أزرار التبويب داخل الكارد */}
              <div className="flex gap-2 mt-4 justify-end">
                <button
                  onClick={() => setActiveTab("published")}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === "published"
                      ? "bg-green-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  المنشورة
                </button>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === "upcoming"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  القادمة
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === "all"
                      ? "bg-blue-500  text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  الكل
                </button>
              </div>
            </div>

            {/* قائمة المواعيد داخل نفس الكارد */}
            <div className="p-4  ">
              {filteredExams.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">لا توجد مواعيد</p>
                  <p className="text-gray-300 text-sm mt-1">
                    أضف موعدك الأول من الأعلى
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredExams.map((exam, idx) => {
                    const isUpcoming = exam.date > today;
                    return (
                      <div
                        key={exam.id}
                        className="group bg-gray-50 hover:bg-white rounded-xl p-3 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          {/* زر الحذف في آخر السطر */}
                          <button
                            onClick={() => deleteExam(exam.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            حذف
                          </button>
                          {/* باقي المحتوى في أول السطر */}
                          <div className="flex gap-5 items-center">
                            {" "}
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isUpcoming ? "bg-amber-500" : "bg-green-500"
                              }`}
                            ></div>
                            <span
                              className={`text-sm px-2 py-0.5 rounded-full ${
                                isUpcoming
                                  ? "text-amber-600 bg-amber-50"
                                  : "text-green-600 bg-green-50"
                              }`}
                            >
                              {isUpcoming ? "قادم" : "منشور"}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {exam.time}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {exam.date}
                            </span>
                            <span className="text-gray-800 font-medium text-sm">
                              {exam.grade}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                              <span className="text-gray-500 text-sm font-medium">
                                {idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;
