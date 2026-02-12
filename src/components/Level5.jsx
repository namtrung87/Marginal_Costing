import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, Zap, TrendingDown, Target, ShieldCheck, Flame, Cpu, User } from 'lucide-react'

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
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="bento-card border-none bg-hot-pink/10 ring-1 ring-hot-pink/20 py-12 flex flex-col items-center text-center">
                <Flame className="text-hot-pink mb-6 animate-pulse" size={64} />
                <h2 className="text-5xl lg:text-7xl font-black italic text-white leading-none tracking-tighter uppercase">{scenario.title}</h2>
                <p className="text-xl text-gray-400 uppercase tracking-[0.2em] mt-4 font-bold">{scenario.desc}</p>
            </div>

            <AnimatePresence mode="wait">
                {gameState === 'decision' && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                        {Object.entries(models).map(([key, config]) => (
                            <motion.div
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                className="bento-card bg-white/5 border-white/10 hover:border-cyber-lime transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="p-6 bg-white/5 rounded-[2rem] text-cyber-lime">
                                            {config.icon}
                                        </div>
                                        <h4 className="text-4xl font-black italic text-white tracking-widest">{config.name}</h4>
                                    </div>
                                    <p className="text-lg text-gray-400 font-light leading-relaxed">{config.description}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-midnight/50 rounded-3xl border border-white/5">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Fixed Cost</span>
                                            <span className="text-2xl font-black text-white">${config.fixed}</span>
                                        </div>
                                        <div className="p-6 bg-midnight/50 rounded-3xl border border-white/5">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Variable Cost</span>
                                            <span className="text-2xl font-black text-white">${config.variable}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => runSimulation(key)}
                                    className="neo-button bg-electric-purple text-white border-white mt-12 w-full py-8 text-xl"
                                >
                                    EXECUTE MODEL →
                                </button>
                            </motion.div>
                        ))}
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
                                {stormResult.survived ? 'YOU SURVIVED' : 'BANKRUPT'}
                            </h3>

                            <p className="text-3xl font-light text-white mb-12">
                                Net Flow during crash: <span className="font-black italic underline decoration-4 underline-offset-8">${stormResult.profit.toFixed(2)}</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sales Shock</p>
                                    <p className="text-2xl font-black text-white">-50%</p>
                                </div>
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Units Sold</p>
                                    <p className="text-2xl font-black text-white">{stormResult.sales}</p>
                                </div>
                                <div className="p-8 bg-midnight/50 rounded-[2rem] border border-white/10">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Strategy</p>
                                    <p className="text-2xl font-black text-white uppercase italic">{model}</p>
                                </div>
                            </div>

                            <div className="mt-12 max-w-3xl mx-auto p-12 bg-white text-midnight neo-brutal border-midnight text-xl font-bold leading-tight uppercase italic">
                                {model === 'automated' ? scenario.autoMsg : scenario.manualMsg}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => {
                                        if (currentScenario < SCENARIOS.length - 1) {
                                            setCurrentScenario(currentScenario + 1)
                                            setGameState('decision')
                                            setModel(null)
                                            setStormResult(null)
                                        } else {
                                            onComplete()
                                        }
                                    }}
                                    className="neo-button bg-cyber-lime text-midnight border-midnight text-2xl font-black italic px-24 py-10"
                                >
                                    {currentScenario < SCENARIOS.length - 1 ? 'NEXT EVENT →' : 'Finalize Career →'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    )
}
