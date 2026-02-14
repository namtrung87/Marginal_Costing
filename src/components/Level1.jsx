import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, CheckCircle, Smartphone, HelpCircle, Activity } from 'lucide-react'
import { LevelHeader } from './ui/LevelHeader'
import { MentorMessage } from './ui/MentorMessage'

const COST_ITEMS = [
    {
        id: '1',
        name: 'Stand Rent',
        type: 'fixed',
        amount: '$100.50/month',
        description: 'Paid monthly to the market owner regardless of how many cups you sell. Even if you sell zero cups, you still owe this amount.'
    },
    {
        id: '2',
        name: 'Fresh Lemons',
        type: 'variable',
        amount: '$0.12/cup',
        description: 'You buy lemons for each cup of lemonade you make. The more cups you produce, the more lemons you need. Zero cups = zero lemon cost.'
    },
    {
        id: '3',
        name: 'Cups',
        type: 'variable',
        amount: '$0.05/cup',
        description: 'One disposable cup is used per serving. Each additional cup of lemonade requires one more cup. Cost scales directly with output.'
    },
    {
        id: '4',
        name: 'Assistant',
        type: 'step-fixed',
        amount: '$50/shift',
        description: 'You hire one extra assistant for every 50 cups of production. From 1–50 cups it costs $50, from 51–100 cups it jumps to $100, etc.'
    },
    {
        id: '5',
        name: 'Electricity',
        type: 'semi-variable',
        amount: '$20 base + $0.05/cup',
        description: 'There is a $20/month base connection fee you always pay, PLUS an additional $0.05 usage charge for each cup you blend.'
    },
    {
        id: '6',
        name: 'Sugar',
        type: 'variable',
        amount: '$0.03/cup',
        description: 'Sugar is measured out for each cup of lemonade. More production means more sugar purchased. No production means no sugar cost.'
    },
]

const BUCKET_INFO = {
    fixed: {
        label: 'Fixed Costs',
        definition: 'Stays the same no matter how many cups you produce.',
        color: 'border-electric-purple/30 hover:border-electric-purple/60',
        labelColor: 'text-electric-purple',
        bg: 'bg-electric-purple/5'
    },
    variable: {
        label: 'Variable Costs',
        definition: 'Changes directly with each cup you make.',
        color: 'border-cyber-lime/30 hover:border-cyber-lime/60',
        labelColor: 'text-cyber-lime',
        bg: 'bg-cyber-lime/5'
    },
    'step-fixed': {
        label: 'Step-Fixed Costs',
        definition: 'Stays fixed within a range, then jumps up at a new capacity level.',
        color: 'border-hot-pink/30 hover:border-hot-pink/60',
        labelColor: 'text-hot-pink',
        bg: 'bg-hot-pink/5'
    },
    'semi-variable': {
        label: 'Semi-Variable Costs',
        definition: 'Has a fixed base amount plus a variable part that changes with production.',
        color: 'border-white/20 hover:border-white/40',
        labelColor: 'text-white',
        bg: 'bg-white/5'
    }
}

const SCENARIOS = [
    {
        title: 'Phase 1.1: The Basics',
        message: 'Master the core. Drag costs into their primary buckets.',
        items: COST_ITEMS.filter(i => ['fixed', 'variable'].includes(i.type))
    },
    {
        title: 'Phase 1.2: Capacity Thresholds',
        message: 'Operations are scaling. Identify Step-Fixed costs that jump at capacity.',
        items: COST_ITEMS.filter(i => i.type === 'step-fixed')
    },
    {
        title: 'Phase 1.3: Mixed Motives',
        message: 'The final test. Identify Semi-Variable costs (Base + Usage).',
        items: COST_ITEMS.filter(i => i.type === 'semi-variable')
    }
]

export function Level1({ onComplete }) {
    const { recordMistake, health } = useGameStore()
    const [currentScenario, setCurrentScenario] = useState(0)
    const [buckets, setBuckets] = useState({
        fixed: [],
        variable: [],
        'step-fixed': [],
        'semi-variable': []
    })
    const scenario = SCENARIOS[currentScenario]
    const [items, setItems] = useState(scenario.items)
    const [message, setMessage] = useState(scenario.message)
    const [completed, setCompleted] = useState(false)
    const [wrongAttempt, setWrongAttempt] = useState(null)
    const [impact, setImpact] = useState(null) // { amount: -500, x, y }

    const handleDrop = (e, bucketId) => {
        e.preventDefault()
        const itemId = e.dataTransfer.getData('itemId')
        const item = items.find(i => i.id === itemId)

        if (!item) return

        if (item.type === bucketId) {
            setBuckets(prev => ({
                ...prev,
                [bucketId]: [...prev[bucketId], item]
            }))
            const remainingItems = items.filter(i => i.id !== itemId)
            setItems(remainingItems)
            setMessage(`✅ Correct! "${item.name}" belongs there.`)
            setWrongAttempt(null)

            if (remainingItems.length === 0) {
                if (currentScenario < SCENARIOS.length - 1) {
                    setTimeout(() => {
                        const next = currentScenario + 1
                        setCurrentScenario(next)
                        setItems(SCENARIOS[next].items)
                        setMessage(SCENARIOS[next].message)
                        setBuckets({
                            fixed: [],
                            variable: [],
                            'step-fixed': [],
                            'semi-variable': []
                        })
                    }, 1500)
                } else {
                    setCompleted(true)
                    setMessage('🎉 All cost types mastered! You are a Classification King.')
                }
            }
        } else {
            const hint = bucketId === 'fixed'
                ? 'These costs stay the same regardless of sales.'
                : bucketId === 'variable'
                    ? 'These costs change with every cup you sell.'
                    : bucketId === 'step-fixed'
                        ? 'These costs jump up in steps as you grow.'
                        : 'These are fixed + variable mixed together.'

            setMessage(`❌ Not quite! ${hint}`)
            recordMistake('classification', 10) // 10% damage
            setWrongAttempt(itemId)

            // Trigger Visual Impact
            setImpact({ amount: '-10% INTEGRITY', id: Date.now() })
            setTimeout(() => setImpact(null), 1000)
        }
    }

    return (
        <div className="space-y-8 relative">
            <AnimatePresence>
                {impact && (
                    <motion.div
                        initial={{ opacity: 1, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -50, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    >
                        <span className="text-4xl font-black text-red-500 bg-midnight/80 px-4 py-2 rounded-xl border-2 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                            {impact.amount}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <LevelHeader
                icon={Activity}
                title="Mission 1: Classification Protocol"
                subtitle={scenario.title}
                colorClass="bg-electric-purple"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Info + Cost Cards */}
                <div className="lg:col-span-5 space-y-6">
                    <MentorMessage message={message} type={message.includes('✅') ? 'success' : message.includes('❌') ? 'warning' : 'info'} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bento-card bg-white/5 border-white/10 p-4">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Audit Integrity</p>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden mt-2">
                                <motion.div
                                    className={`h-full ${health > 50 ? 'bg-cyber-lime' : 'bg-hot-pink'}`}
                                    animate={{ width: `${health}%` }}
                                />
                            </div>
                            <p className={`text-right text-xs font-black mt-1 ${health > 50 ? 'text-cyber-lime' : 'text-hot-pink'}`}>{health}%</p>
                        </div>
                        <div className="bento-card bg-white/5 border-white/10 p-4">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Pending Items</p>
                            <p className="text-2xl font-black text-white mt-1">{items.length}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    draggable
                                    onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
                                    className={`neo-brutal bg-white p-5 cursor-grab group active:cursor-grabbing transition-all hover:translate-x-1 hover:-translate-y-1 ${wrongAttempt === item.id ? 'ring-4 ring-hot-pink border-hot-pink' : 'border-midnight'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-midnight font-black text-lg italic tracking-tighter">{item.name}</span>
                                        <span className="bg-cyber-lime text-midnight px-3 py-1 text-[10px] font-bold rounded-full flex-shrink-0">{item.amount}</span>
                                    </div>
                                    <p className="text-midnight/70 text-xs leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Buckets */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(BUCKET_INFO).map(([bucketId, info]) => (
                        <div
                            key={bucketId}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, bucketId)}
                            className={`bento-card border-2 border-dashed ${info.color} ${info.bg} min-h-[250px] relative overflow-hidden group transition-all hover:bg-white/5`}
                        >
                            <h4 className={`${info.labelColor} uppercase text-[11px] tracking-[0.3em] font-black mb-2`}>{info.label}</h4>
                            <p className="text-gray-500 text-[10px] leading-relaxed mb-6 border-b border-white/5 pb-4">
                                {info.definition}
                            </p>

                            <div className="space-y-3">
                                <AnimatePresence>
                                    {buckets[bucketId].map(item => (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            key={item.id}
                                            className="bg-midnight text-white p-4 font-black uppercase tracking-tighter italic border-2 border-white/20 flex items-center justify-between gap-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CheckCircle size={16} className="text-cyber-lime" />
                                                {item.name}
                                            </div>
                                            <span className="text-[10px] opacity-40">{item.amount}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>

                {completed && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-12 py-8 bg-midnight/90 backdrop-blur-xl border-4 border-cyber-lime neo-brutal shadow-[0_0_50px_rgba(173,255,47,0.4)] flex flex-col items-center gap-6"
                    >
                        <h3 className="text-3xl font-black italic text-cyber-lime uppercase tracking-widest">PHASE COMPLETE</h3>
                        <button
                            onClick={() => {
                                const { addScore } = useGameStore.getState()
                                addScore(500)
                                onComplete()
                            }}
                            className="neo-button bg-cyber-lime text-midnight border-white text-2xl font-black px-12"
                        >
                            CONTINUE MISSION →
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
