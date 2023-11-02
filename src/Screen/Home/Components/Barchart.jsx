import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const Barchartbox = ({ data }) => {
  if (!data) {
    return null;
  }

  const BarChartData = [
    { name: "Applied", count: data.applied_gatepass_count, color: "#0088FE" },
    { name: "Processing", count: data.processing_gatepass_count, color: "#00C49F" },
    { name: "Approved", count: data.approved_gatepass_count, color: "#4CAF50" },
    { name: "Rejected", count: data.rejected_gatepass_count, color: "#FF5A5F" },
  ];

  return (
    <div className="w-[100%] h-[100%]">
      <h1 className="text-2xl font-bold">Gate Pass Data (Bars)</h1>
      <div className="w-full h-full">
        <ResponsiveContainer width="70%" height="97%">
          <BarChart data={BarChartData}>
            <XAxis dataKey="name" />
            <Tooltip
              contentStyle={{ background: "transparent", border: "none" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="count" fill="color">
              {BarChartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Barchartbox;
