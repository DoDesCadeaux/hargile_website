'use client'

import {Cell, Pie, PieChart} from 'recharts'

const GaugeChart = ({score = 0, label = 'Score'}) => {
    const COLORS = ['#EF4444', '#F59E0B', '#22C55E'] // red, orange, green
    const angle = (score / 100) * 180

    const data = [
        {name: 'Bad', value: 50},
        {name: 'Average', value: 40},
        {name: 'Good', value: 10},
    ]

    return (
        <div className="flex flex-col items-center">
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                    ))}
                </Pie>
                {/* Overlay needle */}
                <circle cx="100" cy="100" r="4" fill="#fff"/>
                <line
                    x1="100"
                    y1="100"
                    x2={100 + 70 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
                    y2={100 - 70 * Math.sin(Math.PI - (angle * Math.PI) / 180)}
                    stroke="#fff"
                    strokeWidth="4"
                />
            </PieChart>
            <p className={"text-lg text-white font-semibold"}>{label}: <span className={`font-bold ${
                score >= 90 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-500'
            }`}>{score}%</span></p>
        </div>
    )
}

export default GaugeChart