"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../Header";
import Sidebar from "../Sidebar";

const StudentAttendanceDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionName = searchParams.get("section");

  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadAllStudentsAttendance = () => {
      setLoading(true);

      const storedStudents = JSON.parse(
        localStorage.getItem("students") || "[]",
      );

      const sectionStudents = storedStudents.filter(
        (student) =>
          student.distributed === true && student.section === sectionName,
      );

      const allAttendanceRecords = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("attendance_")) {
          const attendanceData = JSON.parse(localStorage.getItem(key));
          if (attendanceData.section === sectionName) {
            allAttendanceRecords.push(attendanceData);
          }
        }
      }

      const studentsStats = sectionStudents.map((student) => {
        let fullName =
          student.fullName || `${student.name} ${student.lastname}` || "طالب";

        let present = 0;
        let absent = 0;
        const attendanceDetails = [];

        allAttendanceRecords.forEach((record) => {
          const studentRecord = record.students?.find(
            (s) => s.id == student.id || s.name === fullName,
          );

          if (studentRecord) {
            if (studentRecord.attendance === true) {
              present++;
            } else if (studentRecord.attendance === false) {
              absent++;
            }
            attendanceDetails.push({
              date: record.date,
              attendance: studentRecord.attendance,
              section: record.section,
            });
          }
        });

        attendanceDetails.sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
          id: student.id,
          name: fullName,
          present: present,
          absent: absent,
          total: present + absent,
          details: attendanceDetails,
        };
      });

      studentsStats.sort((a, b) => a.name.localeCompare(b.name));
      setStudentsAttendance(studentsStats);
      setLoading(false);
    };

    if (sectionName) {
      loadAllStudentsAttendance();
    }
  }, [sectionName]);

  const filteredStudents = studentsAttendance.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // حساب إحصائيات الشعبة الكلية للعرض في الكاردات العلوية
  const totalPresentCount = studentsAttendance.reduce(
    (sum, s) => sum + s.present,
    0,
  );
  const totalAbsentCount = studentsAttendance.reduce(
    (sum, s) => sum + s.absent,
    0,
  );

  if (!sectionName) {
    return (
      <>
        <Header />
        <div
          className="p-16 m-auto"
          style={{ marginRight: "300px", width: "1185px" }}
        >
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
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
        className="p-8 m-auto h-auto bg-white min-h-screen"
        style={{ marginRight: "300px", width: "1185px" }}
      >
        <div className="rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 rounded-t-2xl border border-b-0 border-gray-200">
            <h1 className="text-right text-xl font-bold text-gray-700">
              {sectionName}
            </h1>
          </div>

          {/* حقل البحث */}
          <div className="p-6 pb-4 border-x border-gray-200">
            <input
              type="text"
              className="form-control rounded-xl p-3 w-full border border-gray-300 shadow-sm focus:outline-none"
              placeholder="ابحث عن اسم الطالب"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ textAlign: "right" }}
            />
          </div>

          {/* جدول الطلاب */}
          <div className="p-6 border border-t-0 border-gray-200 rounded-b-2xl shadow-sm">
            {loading ? (
              <div className="text-center py-8 text-gray-500 font-bold">
                جاري تحميل البيانات...
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>لا توجد بيانات لهذا البحث</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-4 text-center font-bold text-gray-700">
                        أيام الغياب
                      </th>
                      <th className="border border-gray-300 p-4 text-center font-bold text-gray-700">
                        أيام الحضور
                      </th>
                      <th className="border border-gray-300 p-4 text-center font-bold text-gray-700">
                        اسم الطالب
                      </th>
                      <th className="border border-gray-300 p-4 text-center font-bold text-gray-700">
                        #
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr
                        key={student.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                        style={{ transition: "background-color 0.3s" }}
                      >
                        <td className="border border-gray-300 p-4 text-center">
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-black">
                            {student.absent}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-4 text-center">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-black">
                            {student.present}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-gray-800">
                          {student.name}
                        </td>
                        <td className="border border-gray-300 p-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8  text-gray-700 rounded-full text-sm font-bold">
                            {idx + 1}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default StudentAttendanceDetails;
