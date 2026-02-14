import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, PieChart, Info, ShieldAlert, Sparkles, Sword, HelpCircle, Calculator } from 'lucide-react'
import { LevelHeader } from './ui/LevelHeader'
import { MentorMessage } from './ui/MentorMessage'

const SCENARIOS = [
    {
        title: 'Duel 1: Equilibrium',
        description: 'Production (1000) = Sales (1000). Both methods should yield same profit.',
        prod: 1000, sales: 1000, var: 10, fixed: 5000, price: 50,
        production: 1000, variableCost: 10, fixedOverhead: 5000, sellingPrice: 50 // UI compatibility
    },
    {
        title: 'Duel 2: The Stock Trap',
        description: 'Production (1000) > Sales (800). Absorption hides fixed costs in inventory.',
        prod: 1000, sales: 800, var: 10, fixed: 5000, price: 50,
        production: 1000, variableCost: 10, fixedOverhead: 5000, sellingPrice: 50
    },
    {
        title: 'Duel 3: The Stock Release',
        description: 'Sales (1200) > Production (1000). Old fixed costs are now hitting the P&L.',
        prod: 1000, sales: 1200, var: 10, fixed: 5000, price: 50,
        production: 1000, variableCost: 10, fixedOverhead: 5000, sellingPrice: 50
    }
]

export function Level3({ onComplete }) {
    const { recordMistake } = useGameStore()
    const [currentScenario, setCurrentScenario] = useState(0)
    const [stage, setStage] = useState('calc')
    const [inputs, setInputs] = useState({ marginalCost: '', absorptionCost: '' })
    const [profitChoice, setProfitChoice] = useState(null)
    const [showWizard, setShowWizard] = useState(false)

    const data = SCENARIOS[currentScenario]
    const fixedRate = data.fixed / data.prod
    const correctMarginal = data.var
    const correctAbsorption = data.var + fixedRate

    const [message, setMessage] = useState('Costing is all about how you handle Fixed Overhead. One method ignores it, the other absorbs it.')

    const checkCalculations = () => {
        if (Math.abs(parseFloat(inputs.marginalCost) - correctMarginal) < 0.01 &&
            Math.abs(parseFloat(inputs.absorptionCost) - correctAbsorption) < 0.01) {
            setStage('profit')
            setMessage('CALCULATION SYNCED. Now witness the Stock Trap in action.')
        } else {
            recordMistake()
            setMessage('❌ MATH ERROR. Fixed Overhead Allocation is the key. Use the wizard if needed.')
        }
    }

    const renderCalculation = () => (
        <div className="space-y-8">
            <LevelHeader
                icon={Sword}
                title="Phase 3: The Costing Duel"
                subtitle={data.title}
                colorClass="bg-hot-pink"
                borderColorClass="border-hot-pink/20"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <MentorMessage message={message} type={message.includes('❌') ? 'warning' : 'info'} />
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bento-card p-8 bg-white/5 border-white/10 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">PRODUCTION DATA</h3>
                            <button
                                onClick={() => setShowWizard(!showWizard)}
                                className="p-2 bg-hot-pink/10 text-hot-pink rounded-lg hover:bg-hot-pink/20 transition-all border border-hot-pink/20"
                            >
                                <HelpCircle size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'PRODUCTION', val: `${data.production} UNITS` },
                                { label: 'SALES', val: `${data.sales} UNITS` },
                                { label: 'VARIABLE COST', val: `$${data.variableCost.toFixed(2)}` },
                                { label: 'TOTAL FIXED', val: `$${data.fixedOverhead.toFixed(2)}` }
                            ].map(d => (
                                <div key={d.label} className="flex justify-between items-center pb-2 border-b border-white/5">
                                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{d.label}</span>
                                    <span className="text-white font-black italic">{d.val}</span>
                                </div>
                            ))}
                        </div>

                        <AnimatePresence>
                            {showWizard && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 bg-midnight border border-hot-pink/30 rounded-2xl space-y-3 overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 text-hot-pink">
                                        <Calculator size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Formula Wizard</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 leading-relaxed font-bold">
                                        <div className="mb-2">1. <span className="text-white">Marginal</span> = Only the Variable Cost. Simple.</div>
                                        <div>2. <span className="text-white">Absorption</span> = Variable + (Total Fixed / Production Units).</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="bento-card h-full bg-white/5 border-white/10 p-10 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-hot-pink uppercase tracking-[0.3em]">MODERN MARGINAL COST</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={inputs.marginalCost}
                                        onChange={(e) => setInputs({ ...inputs, marginalCost: e.target.value })}
                                        className="w-full bg-midnight text-white border-2 border-white/10 rounded-3xl p-8 text-4xl font-black italic focus:border-hot-pink transition-all outline-none"
                                        placeholder="0.00"
                                    />
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-xl font-black italic">$/UNIT</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-electric-purple uppercase tracking-[0.3em]">BOOMER ABSORPTION COST</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={inputs.absorptionCost}
                                        onChange={(e) => setInputs({ ...inputs, absorptionCost: e.target.value })}
                                        className="w-full bg-midnight text-white border-2 border-white/10 rounded-3xl p-8 text-4xl font-black italic focus:border-electric-purple transition-all outline-none"
                                        placeholder="0.00"
                                    />
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-xl font-black italic">$/UNIT</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={checkCalculations}
                            className="w-full py-8 bg-hot-pink text-white font-black text-2xl uppercase tracking-tighter italic rounded-[2rem] border-4 border-midnight shadow-[0_0_30px_rgba(255,105,180,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            VERIFY THE MATH →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderProfitDuel = () => {
        const marginalProfit = (data.sales * (data.sellingPrice - data.variableCost)) - data.fixedOverhead
        const stockValuationDiff = (data.production - data.sales) * fixedRate
        const absorptionProfit = marginalProfit + stockValuationDiff

        return (
            <div className="space-y-8">
                <LevelHeader
                    icon={PieChart}
                    title="Phase 3: The Stock Trap"
                    subtitle="P&L Breakdown"
                    colorClass="bg-electric-purple"
                    borderColorClass="border-electric-purple/20"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-12">
                        <MentorMessage message={marginalProfit > 0 ? "Absorption is hiding costs in inventory, making profit look fake. Marginal shows the raw truth." : "The Stock Trap is real. Absorption hides the pain by shifting it to next month."} type="info" />
                    </div>

                    <div className="lg:col-span-12 bento-card bg-hot-pink/10 border-hot-pink/30 py-8 px-12 flex flex-col md:flex-row items-center gap-8">
                        <ShieldAlert className="text-hot-pink animate-pulse flex-shrink-0" size={48} />
                        <p className="text-2xl font-black italic text-white leading-tight">
                            "Wait! Rival Co. reported ${absorptionProfit.toFixed(2)} profit. Why is our Marginal profit only ${marginalProfit.toFixed(2)}? Are we losing?"
                        </p>
                    </div>

                    <div className="lg:col-span-6 bento-card bg-cyber-lime/5 border-cyber-lime/20 h-full flex flex-col justify-between p-10">
                        <div className="space-y-8">
                            <h3 className="text-cyber-lime flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                                <Sparkles size={16} /> MARGINAL TRUTH (REAL)
                            </h3>
                            <div className="space-y-4 font-bold">
                                <div className="flex justify-between text-gray-500"><span>Sales {(data.sales)} @ ${data.sellingPrice}</span> <span>${(data.sales * data.sellingPrice).toLocaleString()}</span></div>
                                <div className="flex justify-between text-hot-pink"><span>Variable Cost (Production Only)</span> <span>-${(data.sales * data.variableCost).toLocaleString()}</span></div>
                                <div className="flex justify-between text-cyber-lime pt-4 border-t border-white/5 font-black text-3xl italic tracking-tighter">
                                    <span>Contribution</span> <span>${(data.sales * (data.sellingPrice - data.variableCost)).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400"><span>Full Fixed Overhead (Immediate)</span> <span>-${data.fixedOverhead.toLocaleString()}</span></div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-cyber-lime text-midnight rounded-[2.5rem] flex justify-between items-center border-4 border-midnight shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <span className="font-black italic text-2xl uppercase">NET PROFIT</span>
                            <span className="font-black text-4xl">${marginalProfit.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bento-card bg-white/5 border-white/10 h-full opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed p-10">
                        <h3 className="text-gray-500 mb-8 italic uppercase text-xs font-black tracking-widest">ABSORPTION HYPE (FACADE)</h3>
                        <div className="space-y-4 opacity-50">
                            <div className="flex justify-between text-white"><span>Sales Revenue</span> <span>${(data.sales * data.sellingPrice).toLocaleString()}</span></div>
                            <div className="flex justify-between text-white"><span>COGS (Includes Fixed OH Share)</span> <span>-${(data.sales * correctAbsorption).toLocaleString()}</span></div>
                            <div className="pt-24 flex justify-between text-hot-pink font-black text-2xl italic uppercase underline decoration-4 underline-offset-8">
                                <span>Reported Profit</span> <span>${absorptionProfit.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-4 leading-relaxed font-bold">
                                * Fixed overhead is "absorbed" into inventory. Cost follows the unit, not the period.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-12 bento-card border-none bg-midnight text-white ring-4 ring-white shadow-[16px_16px_0px_0px_rgba(255,105,180,1)] mt-12 p-12">
                        <p className="text-3xl font-black italic mb-8 uppercase tracking-widest">
                            {Math.abs(stockValuationDiff) < 1
                                ? "WHY ARE THE PROFITS EQUAL?"
                                : `WHY THE $${stockValuationDiff.toFixed(2)} GAP?`}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <button
                                onClick={() => setProfitChoice('correct')}
                                className="text-left p-10 bg-white/5 rounded-[2.5rem] border-2 border-white/10 hover:border-cyber-lime hover:bg-cyber-lime/5 transition-all group"
                            >
                                <p className="text-cyber-lime font-black mb-4 opacity-30 group-hover:opacity-100 uppercase tracking-widest text-[10px]">OPTION A</p>
                                <p className="text-xl font-bold leading-tight">
                                    {Math.abs(stockValuationDiff) < 1
                                        ? "Production equals Sales. No inventory change = No 'fake' profit. Pure Equilibrium. ⚖️"
                                        : stockValuationDiff > 0
                                            ? "Unsold units are TRAPPING fixed costs in the warehouse, artificially boosting profit. 📦"
                                            : "We sold more than we made. Old fixed costs are being RELEASED from inventory, hitting the P&L now. 📉"}
                                </p>
                            </button>
                            <button
                                onClick={() => setProfitChoice('wrong')}
                                className="text-left p-10 bg-white/5 rounded-[2.5rem] border-2 border-white/10 hover:border-hot-pink hover:bg-hot-pink/5 transition-all group"
                            >
                                <p className="text-hot-pink font-black mb-4 opacity-30 group-hover:opacity-100 uppercase tracking-widest text-[10px]">OPTION B</p>
                                <p className="text-xl font-bold leading-tight">
                                    {Math.abs(stockValuationDiff) < 1
                                        ? "It's just a coincidence. Financial markets are random and unpredictable. 🎲"
                                        : stockValuationDiff > 0
                                            ? "Absorption costing is simply better because it makes profit look higher. Ignorance is bliss. ✨"
                                            : "The market is just bad today. It has nothing to do with inventory accounting. 🤷"}
                                </p>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {profitChoice === 'correct' && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="lg:col-span-12 space-y-8 mt-12"
                            >
                                <div className="bento-card border-none bg-cyber-lime text-midnight p-12 neo-brutal border-midnight">
                                    <h4 className="text-4xl font-black italic mb-6 uppercase tracking-tighter">THE TRUTH REVEALED</h4>

                                    {/* Visual Stock Trap */}
                                    <div className="flex gap-4 mb-8 bg-midnight/20 p-6 rounded-2xl">
                                        <div className="flex-1 text-center border-r border-midnight/20">
                                            <p className="text-[10px] uppercase font-black tracking-widest mb-2">P&L CHARGE</p>
                                            <div className="h-24 bg-red-500/20 rounded-lg relative overflow-hidden flex items-end justify-center">
                                                <div className="w-full bg-red-500 transition-all duration-1000" style={{ height: '100%' }}></div>
                                                <span className="absolute bottom-2 font-black text-white text-shadow uppercase">FULL PERIOD {data.fixedOverhead}</span>
                                            </div>
                                            <p className="text-xs font-bold mt-2">Marginal (Truth)</p>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <p className="text-[10px] uppercase font-black tracking-widest mb-2">
                                                {stockValuationDiff > 0 ? 'WAREHOUSE TRAP' : stockValuationDiff < 0 ? 'STOCK RELEASE' : 'EQUILIBRIUM'}
                                            </p>
                                            <div className={`h-24 rounded-lg relative overflow-hidden flex items-end justify-center ${stockValuationDiff >= 0 ? 'bg-cyber-lime/20' : 'bg-hot-pink/20'}`}>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.min(100, (Math.abs(stockValuationDiff) / data.fixedOverhead) * 100)}%` }}
                                                    className={`w-full transition-all duration-1000 ${stockValuationDiff >= 0 ? 'bg-cyber-lime' : 'bg-hot-pink'}`}
                                                ></motion.div>
                                                <span className={`absolute bottom-2 font-black text-shadow ${stockValuationDiff >= 0 ? 'text-midnight' : 'text-white'}`}>
                                                    {stockValuationDiff > 0 ? `HIDDEN +${stockValuationDiff.toFixed(0)}` : stockValuationDiff < 0 ? `RELEASED ${stockValuationDiff.toFixed(0)}` : 'MATCHED 0'}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold mt-2">Absorption Effect</p>
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold leading-tight italic">
                                        Exactly. Because we produced {data.production} but only sold {data.sales}, there are {data.production - data.sales} units in the warehouse.
                                        <br /><br />
                                        In Absorption, those units carry ${fixedRate.toFixed(2)} of overhead each. It's not gone, it's just "postponed" on the balance sheet.
                                        <br /><br />
                                        In Marginal, we eat the whole ${data.fixedOverhead.toLocaleString()} now. No gimmicks. Real profit.
                                    </p>
                                </div>
                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={() => {
                                            if (currentScenario < SCENARIOS.length - 1) {
                                                setCurrentScenario(s => s + 1)
                                                setStage('calc')
                                                setInputs({ marginalCost: '', absorptionCost: '' })
                                                setProfitChoice(null)
                                                setMessage(SCENARIOS[currentScenario + 1].description)
                                            } else {
                                                const { addScore } = useGameStore.getState()
                                                addScore(1500)
                                                onComplete()
                                            }
                                        }}
                                        className="neo-button bg-cyber-lime text-midnight border-white text-4xl italic font-black px-24 py-10"
                                    >
                                        {currentScenario < SCENARIOS.length - 1 ? 'NEXT DUEL →' : 'MASTERED ALL →'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            {stage === 'calc' ? renderCalculation() : renderProfitDuel()}
        </div>
    )
}
