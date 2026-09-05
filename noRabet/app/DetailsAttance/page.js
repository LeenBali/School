/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";

const TeacherAttendance = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionName = searchParams.get("section");

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [existingAttendance, setExistingAttendance] = useState(null);

  // الحصول على تاريخ اليوم بالأرقام مع اليوم (نفس دالتك الأصلية)
  const getTodayDateWithDay = () => {
    const today = new Date();
    const days = {
      Sunday: "الأحد",
      Monday: "الاثنين",
      Tuesday: "الثلاثاء",
      Wednesday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة",
      Saturday: "السبت",
    };
    const months = {
      January: "يناير",
      February: "فبراير",
      March: "مارس",
      April: "أبريل",
      May: "مايو",
      June: "يونيو",
      July: "يوليو",
      August: "أغسطس",
      September: "سبتمبر",
      October: "أكتوبر",
      November: "نوفمبر",
      December: "ديسمبر",
    };
    const dayName =
      days[today.toLocaleDateString("en-US", { weekday: "long" })];
    const day = today.getDate();
    const month = months[today.toLocaleDateString("en-US", { month: "long" })];
    const year = today.getFullYear();
    return `${dayName} - ${day} ${month} ${year}`;
  };

  const currentDate = getTodayDateWithDay();

  const getStudentFullName = (student) => {
    if (student.fullName) return student.fullName;
    if (student.name && student.lastname)
      return `${student.name} ${student.lastname}`;
    return student.name || "طالب غير معروف";
  };

  useEffect(() => {
    if (sectionName) {
      const storedStudents = JSON.parse(
        localStorage.getItem("students") || "[]",
      );
      const sectionStudents = storedStudents.filter(
        (student) =>
          student.distributed === true && student.section === sectionName,
      );

      // التحقق من وجود سجل حضور لليوم
      const attendanceKey = `attendance_${sectionName}_${currentDate}`;
      const savedAttendance = localStorage.getItem(attendanceKey);

      if (savedAttendance) {
        // إذا كان هناك سجل محفوظ، استخدمه
        const attendanceData = JSON.parse(savedAttendance);
        setExistingAttendance(attendanceData);

        const studentsWithAttendance = sectionStudents.map((student, index) => {
          const existingRecord = attendanceData.students?.find(
            (s) => s.id == student.id || s.name === getStudentFullName(student),
          );
          return {
            id: student.id || `st-${index}`,
            fullName: getStudentFullName(student),
            attendance: existingRecord ? existingRecord.attendance : true,
            rollNumber: index + 1,
          };
        });
        setStudents(studentsWithAttendance);
      } else {
        // إذا لم يكن هناك سجل، اجعل كل الحضور=true
        setExistingAttendance(null);
        const studentsWithAttendance = sectionStudents.map(
          (student, index) => ({
            id: student.id || `st-${index}`,
            fullName: getStudentFullName(student),
            attendance: true,
            rollNumber: index + 1,
          }),
        );
        setStudents(studentsWithAttendance);
      }
    }
  }, [sectionName, currentDate]);

  // منطق الفلترة
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, students]);

  const toggleAttendance = (studentId) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, attendance: !s.attendance } : s,
      ),
    );
  };

  const saveAttendance = () => {
    const attendanceKey = `attendance_${sectionName}_${currentDate}`;
    const attendanceData = {
      section: sectionName,
      date: currentDate,
      students: students.map((s) => ({
        id: s.id,
        name: s.fullName,
        attendance: s.attendance,
      })),
    };
    localStorage.setItem(attendanceKey, JSON.stringify(attendanceData));
    alert(`✅ تم حفظ الحضور بنجاح لشعبة ${sectionName}`);
  };

  // التصميم الأصلي
  if (!sectionName) {
    return (
      <>
        <Header />
        <div
          className="p-16 m-auto h-auto"
          style={{
            marginRight: "300px",
            width: "1185px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              لم يتم تحديد الشعبة
            </h3>
          </div>
        </div>
        <Sidebar />
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        className="p-16  h-auto bg-white mt-4"
        style={{ marginRight: "300px", width: "1105px", marginLeft: "70px" }}
      >
        <div>
          {/* حقل البحث */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control rounded-xl p-3 w-full border border-gray-300"
              placeholder="ابحث عن طالب"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ textAlign: "right" }}
            />
          </div>

          {/* الجدول بالتنسيق الأصلي */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-center font-bold">
                    التفاصيل
                  </th>
                  <th className="border border-gray-300 p-3 text-center font-bold">
                    تاريخ الحضور
                  </th>
                  <th className="border border-gray-300 p-3 text-center font-bold">
                    الحضور
                  </th>
                  <th className="border border-gray-300 p-3 text-center font-bold">
                    اسم الطالب
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 p-3 text-center text-gray-500"
                    >
                      لا يوجد نتائج
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="bg-white even:bg-gray-100">
                      <td className="border border-gray-300 p-3 text-center">
                        <button
                          onClick={() =>
                            router.push(
                              `/StudentAttendanceDetails?section=${encodeURIComponent(sectionName)}`,
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          عرض
                        </button>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {currentDate}
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        <input
                          type="checkbox"
                          checked={student.attendance}
                          onChange={() => toggleAttendance(student.id)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>
                      <td className="border border-gray-300 p-3 text-center">
                        {student.fullName}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* زر الحفظ بالتنسيق والأبعاد الأصلية */}
          <button
            className="btn bg-green-600 mt-6 text-white p-3 rounded-2xl hover:bg-green-700 transition-all duration-200"
            style={{ width: "50%", marginLeft: "25%" }}
            onClick={saveAttendance}
          >
            حفظ الحضور
          </button>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default TeacherAttendance;
