import React, { useState, useMemo } from 'react'
import { useGameStore } from '../store/useGameStore'
import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Activity, Zap, TrendingUp, Info } from 'lucide-react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export function Level4() {
    const { nextLevel } = useGameStore()
    const [fixedCost, setFixedCost] = useState(6000)
    const [variableCost, setVariableCost] = useState(20)
    const [price, setPrice] = useState(50)

    const contribution = price - variableCost
    const bepUnits = contribution > 0 ? Math.ceil(fixedCost / contribution) : 0

    const [message, setMessage] = useState('AGENT: Use the haptics to find your Break-Even Point. Can we lower the risk or is it game over?')

    const chartData = useMemo(() => {
        const labels = Array.from({ length: 11 }, (_, i) => i * 100)

        return {
            labels,
            datasets: [
                {
                    label: 'TOTAL REVENUE',
                    data: labels.map(u => u * price),
                    borderColor: '#ADFF2F',
                    backgroundColor: 'rgba(173, 255, 47, 0.1)',
                    fill: true,
                    tension: 0.1,
                    pointBackgroundColor: '#ADFF2F',
                    pointBorderColor: '#0A0A0A',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 8
                },
                {
                    label: 'TOTAL COST',
                    data: labels.map(u => fixedCost + (u * variableCost)),
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    fill: true,
                    tension: 0.1,
                    pointBackgroundColor: '#FF69B4',
                    pointBorderColor: '#0A0A0A',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 8
                },
            ],
        }
    }, [fixedCost, variableCost, price])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#ffffff',
                    font: { family: 'Space Grotesk', size: 12, weight: 'bold' },
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: '#0A0A0A',
                titleFont: { family: 'Syne', size: 14, weight: 'bold' },
                bodyFont: { family: 'Space Grotesk', size: 12 },
                borderColor: '#ffffff',
                borderWidth: 1,
                padding: 12,
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Space Grotesk' } }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Space Grotesk' } }
            }
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12">
                <div className="bento-card bg-electric-purple/10 border-electric-purple/20 flex flex-col md:flex-row items-center gap-8">
                    <div className="p-6 bg-electric-purple rounded-[2rem] neo-brutal border-white">
                        <Activity className="text-white" size={40} />
                    </div>
                    <div>
                        <h2 className="text-4xl text-white italic underline decoration-cyber-lime decoration-4 underline-offset-8">BREAK-EVEN CLIMB</h2>
                        <p className="text-lg text-gray-400 font-bold uppercase tracking-widest mt-2">{message}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="bento-card bg-white/5 space-y-12">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                        <TrendingUp size={16} /> CONFIGURATION
                    </h3>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-cyber-lime uppercase tracking-widest">Pricing</span>
                                <span className="text-2xl font-black italic">${price}</span>
                            </div>
                            <input
                                type="range" min="30" max="100" value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                                className="w-full relative h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyber-lime"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-hot-pink uppercase tracking-widest">Variable Cost</span>
                                <span className="text-2xl font-black italic">${variableCost}</span>
                            </div>
                            <input
                                type="range" min="10" max="40" value={variableCost}
                                onChange={(e) => setVariableCost(parseInt(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-hot-pink"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Fixed Payload</span>
                                <span className="text-2xl font-black italic">${fixedCost}</span>
                            </div>
                            <input
                                type="range" min="2000" max="8000" step="500" value={fixedCost}
                                onChange={(e) => setFixedCost(parseInt(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                            />
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/10">
                        <div className="bg-cyber-lime p-8 neo-brutal border-midnight text-midnight flex flex-col items-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Break-Even Point</span>
                            <span className="text-6xl font-black italic leading-none">{bepUnits}</span>
                            <span className="text-xs font-black uppercase mt-4">Units Sold</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8">
                <div className="bento-card h-full p-12 flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-white">CVP DATA VIS</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-cyber-lime rounded-full" />
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-hot-pink rounded-full" />
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Cost</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[450px] relative">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-12 flex justify-center py-12">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextLevel}
                    className="neo-button bg-electric-purple text-white border-white px-24 py-8 text-3xl italic font-black"
                >
                    FINALIZE MISSION →
                </motion.button>
            </div>
        </div>
    )
}
