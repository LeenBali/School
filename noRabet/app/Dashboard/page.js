"use client";
import React, { useState, useEffect } from "react";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample data for pie chart - Students attendance by grade
const pieData = [
  { name: "أول ثانوي", value: 45, fill: "#0088FE" },
  { name: "ثاني ثانوي", value: 35, fill: "#00C49F" },
  { name: "بكالوريا", value: 20, fill: "#FFBB28" },
];

// Sample data for synchronized line charts
const lineData = [
  { name: "أول ثانوي", uv: 200, pv: 240, amt: 240 },
  { name: "الثاني ثانوي", uv: 300, pv: 139, amt: 221 },
  { name: "البكالوريا", uv: 200, pv: 980, amt: 229 },
];

const MyPie = () => (
  <Pie
    data={pieData}
    dataKey="value"
    nameKey="name"
    outerRadius="80%"
    innerRadius="60%"
    isAnimationActive={false}
  />
);

const Page = () => {
  const [chartWidth, setChartWidth] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartWidth(350);
      } else if (window.innerWidth < 768) {
        setChartWidth(450);
      } else if (window.innerWidth < 1024) {
        setChartWidth(550);
      } else {
        setChartWidth(650);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total students for percentage
  const totalStudents = pieData.reduce((sum, item) => sum + item.value, 0);

  // تخصيص مظهر الـ Legend - في صف واحد
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul
        className="flex justify-center gap-6 mt-4"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "14px", color: "#333" }}>
              {entry.value}
            </span>
            <span style={{ fontSize: "12px", color: "#666" }}>
              ({pieData.find((d) => d.name === entry.value)?.value})
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Header />
      <div className="mt-14">
        <div className="flex mb-4 gap-3 flex-wrap ">
          <div className="mb-4 ms-12">
            <div
              className="card p-4 rounded-xl shadow w-72 text-center"
              style={{ backgroundColor: "#f6c23e" }}
            >
              <div className="card-body">
                <LibraryBooksRoundedIcon
                  style={{ fontSize: "27px" }}
                  className="text-white"
                />
                <p className="font-bold text-lg mb-1 text-white">عدد المواد</p>
                <p className="mb-0 font-bold text-lg text-white">18</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div
              className="card p-4 rounded-xl w-72 shadow text-center"
              style={{ backgroundColor: "#36b9cc" }}
            >
              <div className="card-body">
                <AccessTimeRoundedIcon
                  style={{ fontSize: "27px" }}
                  className="text-white"
                />
                <p className="font-black text-lg mb-1 text-white">عدد الحصص</p>
                <p className="mb-0 font-black text-lg text-white">12</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div
              className="card p-4 rounded-xl shadow w-72 text-center"
              style={{ backgroundColor: "#1cc88a" }}
            >
              <div className="card-body">
                <PersonIcon
                  style={{ fontSize: "33px" }}
                  className="text-white"
                />
                <p className="font-black text-lg mb-1 text-white">
                  عدد الأساتذة
                </p>
                <p className="mb-0 font-black text-white">25</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div
              className="card p-4 rounded-xl shadow w-72 text-center me-12"
              style={{ backgroundColor: "#4e73df" }}
            >
              <div className="card-body">
                <SchoolIcon
                  style={{ fontSize: "31px" }}
                  className="text-white"
                />
                <p className="font-black text-lg mb-1 text-white">عدد الطلاب</p>
                <p className="mb-0 font-black text-lg text-white">
                  {totalStudents}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="flex gap-5 mt-10 mb-8 px-4">
          {/* Pie Chart Section */}
          <div style={{ width: "460px", marginLeft: "25px" }}>
            <div className="dashboard-card bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="card-header">
                <h3 className="text-center">نسبة توزيع الطلاب</h3>
              </div>
              <div className="chart-wrapper">
                <PieChart width={400} height={280}>
                  <MyPie />
                  <Tooltip formatter={(value) => [`${value} طالب`, "العدد"]} />
                </PieChart>
              </div>
              <div className="custom-legend">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: item.fill,
                        borderRadius: "50%",
                      }}
                    />
                    <span style={{ fontSize: "16px", color: "#333" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line Chart Section */}
          <div style={{ width: "700px" }}>
            <div className="dashboard-card bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="card-header">
                <h3 className="text-center">
                  توزيع الطلاب حسب المرحلة الدراسية
                </h3>
              </div>
              <div className="chart-wrapper">
                <LineChart
                  width={chartWidth}
                  height={350}
                  data={lineData}
                  syncId="synchronizedId"
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                    activeDot={{ r: 8 }}
                    name=" "
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;
