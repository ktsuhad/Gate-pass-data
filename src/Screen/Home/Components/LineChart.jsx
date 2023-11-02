import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const LineChartBox = ({ lineChartData }) => {
  return (
    <div className="flex justify-center h-full">
      <div className="flex-[2] flex flex-col justify-between gap-4">
        <span className="text-sm font-bold text-center md:text-start">
          {lineChartData.name}
        </span>
        <div className="w-full h-full">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={lineChartData.data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 50 }}
              />
              <XAxis dataKey={lineChartData.name} />
              <YAxis/>
              <Line
                type="monotone"
                dataKey="count"
                stroke={lineChartData.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChartBox;
