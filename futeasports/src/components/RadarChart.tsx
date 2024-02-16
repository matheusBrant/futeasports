import { type RouterOutputs } from "@/utils/api";
import { useEffect, useState } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

type Player = RouterOutputs["player"]["getByName"][number]

export const ReRadarChart = (props: { player1: Player, player2: Player }) => {
  const [aspect, setAspect] = useState<number>(0.7);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAspect(0.7);
      } else {
        setAspect(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      subject: "Finalização",
      A: props.player1.shooting,
      B: props.player2.shooting,
      fullMark: 97,
    },
    {
      subject: "Passe",
      A: props.player1.passing,
      B: props.player2.passing,
      fullMark: 97,
    },
    {
      subject: "Defesa",
      A: props.player1.defending,
      B: props.player2.defending,
      fullMark: 97,
    },
    {
      subject: "Físico",
      A: props.player1.physicality,
      B: props.player2.physicality,
      fullMark: 97,
    },
    {
      subject: "Drible",
      A: props.player1.dribbling,
      B: props.player2.dribbling,
      fullMark: 97,
    },
    {
      subject: "Ritmo",
      A: props.player1.pace,
      B: props.player2.pace,
      fullMark: 97,
    },
  ];
  return (
    <ResponsiveContainer width="100%" aspect={aspect}>
      <RadarChart outerRadius={90} width={600} height={270} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis display="none" angle={30} domain={[20, 97]} />
        <Radar name={props.player1.commonName ?? props.player1.name} dataKey="A" stroke="#32cd32" fill="#90ee90" fillOpacity={0.7} />
        <Radar name={props.player2.commonName ?? props.player2.name} dataKey="B" stroke="#191970" fill="#00bfff" fillOpacity={0.3} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
export default ReRadarChart;