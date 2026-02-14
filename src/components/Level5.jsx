import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Users, Shield, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Rocket, CloudRain, Zap, TrendingDown, Target, ShieldCheck, Flame, Cpu, User } from 'lucide-react'
import { LevelHeader } from './ui/LevelHeader'
import { MentorMessage } from './ui/MentorMessage'

const SCENARIOS = [
    {
        title: 'THE MARKET STORM',
        desc: 'A recession is hitting. Sales will drop 50%. Pick your survival model.',
        salesDrop: 0.50,
        manualMsg: 'Hustle Core was the move. Flexible flavor meant you could downscale instantly.',
        autoMsg: 'The Auto-Stacker build had too much fixed cost baggage. You couldn\'t cut the burn fast enough.'
    },
    {
        title: 'THE BOOM TIMES',
        desc: 'The market is peaking! Volume will double. Which model scales better?',
        salesDrop: -1.0, // Double sales
        manualMsg: 'Scaling labor was expensive. You missed out on massive profits because of high variable costs.',
        autoMsg: 'AUTOMATION W. Your fixed costs stayed low while your volume exploded. High leverage win!'
    }
]

export function Level5({ onComplete }) {
    const { cash, recordMistake } = useGameStore()
    const [currentScenario, setCurrentScenario] = useState(0)
    const scenario = SCENARIOS[currentScenario]
    const [model, setModel] = useState(null)
    const [gameState, setGameState] = useState('decision')
    const models = {
        manual: {
            name: 'HUSTLE CORE',
            fixed: 2000,
            variable: 25,
            icon: <User />,
            description: 'Low fixed overhead. High variable labor. Maximum flexibility for the pivot.'
        },
        automated: {
            name: 'AUTO-STACKER',
            fixed: 6000,
            variable: 5,
            icon: <Cpu />,
            description: 'High fixed automation costs. Tiny variable burn. High leverage, high risk.'
        }
    }

    const [stormResult, setStormResult] = useState(null)

    const runSimulation = (selectedModel) => {
        setModel(selectedModel)
        setGameState('simulating')

        setTimeout(() => {
            const dropAmount = scenario.salesDrop
            const originalSales = 400
            const currentSales = originalSales * (1 - dropAmount)
            const price = 50

            const config = models[selectedModel]
            const revenue = currentSales * price
            const totalVarCost = currentSales * config.variable
            const contribution = revenue - totalVarCost
            const profit = contribution - config.fixed

            const survived = profit > -500 // Adjust threshold
            if (!survived) recordMistake()

            setStormResult({
                sales: currentSales,
                profit,
                survived
            })
            setGameState('result')
        }, 3000)
    }

    return (
        <div className="space-y-8 pb-32">
            <LevelHeader
                icon={Globe}
                title="Phase 5: Market Shock"
                subtitle={scenario.title}
                colorClass="bg-cyber-lime"
                borderColorClass="border-cyber-lime/20"
            />

            <AnimatePresence mode="wait">
                {gameState === 'decision' && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <MentorMessage
                            message="This is the final test of your business model. High fixed costs are risky in a volatile market. Choose your structure wisely."
                            type="info"
                        />

                        <div className="bento-card bg-midnight/50 border-white/10 p-12 text-center max-w-4xl mx-auto">
                            <Rocket className="text-cyber-lime mx-auto mb-6 animate-pulse" size={48} />
                            <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">{scenario.title}</h3>
                            <p className="text-xl text-gray-400 font-bold leading-relaxed">
                                {scenario.desc}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.entries(models).map(([key, config]) => (
                                <motion.div
                                    key={key}
                                    whileHover={{ scale: 1.02 }}
                                    className={`bento-card cursor-pointer group transition-all p-10 flex flex-col justify-between min-h-[450px] ${key === 'automated'
                                        ? 'bg-electric-purple/10 border-electric-purple/30 hover:bg-electric-purple/20'
                                        : 'bg-hot-pink/10 border-hot-pink/30 hover:bg-hot-pink/20'
                                        }`}
                                    onClick={() => setModel(key)}
                                >
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Model Architecture</h4>
                                                <h3 className="text-3xl font-black text-white italic uppercase">{config.name}</h3>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-all">
                                                {key === 'automated' ? <Cpu size={32} /> : <User size={32} />}
                                            </div>
                                        </div>

                                        <p className="text-sm font-bold text-gray-400 leading-relaxed">
                                            {config.desc}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 bg-midnight/50 rounded-3xl border border-white/5">
                                                <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Fixed Cost</span>
                                                <span className="text-2xl font-black text-white">${config.fixed.toLocaleString()}</span>
                                            </div>
                                            <div className="p-6 bg-midnight/50 rounded-3xl border border-white/5">
                                                <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Var Cost</span>
                                                <span className="text-2xl font-black text-white">${config.variable}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); runSimulation(key); }}
                                        className={`mt-12 w-full py-8 text-2xl font-black italic uppercase tracking-widest rounded-full border-4 border-midnight shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${key === 'automated' ? 'bg-electric-purple text-white' : 'bg-hot-pink text-white'
                                            }`}
                                    >
                                        ACTIVATE MODEL →
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {gameState === 'simulating' && (
                    <motion.div
                        key="simulating"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-40 space-y-12 bento-card border-none bg-white/5"
                    >
                        <div className="relative">
                            <CloudRain size={120} className="text-cyber-lime animate-bounce" />
                            <Zap size={64} className="text-electric-purple absolute -top-4 -right-8 animate-pulse" />
                        </div>
                        <p className="text-3xl font-black italic tracking-widest animate-pulse uppercase">Modelling Market Friction...</p>
                    </motion.div>
                )}

                {gameState === 'result' && stormResult && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-12"
                    >
                        <div className={`bento-card border-none p-12 text-center overflow-hidden relative ${stormResult.survived ? 'bg-cyber-lime/10' : 'bg-hot-pink/10'}`}>
                            <div className={`absolute top-0 left-0 w-full h-2 ${stormResult.survived ? 'bg-cyber-lime' : 'bg-hot-pink'}`} />

                            <h3 className={`text-7xl font-black italic mb-6 ${stormResult.survived ? 'text-cyber-lime' : 'text-hot-pink'}`}>
                                {stormResult.survived ? 'SYSTEM RESILIENT' : 'MODEL COLLAPSED'}
                            </h3>

                            <p className="text-3xl font-light text-white mb-12 italic">
                                Net Performance: <span className="font-black underline decoration-4 underline-offset-8">${stormResult.profit.toLocaleString()}</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Market Volatility</p>
                                    <p className="text-3xl font-black text-white italic">-50.0%</p>
                                </div>
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Final Volume</p>
                                    <p className="text-3xl font-black text-white italic">{stormResult.sales.toLocaleString()}</p>
                                </div>
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Operational Deck</p>
                                    <p className="text-3xl font-black text-cyber-lime uppercase italic tracking-tighter">{models[model].name}</p>
                                </div>
                            </div>

                            <div className="mt-12 max-w-3xl mx-auto p-12 bg-white text-midnight neo-brutal border-midnight text-xl font-black leading-tight uppercase italic text-center">
                                "{model === 'automated' ? scenario.autoMsg : scenario.manualMsg}"
                            </div>

                            <div className="flex justify-center pt-12">
                                <button
                                    onClick={() => {
                                        if (currentScenario < SCENARIOS.length - 1) {
                                            setCurrentScenario(currentScenario + 1)
                                            setGameState('decision')
                                            setModel(null)
                                            setStormResult(null)
                                        } else {
                                            const { addScore } = useGameStore.getState()
                                            addScore(3000)
                                            onComplete()
                                        }
                                    }}
                                    className="neo-button bg-cyber-lime text-midnight border-white text-3xl font-black italic px-24 py-10"
                                >
                                    {currentScenario < SCENARIOS.length - 1 ? 'NEXT EVENT →' : 'CONCLUDE SIMULATION →'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
