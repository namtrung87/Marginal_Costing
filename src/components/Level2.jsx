import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Info, Eye } from 'lucide-react'

export function Level2() {
    const { nextLevel, addCash } = useGameStore()
    const [scenario] = useState({
        title: 'The School Trip Special',
        description: 'A local school wants 100 cups of lemonade for a field trip. They can only pay $0.60 per cup.',
        normalPrice: 1.50,
        offerPrice: 0.60,
        units: 100,
        variableCost: 0.20
    })

    const [decision, setDecision] = useState(null)
    const [message, setMessage] = useState('AGENT: A customer is lowballing you. They want to pay $0.60. Should we take the bag or nah?')
    const [showExplanation, setShowExplanation] = useState(false)

    const handleDecision = (accepted) => {
        setDecision(accepted)
        if (accepted) {
            addCash(scenario.units * (scenario.offerPrice - scenario.variableCost))
            setMessage('W. You covered the variable costs and snatched some extra profit. 💸')
        } else {
            setMessage('L. You missed out on profit just because you were worried about "Total Cost".')
        }
        setShowExplanation(true)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12">
                <div className="bento-card bg-cyber-lime/10 border-cyber-lime/20 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-6xl animate-bounce">🤔</div>
                    <div>
                        <h2 className="text-4xl text-cyber-lime italic mb-2">THE SPECIAL ORDER</h2>
                        <p className="text-lg text-gray-400 capitalize tracking-widest">{message}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="neo-brutal bg-white p-8 space-y-6"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-midnight font-black uppercase text-xs tracking-[0.2em]">Briefing</span>
                        <Info className="text-midnight" size={20} />
                    </div>
                    <p className="text-midnight font-bold leading-tight uppercase italic text-lg">{scenario.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-midnight rounded-2xl flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Normal</span>
                            <span className="text-xl text-white font-black">${scenario.normalPrice.toFixed(2)}</span>
                        </div>
                        <div className="p-4 bg-electric-purple rounded-2xl flex flex-col items-center ring-4 ring-white shadow-xl">
                            <span className="text-[10px] text-white/50 font-bold uppercase mb-1">The Offer</span>
                            <span className="text-xl text-white font-black animate-pulse">${scenario.offerPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>

                {!decision && (
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => handleDecision(true)}
                            className="neo-button bg-electric-purple text-white border-white py-6 text-xl"
                        >
                            TAKE THE BAG ✅
                        </button>
                        <button
                            onClick={() => handleDecision(false)}
                            className="neo-button bg-hot-pink text-white border-white py-4 text-sm opacity-50 hover:opacity-100"
                        >
                            PASS ON IT ❌
                        </button>
                    </div>
                )}
            </div>

            <div className="lg:col-span-7">
                <div className="bento-card h-full flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-white">MARGIN ANALYSER</h3>
                        <div className="px-4 py-1 bg-cyber-lime/20 rounded-full text-cyber-lime text-[10px] font-bold">LIVE</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center space-y-12">
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                                <span>Revenue Flow</span>
                                <span className="text-white">${scenario.offerPrice.toFixed(2)} / Unit</span>
                            </div>
                            <div className="h-6 bg-white/5 rounded-full overflow-hidden neo-brutal border-none ring-1 ring-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="h-full bg-electric-purple"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                                <span>Variable Friction</span>
                                <span className="text-hot-pink">-${scenario.variableCost.toFixed(2)} / Unit</span>
                            </div>
                            <div className="h-6 bg-white/5 rounded-full overflow-hidden neo-brutal border-none ring-1 ring-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(scenario.variableCost / scenario.offerPrice) * 100}%` }}
                                    className="h-full bg-hot-pink"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Net Contribution</h4>
                                <p className="text-4xl font-black text-cyber-lime italic">${(scenario.offerPrice - scenario.variableCost).toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-cyber-lime uppercase animate-pulse italic">POSITIVE MARGIN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showExplanation && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-12 bento-card border-cyber-lime/40 bg-cyber-lime/5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <p className="text-xs font-black text-hot-pink uppercase tracking-[0.3em]">RIVAL:</p>
                            <p className="text-xl text-gray-500 font-light italic leading-tight">
                                "You’re selling below total cost. You're losing money on every cup if you look at the rent!"
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-black text-cyber-lime uppercase tracking-[0.3em]">YOU:</p>
                            <p className="text-xl text-white font-bold leading-tight">
                                "The rent is already paid. Every $0.01 above variable cost is one step closer to breaking even. Basic math, stay mad."
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={nextLevel}
                            className="neo-button bg-white text-midnight border-midnight"
                        >
                            NEXT VIBE: THE DUEL →
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
