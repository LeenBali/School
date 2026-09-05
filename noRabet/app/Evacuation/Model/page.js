"use client";
import React, { useState } from "react";

const Page = () => {
  const [subjects, setSubjects] = useState([
    "فقه",
    "التربية الدينية",
    "التربية الرياضية",
    "الرياضيات",
    "العلوم",
    " العقيدة",
    "اللغة الإنجليزية",
    " سيرة النبوية",
    "اللغة العربية",
    "تكنولوجيا المعلومات والاتصالات",
    "لغة الفرنسية",
  ]);

  const [rows, setRows] = useState(
    subjects.map(() => ({
      min: "",
      max: "",
      f1_exam: "",
      f2_exam: "",
      final: "",
    })),
  );

  const updateCell = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };
  const sumColumn = (field) => {
    return rows.reduce((total, row) => {
      const value = parseFloat(row[field]) || 0;
      return total + value;
    }, 0);
  };

  return (
    <div dir="rtl" className="p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div className="text-center pb-4">
          <h1 className="text-3xl font-bold text-teal-600">الجلاء المدرسي</h1>
          <h2 className="text-2xl font-bold text-teal-600">2026 - 2025</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border border-slate-300 rounded-t-lg overflow-hidden mt-4">
          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 ">
              المديرية
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-4  text-sm text-gray-700 outline-none  me-24 font-bold "
              placeholder="حمص"
              readOnly
            />
          </div>

          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border-l border-slate-200 ">
              المدرسة
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-4 text-sm outline-none  transition-colors font-bold text-gray-700"
              placeholder="العلماء"
              readOnly
            />
          </div>

          <div className="flex items-center border border-slate-300 ">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200">
              الصف
            </label>
            <select className="flex-1 h-10 px-2 text-sm outline-none bg-white cursor-pointer text-center">
              <option>العاشر</option>
              <option>الحادي عشر</option>
              <option> البكالوريا</option>
            </select>
          </div>

          <div className="flex border border-slate-300 items-center">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 ">
              الشعبة
            </label>
            <select className="flex-1 h-10 px-2 text-sm outline-none bg-white cursor-pointer text-center">
              <option>الأولى</option>
              <option>الثانية</option>
              <option>الثالثة</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 border-x border border-slate-300 rounded-lg overflow-hidden mt-4 mb-4">
          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border-l border-slate-200 ">
              اسم الطالب
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-4 text-sm outline-none  transition-colors font-bold text-gray-700"
            />
          </div>

          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-3 h-10 flex items-center  justify-center text-xs font-bold text-slate-700 border-l border-slate-200 ">
              اسم الأم
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-2 text-sm outline-none transition-colors text-center"
            />
          </div>

          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-3 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 ">
              المواليد
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-2 text-sm outline-none  transition-colors text-center"
            />
          </div>

          <div className="flex items-center border border-slate-300">
            <label className="bg-slate-100 px-4 h-10 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 whitespace-nowrap ">
              الرقم في السجل العام
            </label>
            <input
              type="text"
              className="flex-1 h-10 px-2 text-sm font-bold  outline-none  transition-colors text-center"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-teal-600 text-white text-center">
                <th
                  rowSpan="2"
                  className="border border-gray-300 p-2 text-sm font-bold align-middle"
                  style={{ width: "125px" }}
                >
                  المادة
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 w-8 text-sm font-bold align-middle"
                >
                  <p style={{ transform: "rotate(-90deg)" }}>الدرجة الدنيا</p>
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 w-8 text-xs font-bold align-middle"
                >
                  <p style={{ transform: "rotate(-90deg)" }}> الدرجة العظمى</p>
                </th>
                <th
                  colSpan="3"
                  className="border border-gray-300 text-sm font-bold p-3"
                >
                  الفصل الأول
                </th>
                <th
                  colSpan="3"
                  className="border border-gray-300 text-sm font-bold p-3"
                >
                  الفصل الثاني
                </th>
                <th
                  rowSpan="2"
                  className="border border-gray-300 w-8 text-sm font-bold align-middle"
                >
                  المحصلة
                </th>
              </tr>
              <tr className="bg-teal-600 text-white text-center">
                <th className="border border-gray-300 w-16 p-3 text-sm font-bold">
                  <p>درجة</p>
                  <p>الأعمال</p>
                </th>
                <th className="border border-gray-300 w-16 p-1 text-sm font-bold">
                  <p>درجة</p>
                  <p>الامتحان</p>
                </th>
                <th className="border border-gray-300 w-16 p-1 text-sm font-bold">
                  محصلة
                </th>
                <th className="border border-gray-300 w-16 p-3 text-sm font-bold">
                  <p>درجة</p>
                  <p>الأعمال</p>
                </th>
                <th className="border border-gray-300 w-16 p-1 text-sm font-bold">
                  <p>درجة</p>
                  <p>الامتحان</p>
                </th>
                <th className="border border-gray-300 w-8 text-sm font-bold align-middle">
                  محصلة
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-300 p-3 text-center text-sm font-medium">
                    {subject}
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      value={rows[index].min}
                      onChange={(e) => updateCell(index, "min", e.target.value)}
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      value={rows[index].max}
                      onChange={(e) => updateCell(index, "max", e.target.value)}
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  {/* الفصل الأول */}
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      value={rows[index].f1_exam}
                      onChange={(e) =>
                        updateCell(index, "f1_exam", e.target.value)
                      }
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>

                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      value={rows[index].f2_exam}
                      onChange={(e) =>
                        updateCell(index, "f2_exam", e.target.value)
                      }
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      className="w-full h-full text-center border-none focus:ring-1 focus:ring-gray-300 text-sm outline-none bg-transparent"
                    />
                  </td>

                  <td className="border border-gray-300 p-0 h-10">
                    <input
                      type="text"
                      value={rows[index].final}
                      onChange={(e) =>
                        updateCell(index, "final", e.target.value)
                      }
                      className="w-full h-full text-center border-none focus:ring-1 "
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold ">
                <td className="border border-gray-300 p-2 text-center bg-teal-600 text-white text-sm">
                  المجموع
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm">
                  {sumColumn("min")}
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm">
                  {sumColumn("max")}
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm"></td>
                <td className="border border-gray-300 p-2 text-center text-sm">
                  {sumColumn("f1_exam")}
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm"></td>
                <td className="border border-gray-300 p-2 text-center text-sm"></td>
                <td className="border border-gray-300 p-2 text-center text-sm">
                  {sumColumn("f2_exam")}
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm"></td>
                <td className="border border-gray-300 p-2 text-center text-sm font-bold">
                  {sumColumn("final")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className=" flex justify-center mt-4">
          <button className=" font-bold res p-3 w-96 bg-gray-100">
            النتيجة النهائية
          </button>
          <button className=" font-bold border  res w-18"> </button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-right">
            <p className="font-bold text-gray-700">اسم المدير:</p>
            <p className="font-bold text-lg"> لين بالي</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
