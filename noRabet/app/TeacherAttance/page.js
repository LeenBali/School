"use client";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Link from "next/link";
const Page = () => {
  const cards = [
    {
      id: 1,
      title: "الصف الأول الثانوي ",
      desc: "عدد الأساتذة في هذه المرحلة :12",
    },
    {
      id: 2,
      title: "الصف الاول الثانوي ",
      desc: "   عدد  الأساتذة في هذه المرحلة :40",
    },

    {
      id: 5,
      title: "الصف الثالث ثانوي ",
      desc: " عدد الأساتذة لهذه المرحلة:20",
    },
  ];
  return (
    <>
      <Header />

      <div className=" p-8 mt-12" style={{ marginRight: "300px" }}>
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl p-8 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 text-center">
                  <h5 className="font-bold text-xl mb-3 text-gray-500">
                    {card.title}
                  </h5>
                  <p className="text-gray-600 mb-4">{card.desc}</p>
                  <Link href="DetailsAttance">
                    {" "}
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      وضع الحضور
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Page;
