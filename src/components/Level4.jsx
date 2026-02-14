import React, { useState, useEffect, useMemo } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Target,
    TrendingUp,
    Zap,
    AlertTriangle,
    Play,
    BarChart2,
    ShieldCheck,
    Activity,
    Info,
    AlertCircle,
    Flame
} from 'lucide-react'
import { playSound } from '../utils/sounds'
import { LevelHeader } from './ui/LevelHeader'
import { MentorMessage } from './ui/MentorMessage'
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

const MARKET_EVENTS = [
    { name: 'Supply Chain Crunch', varEffect: 10, fixedEffect: 0, msg: 'Variable costs spike by $10!' },
    { name: 'Rent Hike', varEffect: 0, fixedEffect: 2000, msg: 'Fixed costs jumped! Pay up!' },
    { name: 'Viral Trend', varEffect: 5, fixedEffect: 0, msg: 'Demand is high, but so is shipping!' },
    { name: 'Automation Glitch', varEffect: 0, fixedEffect: 1000, msg: 'Maintenance costs increased.' },
    { name: 'Market Calm', varEffect: -5, fixedEffect: -500, msg: 'Operations stabilized. Costs down.' }
]

export function Level4({ onComplete }) {
    const { recordMistake } = useGameStore()
    const [config, setConfig] = useState({
        fixedCosts: 4000,
        variableCost: 20,
        sellingPrice: 50
    })
    const [stability, setStability] = useState(100)
    const [currentEvent, setCurrentEvent] = useState(null)
    const [events, setEvents] = useState([])
    const [isChaosActive, setIsChaosActive] = useState(false)

    // Missing States Fixed
    const [gameState, setGameState] = useState('idle') // idle, active, result
    const [currentSales, setCurrentSales] = useState(0)
    const [targetSales, setTargetSales] = useState(1000)
    const [history, setHistory] = useState([])
    const [totalProfit, setTotalProfit] = useState(0)
    const [simInterval, setSimInterval] = useState(null)

    const startSim = () => {
        setGameState('active')
        setIsChaosActive(true)
        setCurrentSales(0)
        setStability(100)
        setHistory([])

        // Simulation Loop
        const interval = setInterval(() => {
            setCurrentSales(prev => {
                const newSales = prev + Math.floor(Math.random() * 50) + 10

                // Calculate snapshot for history
                const currentRevenue = newSales * config.sellingPrice
                const currentFixed = config.fixedCosts
                const currentVar = newSales * config.variableCost
                const currentProfit = currentRevenue - currentFixed - currentVar

                setHistory(prevHistory => [...prevHistory, { sales: newSales, profit: currentProfit }].slice(-20)) // Keep last 20 frames

                if (newSales >= targetSales) {
                    clearInterval(interval)
                    finishSim(targetSales)
                    return targetSales
                }
                return newSales
            })
        }, 100)
        setSimInterval(interval)
    }

    const finishSim = (finalSales) => {
        setIsChaosActive(false)
        setGameState('result')
        const revenue = finalSales * config.sellingPrice
        const totalFixed = config.fixedCosts // Simplified for level scope
        const totalVar = finalSales * config.variableCost
        setTotalProfit(revenue - totalFixed - totalVar)
    }

    // Cleanup
    useEffect(() => {
        return () => {
            if (simInterval) clearInterval(simInterval)
        }
    }, [simInterval])

    const contribution = config.sellingPrice - config.variableCost
    const bepUnits = contribution > 0 ? Math.ceil(config.fixedCosts / contribution) : 9999

    // Stability logic
    useEffect(() => {
        if (!isChaosActive) return

        const timer = setInterval(() => {
            // If BEP is too high (low margin of safety), stability drops
            if (bepUnits > 600 || contribution <= 0) {
                setStability(s => Math.max(0, s - 5))
                playSound('fail')
            } else {
                setStability(s => Math.min(100, s + 2))
            }

            // Random market event every 8 seconds
            if (Math.random() > 0.8) {
                const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)]
                setConfig(prev => ({
                    ...prev,
                    fixedCosts: Math.min(8000, Math.max(2000, prev.fixedCosts + event.fixedEffect)),
                    variableCost: Math.min(40, Math.max(10, prev.variableCost + event.varEffect))
                }))
                setEvents(prev => [...prev, { type: 'market', msg: event.msg }].slice(-10))
                setCurrentEvent(event)
                playSound('success')
                setTimeout(() => setCurrentEvent(null), 4000)
            }
        }, 3000)

        return () => clearInterval(timer)
    }, [isChaosActive, bepUnits, contribution])

    // Game Over check
    useEffect(() => {
        if (stability <= 0) {
            recordMistake()
            setStability(20) // Reset a bit to let them try again
            setIsChaosActive(false)
        }
    }, [stability, recordMistake])

    const chartData = useMemo(() => {
        const labels = Array.from({ length: 11 }, (_, i) => i * 100)
        return {
            labels,
            datasets: [
                {
                    label: 'TOTAL REVENUE',
                    data: labels.map(u => u * config.sellingPrice),
                    borderColor: '#ADFF2F',
                    backgroundColor: 'rgba(173, 255, 47, 0.1)',
                    fill: true,
                    tension: 0.1,
                    pointBackgroundColor: '#ADFF2F',
                    pointBorderColor: '#0A0A0A',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                },
                {
                    label: 'TOTAL COST',
                    data: labels.map(u => config.fixedCosts + (u * config.variableCost)),
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    fill: true,
                    tension: 0.1,
                    pointBackgroundColor: '#FF69B4',
                    pointBorderColor: '#0A0A0A',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                },
            ],
        }
    }, [config])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: { color: '#ffffff', font: { family: 'Space Grotesk', weight: 'bold' } }
            },
        },
        scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.5)' } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.5)' } }
        }
    }

    const safetyMargin = currentSales > bepUnits
        ? ((currentSales - bepUnits) / currentSales) * 100
        : 0

    return (
        <div className="space-y-8">
            <LevelHeader
                icon={Zap}
                title="Phase 4: Chaos BEP"
                subtitle="The High-Frequency Market"
                colorClass="bg-electric-purple"
                borderColorClass="border-electric-purple/20"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <MentorMessage
                        message={currentSales < bepUnits
                            ? "Core Stability Critical. You are operating below the Break-Even Point. Increase volume or cut costs immediately."
                            : "Profit territory secured. Optimize your Margin of Safety to withstand market volatility."}
                        type={currentSales < bepUnits ? "warning" : "success"}
                    />
                </div>

                {/* Simulation Area */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bento-card bg-midnight border-2 border-white/10 h-[400px] relative overflow-hidden p-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,255,47,0.05)_0%,transparent_100%)]" />

                        <div className="relative h-full p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">REAL-TIME MARKET FEED</h3>
                                    <div className="flex items-center gap-2 text-cyber-lime">
                                        <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse" />
                                        <span className="text-sm font-black italic">H-FREQ STREAM ACTIVE</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-center">
                                        <div className="text-[8px] text-gray-500 font-black uppercase">Core Stability</div>
                                        <div className="text-xl font-black italic text-white">{stability}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex items-end gap-1 px-4">
                                {history.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(h.sales / targetSales) * 100}%` }}
                                        className={`flex-1 rounded-t-sm ${h.profit >= 0 ? 'bg-cyber-lime' : 'bg-hot-pink'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {gameState === 'idle' && (
                            <div className="absolute inset-0 bg-midnight/80 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center">
                                <Activity size={64} className="text-cyber-lime mb-6 animate-bounce" />
                                <h4 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-4">SYSTEM READY</h4>
                                <p className="text-gray-400 font-bold mb-8 max-w-sm">
                                    The market moves in microseconds. Master the Break-Even Point or face complete liquidation.
                                </p>
                                <button
                                    onClick={startSim}
                                    className="px-12 py-6 bg-cyber-lime text-midnight font-black text-2xl italic rounded-full border-4 border-white shadow-[0_0_30px_rgba(173,255,47,0.5)] hover:scale-105 transition-all flex items-center gap-4"
                                >
                                    <Play fill="currentColor" /> INITIATE STREAM
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bento-card bg-white/5 border-white/10 p-6 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <span>MARGIN OF SAFETY</span>
                                <span className={safetyMargin > 20 ? 'text-cyber-lime' : 'text-hot-pink'}>{safetyMargin.toFixed(1)}%</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                <motion.div
                                    className="h-full bg-cyber-lime rounded-full shadow-[0_0_10px_rgba(173,255,47,0.5)]"
                                    animate={{ width: `${safetyMargin}%` }}
                                />
                            </div>
                            <p className="text-[9px] text-gray-500 italic leading-tight">
                                This is your "cushion" before sales hit the Break-Even point. High is good.
                            </p>
                        </div>
                        <div className="bento-card border-none bg-hot-pink/10 p-6 flex flex-col justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-hot-pink">TARGET BEP</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white italic">{Math.round(bepUnits)}</span>
                                <span className="text-xs font-bold text-gray-500">UNITS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls & Log */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bento-card bg-white/5 border-white/10 space-y-6">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">STRATEGY LAYER</h3>

                        <div className="space-y-8">
                            {[
                                { label: 'Selling Price', key: 'sellingPrice', min: 20, max: 100, step: 1, color: 'bg-cyber-lime' },
                                { label: 'Variable Cost', key: 'variableCost', min: 5, max: 40, step: 1, color: 'bg-hot-pink' },
                                { label: 'Fixed Costs', key: 'fixedCosts', min: 1000, max: 8000, step: 100, color: 'bg-electric-purple' }
                            ].map(control => (
                                <div key={control.key} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{control.label}</label>
                                        <span className="text-xl font-black text-white italic">
                                            {control.key === 'fixedCosts' ? `$${config[control.key]}` : `$${config[control.key].toFixed(2)}`}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={control.min}
                                        max={control.max}
                                        step={control.step}
                                        value={config[control.key]}
                                        onChange={(e) => setConfig({ ...config, [control.key]: parseFloat(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bento-card bg-midnight border-white/5 p-4 h-[200px] overflow-y-auto font-mono text-[10px] space-y-1">
                        <div className="text-gray-600 border-b border-white/5 pb-2 mb-2 uppercase font-black">System Log</div>
                        {[...events].reverse().map((e, i) => (
                            <div key={i} className={`flex gap-2 ${e.type === 'market' ? 'text-cyber-lime' : 'text-hot-pink'}`}>
                                <span className="opacity-30">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}]</span>
                                <span className="font-bold">{e.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === 'result' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-12 fixed inset-0 z-[60] bg-midnight/90 backdrop-blur-2xl flex items-center justify-center p-8"
                        >
                            <div className="max-w-xl w-full bento-card border-none bg-white text-midnight p-12 neo-brutal shadow-[20px_20px_0px_0px_rgba(173,255,47,1)] flex flex-col items-center gap-8">
                                <h3 className="text-6xl font-black italic text-center uppercase tracking-tighter leading-none">
                                    {stability > 0 ? 'SYSTEM STABLE' : 'LIQUIDATED'}
                                </h3>
                                <div className="grid grid-cols-2 gap-8 w-full">
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">Final Profit</span>
                                        <p className="text-4xl font-black italic">${totalProfit.toLocaleString()}</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">Core Stability</span>
                                        <p className="text-4xl font-black italic">{stability}%</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-center italic opacity-70">
                                    {stability > 0
                                        ? "You navigated the market chaos with precision. Break-Even mastery achieved."
                                        : "Negative margin exposure collapsed the core. Study the break-even math again."}
                                </p>
                                <button
                                    onClick={() => {
                                        if (stability > 0) {
                                            const { addScore } = useGameStore.getState()
                                            addScore(1000)
                                            onComplete()
                                        } else {
                                            setGameState('idle')
                                        }
                                    }}
                                    className="w-full py-8 bg-midnight text-white font-black text-2xl italic uppercase tracking-widest border-4 border-midnight hover:bg-white hover:text-midnight transition-all"
                                >
                                    {stability > 0 ? 'PROCEED TO FINAL →' : 'RETRY MISSION'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
