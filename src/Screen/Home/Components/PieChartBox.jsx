import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PieChartBox = ({data}) => {
  if (!data) {
    return null;
  }

  const pieChartData = [
    { name: "Applied", value: data.applied_gatepass_count, color: "#0088FE" },
    { name: "Processing",value: data.processing_gatepass_count,color: "#00C49F" },
    { name: "Approved", value: data.approved_gatepass_count, color: "#4CAF50" },
    { name: "Rejected", value: data.rejected_gatepass_count, color: "#FF5A5F" },
  ];

  return (
    <div className="h-full flex flex-col justify-around md:justify-between">
      <h1 className="text-2xl font-bold">Gate Pass Data</h1>
      <div className="flex justify-center items-center">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: "transparent", border: "5px" }} />
            <Pie
              data={pieChartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {pieChartData.map((item,i) => (
                <Cell key={i} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-wrap flex justify-start items-center gap-5 md:gap-7 text-xs">
        {
          pieChartData.map((item,i)=>(   
            <div key={i} className="flex flex-row md:flex-col gap-[6px] items-center">
                <div className="flex items-center gap-1">
                  <div style={{backgroundColor:item.color,width:"10px", height:"10px", borderRadius:"50%"}}/>
                  <span>{item.name}:</span>
                </div>
                <span>{item.value }</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PieChartBox;
