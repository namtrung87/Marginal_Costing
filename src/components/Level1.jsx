import React, { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import { motion } from 'framer-motion'
import { Info, CheckCircle, Smartphone, HelpCircle } from 'lucide-react'

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

export function Level1() {
    const { nextLevel } = useGameStore()
    const [buckets, setBuckets] = useState({
        fixed: [],
        variable: [],
        'step-fixed': [],
        'semi-variable': []
    })
    const [items, setItems] = useState(COST_ITEMS)
    const [message, setMessage] = useState('Read each cost description carefully, then drag it into the correct bucket!')
    const [completed, setCompleted] = useState(false)
    const [wrongAttempt, setWrongAttempt] = useState(null)

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
            setItems(prev => prev.filter(i => i.id !== itemId))
            setMessage(`✅ Correct! "${item.name}" is a ${BUCKET_INFO[bucketId].label.toLowerCase().replace(' costs', '')} cost.`)
            setWrongAttempt(null)

            if (items.length === 1) {
                setCompleted(true)
                setMessage('🎉 All costs classified correctly! You\'re ready for Phase 2!')
            }
        } else {
            setWrongAttempt(itemId)
            const hint = bucketId === 'fixed'
                ? 'Fixed costs don\'t change with production. Re-read the description — does this cost change when you make more cups?'
                : bucketId === 'variable'
                    ? 'Variable costs change per unit. Check if this cost has a fixed component or only changes with each cup.'
                    : bucketId === 'step-fixed'
                        ? 'Step-fixed costs are fixed within a capacity range, then jump. Does this cost have a threshold?'
                        : 'Semi-variable costs have BOTH a fixed base AND a variable component. Does this cost have two parts?'
            setMessage(`❌ Not quite! ${hint}`)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Info + Cost Cards */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bento-card bg-electric-purple/10 border-electric-purple/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-electric-purple rounded-2xl"><Smartphone /></div>
                        <h3 className="text-xl font-black">THE BRIEF</h3>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {message}
                    </p>
                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                            <HelpCircle size={12} />
                            Remaining: {items.length} / {COST_ITEMS.length} costs
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
                            className={`neo-brutal bg-white p-5 cursor-grab group active:cursor-grabbing transition-all hover:translate-x-1 hover:-translate-y-1 ${wrongAttempt === item.id ? 'ring-2 ring-hot-pink' : ''
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
                </div>
            </div>

            {/* Buckets */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(BUCKET_INFO).map(([bucketId, info]) => (
                    <div
                        key={bucketId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, bucketId)}
                        className={`bento-card border-2 border-dashed ${info.color} ${info.bg} min-h-[220px] relative overflow-hidden group transition-all`}
                    >
                        <h4 className={`${info.labelColor} uppercase text-[11px] tracking-[0.3em] font-black mb-2`}>{info.label}</h4>
                        <p className="text-gray-500 text-[10px] leading-relaxed mb-6 border-b border-white/5 pb-4">
                            {info.definition}
                        </p>

                        <div className="space-y-3">
                            {buckets[bucketId].map(item => (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    key={item.id}
                                    className="bg-cyber-lime text-midnight p-4 font-black uppercase tracking-tighter italic border-2 border-midnight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                                >
                                    <CheckCircle size={16} className="flex-shrink-0" />
                                    {item.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {completed && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
                >
                    <button
                        onClick={nextLevel}
                        className="neo-button bg-cyber-lime text-midnight border-white text-xl"
                    >
                        NEXT PHASE →
                    </button>
                </motion.div>
            )}
        </div>
    )
}
