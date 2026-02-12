import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, PieChart, Info, ShieldAlert, Sparkles, Sword } from 'lucide-react'

export function Level3() {
    const { nextLevel } = useGameStore()
    const [stage, setStage] = useState('calc')
    const [inputs, setInputs] = useState({ marginalCost: '', absorptionCost: '' })
    const [profitChoice, setProfitChoice] = useState(null)

    const [data] = useState({
        production: 1000,
        sales: 800,
        variableCost: 10.50,
        fixedOverhead: 5000,
        sellingPrice: 50.00
    })

    const fixedRate = data.fixedOverhead / data.production
    const correctMarginal = data.variableCost
    const correctAbsorption = data.variableCost + fixedRate

    const [message, setMessage] = useState('AGENT: It’s time to see the matrix. Calculate the unit cost for both methods. Don’t let the fixed costs fwm.')

    const checkCalculations = () => {
        if (parseFloat(inputs.marginalCost) === correctMarginal && parseFloat(inputs.absorptionCost) === correctAbsorption) {
            setStage('profit')
            setMessage('SHEESH! You really saw through the absorption smoke screen.')
        } else {
            setMessage('NAH. Your math is mid. Check that fixed overhead allocation again.')
        }
    }

    const renderCalculation = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12">
                <div className="bento-card border-none bg-hot-pink/10 ring-1 ring-hot-pink/20 flex items-center gap-8">
                    <Sword className="text-hot-pink animate-pulse" size={48} />
                    <div>
                        <h2 className="text-4xl text-hot-pink italic">THE COSTING DUEL</h2>
                        <p className="text-lg text-gray-400 font-bold uppercase tracking-widest">{message}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="bento-card p-6 bg-white/5 space-y-4">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">RAW DATA</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'PRODUCTION', val: `${data.production} UNITS` },
                            { label: 'VARIABLE COST', val: `$${data.variableCost.toFixed(2)}` },
                            { label: 'TOTAL FIXED', val: `$${data.fixedOverhead.toFixed(2)}` }
                        ].map(d => (
                            <div key={d.label} className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-[10px] font-black uppercase text-gray-500">{d.label}</span>
                                <span className="text-white font-bold">{d.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8">
                <div className="bento-card h-full space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-black text-cyber-lime uppercase tracking-widest">MODERN MARGINAL COST</label>
                            <input
                                type="number"
                                value={inputs.marginalCost}
                                onChange={(e) => setInputs({ ...inputs, marginalCost: e.target.value })}
                                className="w-full bg-white text-midnight neo-brutal p-6 text-2xl font-black italic focus:ring-0 outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-black text-electric-purple uppercase tracking-widest">BOOMER ABSORPTION COST</label>
                            <input
                                type="number"
                                value={inputs.absorptionCost}
                                onChange={(e) => setInputs({ ...inputs, absorptionCost: e.target.value })}
                                className="w-full bg-white text-midnight neo-brutal p-6 text-2xl font-black italic focus:ring-0 outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <button
                        onClick={checkCalculations}
                        className="w-full neo-button bg-cyber-lime text-midnight border-midnight"
                    >
                        Verify The Reality →
                    </button>
                </div>
            </div>
        </div>
    )

    const renderProfitDuel = () => {
        const marginalProfit = (data.sales * (data.sellingPrice - data.variableCost)) - data.fixedOverhead
        const stockValuationDiff = (data.production - data.sales) * fixedRate
        const absorptionProfit = marginalProfit + stockValuationDiff

        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-12 glass-stat bg-hot-pink/20 py-8 px-12 border-hot-pink/30 rounded-[3rem]">
                    <p className="text-2xl font-black italic text-white flex items-center gap-6">
                        <ShieldAlert className="text-hot-pink" size={40} />
                        "My profit is ${absorptionProfit.toFixed(2)}. Your method is capping." — Rival
                    </p>
                </div>

                <div className="lg:col-span-6 bento-card bg-cyber-lime/5 border-cyber-lime/20 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-cyber-lime mb-8 flex items-center gap-4">
                            <Sparkles size={24} /> MARGINAL TRUTH
                        </h3>
                        <div className="space-y-3 font-medium text-lg">
                            <div className="flex justify-between text-gray-400"><span>Sales flow</span> <span>${(data.sales * data.sellingPrice).toFixed(2)}</span></div>
                            <div className="flex justify-between text-hot-pink"><span>Variable cost</span> <span>-${(data.sales * data.variableCost).toFixed(2)}</span></div>
                            <div className="flex justify-between text-cyber-lime pt-4 border-t border-white/10 font-black text-2xl italic uppercase tracking-tighter">
                                <span>Contribution</span> <span>${(data.sales * (data.sellingPrice - data.variableCost)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500"><span>Fixed overhead</span> <span>-${data.fixedOverhead.toFixed(2)}</span></div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-cyber-lime text-midnight rounded-[2rem] flex justify-between items-center neo-brutal border-midnight translate-x-2 translate-y-2">
                        <span className="font-black italic text-xl">NET PROFIT</span>
                        <span className="font-black text-3xl">${marginalProfit.toFixed(2)}</span>
                    </div>
                </div>

                <div className="lg:col-span-6 bento-card bg-white/5 h-full opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                    <h3 className="text-gray-400 mb-8 italic">ABSORPTION HYPE</h3>
                    <div className="space-y-3 opacity-50">
                        <div className="flex justify-between"><span>Sales</span> <span>${(data.sales * data.sellingPrice).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>COGS (Absorbed)</span> <span>-${(data.sales * correctAbsorption).toFixed(2)}</span></div>
                        <div className="pt-24 flex justify-between text-white font-black text-2xl italic uppercase underline decoration-hot-pink">
                            <span>Reported Profit</span> <span>${absorptionProfit.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-12 bento-card bg-electric-purple text-white neo-brutal border-white shadow-[12px_12px_0px_0px_rgba(173,255,47,1)] mt-12">
                    <p className="text-2xl font-black italic mb-8">WHY IS THERE A ${stockValuationDiff.toFixed(2)} GAP?</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => setProfitChoice('correct')}
                            className="text-left p-8 bg-midnight rounded-[2rem] border-2 border-white/10 hover:border-cyber-lime transition-colors group"
                        >
                            <p className="text-cyber-lime font-black mb-2 opacity-30 group-hover:opacity-100">OPTION A</p>
                            <p className="text-xl font-bold leading-tight">Unsold units are hiding their fixed costs in the basement (inventory balance sheet). 📦</p>
                        </button>
                        <button
                            onClick={() => setProfitChoice('wrong')}
                            className="text-left p-8 bg-midnight rounded-[2rem] border-2 border-white/10 hover:border-hot-pink transition-colors group"
                        >
                            <p className="text-hot-pink font-black mb-2 opacity-30 group-hover:opacity-100">OPTION B</p>
                            <p className="text-xl font-bold leading-tight">Absorption costing uses a magic formula that creates money from thin air. ✨</p>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {profitChoice === 'correct' && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-12 space-y-8"
                        >
                            <div className="bento-card border-none bg-cyber-lime text-midnight p-8 neo-brutal border-midnight">
                                <h4 className="text-2xl font-black italic mb-4 uppercase tracking-tighter">THE TRUTH REVEALED</h4>
                                <p className="text-lg font-bold leading-tight">
                                    Exactly. Because you produced 1,000 units but only sold 800, there are 200 units sitting in inventory.
                                    <br /><br />
                                    In <span className="underline">Absorption Costing</span>, those 200 units "carry" their share of fixed costs ($5.00 each) into next month.
                                    In <span className="underline">Marginal Costing</span>, we ignore inventory and treat the full $5,000 as a current expense.
                                    <br /><br />
                                    This makes Absorption profit look higher right now, but it's just a timing trick. Modern managers use Marginal to stay real.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={nextLevel}
                                    className="neo-button bg-cyber-lime text-midnight border-white text-3xl italic font-black px-24"
                                >
                                    CONTINUE MISSION →
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            {stage === 'calc' ? renderCalculation() : renderProfitDuel()}
        </div>
    )
}
