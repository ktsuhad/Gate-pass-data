import React, { useEffect, useState } from "react";
import axios from "axios";

import PieChartBox from "./Components/PieChartBox";
import LineChartBox from "./Components/LineChart";
import Barchartbox from "./Components/Barchart";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar";

const GatePassData = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://conext.in/gatePass/api/gate_pass_counts/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);


  const chartData = [
    {
      name: "Applied",
      data: [
        {
          count: 0,
        },
        {
          count: data ? data.applied_gatepass_count : 0,
        },
      ],
      color: "#0088FE",
    },
    {
      name: "Processing",
      data: [
        {
          count: 0,
        },
        {
          count: data ? data.processing_gatepass_count : 0,
        },
      ],
      color: "#00C49F",
    },
    {
      name: "Approved",
      data: [
        {
          count: 0,
        },
        {
          count: data ? data.approved_gatepass_count : 0,
        },
      ],
      color: "#4CAF50",
    },
    {
      name: "Rejected",
      data: [
        {
          count: 0,
        },
        {
          count: data ? data.rejected_gatepass_count : 0,
        },
      ],
      color: "#FF5A5F",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-2 sm:px-8 md:px-12 lg:px-16 mt-5">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4 auto-rows-[180px]">
          <div className="p-5 rounded-lg border border-gray-400 row-span-2 md:row-span-4 col-span-2 md:col-span-1 flex flex-col gap-5">
            {chartData?.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-gray-400"
                style={{ background: item.color, color: "#fff" }}
              >
                <h2>{`${item.name}:${item.data[1].count}`}</h2>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-lg border border-gray-400 col-span-2 sm:col-span-1">
            <LineChartBox lineChartData={chartData[0]} />
          </div>
          <div className="p-5 rounded-lg border border-gray-400 col-span-2 sm:col-span-1">
            <LineChartBox lineChartData={chartData[1]} />
          </div>
          <div className="p-5 rounded-lg border border-gray-400 row-span-3 col-span-2 md:col-span-1 md:row-span-4">
            <PieChartBox data={data} />
          </div>
          <div className="p-5 rounded-lg border border-gray-400 col-span-2 sm:col-span-1">
            <LineChartBox lineChartData={chartData[2]} />
          </div>
          <div className="p-5 rounded-lg border border-gray-400 col-span-2 sm:col-span-1">
            <LineChartBox lineChartData={chartData[3]} />
          </div>
          <div className="p-5 rounded-lg border border-gray-400 col-span-2 row-span-2">
            <Barchartbox data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatePassData;
