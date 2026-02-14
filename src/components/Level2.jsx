import React, { useState, useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Info, Eye, Smile, Angry, Handshake, Briefcase } from 'lucide-react'
import { playSound } from '../utils/sounds'
import { LevelHeader } from './ui/LevelHeader'
import { MentorMessage } from './ui/MentorMessage'

const SCENARIOS = [
    {
        id: 1,
        title: 'The Hustle: Trip 101',
        description: 'A local school wants 100 cups for a trip. They offer $0.60/cup. Variable cost is $0.20.',
        units: 100,
        offerPrice: 0.60,
        variableCost: 0.20,
        normalPrice: 1.50,
        patienceDecay: 15, // Higher = harder
        hint: 'As long as price > variable cost ($0.20), any gain is contribution.'
    },
    {
        id: 2,
        title: 'The Lowball: Sus Offer',
        description: 'A shady vendor wants 50 cups for $0.15/cup. Your variable cost is $0.20/cup.',
        units: 50,
        offerPrice: 0.15,
        variableCost: 0.20,
        normalPrice: 1.50,
        patienceDecay: 25,
        hint: 'This price is below your variable cost. You LOSE money on every cup.'
    }
]

export function Level2({ onComplete }) {
    const { addCash, recordMistake } = useGameStore()
    const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0)
    const scenario = SCENARIOS[currentScenarioIdx]

    // Negotiation State
    const [negotiationPrice, setNegotiationPrice] = useState(scenario.offerPrice)
    const [patience, setPatience] = useState(100)
    const [gameState, setGameState] = useState('briefing') // 'briefing', 'negotiating', 'result'
    const [result, setResult] = useState(null) // 'success', 'walked', 'failed'
    const [message, setMessage] = useState('Analyze the request. Can we squeeze more profit?')

    const handleNegotiate = (delta) => {
        const newPrice = Math.max(0, negotiationPrice + delta)
        setNegotiationPrice(newPrice)

        // Patience logic: increasing price drops patience
        if (delta > 0) {
            const decay = (newPrice / scenario.offerPrice) * scenario.patienceDecay
            setPatience(p => Math.max(0, p - decay))
        }

        playSound('click')
    }

    const handleCommit = () => {
        // Chance of walking away based on patience
        const walkProbability = (100 - patience) / 100
        const randomFactor = Math.random()

        if (randomFactor < walkProbability && patience < 80) {
            setResult('walked')
            setGameState('result')
            setMessage("THEY WALKED! You pushed too hard and lost the deal.")
            playSound('fail')
            recordMistake('marginal')
        } else {
            const isProfitable = negotiationPrice > scenario.variableCost
            if (isProfitable) {
                const totalContribution = scenario.units * (negotiationPrice - scenario.variableCost)
                addCash(totalContribution)
                setResult('success')
                setMessage(`DEAL SEALED! Secured $${totalContribution.toFixed(2)} in total contribution.`)
                playSound('success')
            } else {
                setResult('failed')
                setMessage("DEAL FAILED! You sold below variable cost. You're losing money on every unit.")
                playSound('fail')
                recordMistake('marginal')
            }
            setGameState('result')
        }
    }

    const nextScenario = () => {
        if (currentScenarioIdx < SCENARIOS.length - 1) {
            const nextIdx = currentScenarioIdx + 1
            setCurrentScenarioIdx(nextIdx)
            setNegotiationPrice(SCENARIOS[nextIdx].offerPrice)
            setPatience(100)
            setGameState('briefing')
            setResult(null)
            setMessage('Next inquiry incoming...')
        } else {
            const { addScore } = useGameStore.getState()
            addScore(800)
            onComplete()
        }
    }

    return (
        <div className="space-y-8">
            <LevelHeader
                icon={Briefcase}
                title="Phase 2: Marginal Logic"
                subtitle={scenario.title}
                colorClass="bg-cyber-lime"
                borderColorClass="border-cyber-lime/20"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <MentorMessage message={message} type={result === 'success' ? 'success' : (result ? 'warning' : 'info')} />
                </div>

                <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Input & Controls */}
                    <div className="space-y-6">
                        <div className="bento-card bg-white/5 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Buyer Brief</h3>
                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 uppercase font-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyber-lime rounded-full animate-pulse"></span>
                                    Negotiation Live
                                </div>
                            </div>
                            <p className="text-xl font-bold italic text-white leading-tight">
                                "{scenario.description}"
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-midnight rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-gray-500 font-black uppercase">Initial Offer</span>
                                    <p className="text-2xl font-black text-white">${scenario.offerPrice.toFixed(2)}</p>
                                </div>
                                <div className="p-4 bg-midnight rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-gray-500 font-black uppercase">Volume</span>
                                    <p className="text-2xl font-black text-white">{scenario.units} units</p>
                                </div>
                            </div>
                        </div>

                        {gameState !== 'result' && (
                            <div className="bento-card border-none bg-electric-purple/10 text-white p-8 neo-brutal border-midnight space-y-8">
                                <div className="flex justify-between items-end">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60">Your Counter Offer</h3>
                                    <span className="text-6xl font-black text-white italic leading-none">${negotiationPrice.toFixed(2)}</span>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleNegotiate(0.05)}
                                        className="flex-1 py-6 bg-white text-midnight font-black text-xl rounded-xl neo-brutal border-midnight hover:-translate-y-1 transition-all"
                                    >
                                        +$0.05
                                    </button>
                                    <button
                                        onClick={() => handleNegotiate(-0.05)}
                                        className="flex-1 py-6 bg-white/10 text-white font-black text-xl rounded-xl border-2 border-white/20 hover:bg-white/20"
                                    >
                                        -$0.05
                                    </button>
                                </div>

                                <button
                                    onClick={handleCommit}
                                    className="w-full py-6 bg-cyber-lime text-midnight font-black text-2xl uppercase tracking-tighter italic rounded-[2rem] border-4 border-midnight shadow-[0_0_30px_rgba(173,255,47,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4"
                                >
                                    <Handshake size={32} />
                                    COMMIT STRATEGY
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right: Visualization & Feedback */}
                    <div className="space-y-6">
                        <div className="bento-card h-full flex flex-col justify-between p-10 bg-white/5 border-white/10">
                            <div className="space-y-12">
                                {/* Patience Bar */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-500">Buyer Patience</span>
                                        <span className={patience > 30 ? 'text-cyber-lime' : 'text-hot-pink'}>{Math.round(patience)}%</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            animate={{ width: `${patience}%`, backgroundColor: patience > 70 ? '#ADFF2F' : patience > 30 ? '#ADFF2F' : '#FF69B4' }}
                                            className="h-full"
                                        />
                                    </div>
                                </div>

                                {/* Contribution Visualizer */}
                                <div className="space-y-12 pt-8 border-t border-white/5">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                                            <span>OFFER PRICE</span>
                                            <span className="text-white">${negotiationPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                            <motion.div
                                                animate={{ width: '100%' }}
                                                className="h-full bg-electric-purple"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-hot-pink">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-bold">
                                            <span>VARIABLE COST (FLOOR)</span>
                                            <span>-${scenario.variableCost.toFixed(2)}</span>
                                        </div>
                                        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                            <motion.div
                                                animate={{ width: `${(scenario.variableCost / negotiationPrice) * 100}%` }}
                                                className="h-full bg-hot-pink/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5">
                                {negotiationPrice > scenario.variableCost ? (
                                    <div className="p-8 bg-cyber-lime/10 rounded-[2rem] border border-cyber-lime/30 text-center">
                                        <span className="text-[10px] font-black text-cyber-lime uppercase tracking-widest block mb-2">Item Contribution</span>
                                        <p className="text-5xl font-black text-white italic">+${(negotiationPrice - scenario.variableCost).toFixed(2)}</p>
                                    </div>
                                ) : (
                                    <div className="p-8 bg-hot-pink/10 rounded-[2rem] border border-hot-pink/30 text-center">
                                        <span className="text-[10px] font-black text-hot-pink uppercase tracking-widest block mb-2">NEGATIVE MARGIN</span>
                                        <p className="text-5xl font-black text-white italic">-${Math.abs(negotiationPrice - scenario.variableCost).toFixed(2)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === 'result' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-12"
                        >
                            <div className={`bento-card border-none neo-brutal p-12 flex flex-col items-center gap-8 ${result === 'success' ? 'bg-cyber-lime text-midnight border-midnight' : 'bg-hot-pink text-white border-white'
                                }`}>
                                <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                                    {result === 'success' ? 'DEAL SECURED' : result === 'walked' ? 'CLIENT WALKED' : 'MARGIN LOSS'}
                                </h3>
                                <p className="text-xl md:text-3xl font-bold text-center max-w-2xl uppercase leading-tight italic">
                                    "{message}"
                                </p>
                                <button
                                    onClick={nextScenario}
                                    className={`px-12 py-8 rounded-full font-black text-2xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 border-4 ${result === 'success' ? 'bg-midnight text-white border-white' : 'bg-white text-midnight border-midnight'
                                        }`}
                                >
                                    CONTINUE MISSION →
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

