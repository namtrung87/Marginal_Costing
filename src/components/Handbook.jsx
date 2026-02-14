import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, X, Info, Target, TrendingUp, ShieldAlert, Zap, Sparkles } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

const TOPICS = [
    {
        id: 'costs',
        title: 'Cost Behavior',
        emoji: '📊',
        sections: [
            { title: 'Fixed Costs', content: 'Costs that remain constant regardless of production volume (e.g., Rent, Salaries).', icon: <Target className="text-electric-purple" /> },
            { title: 'Variable Costs', content: 'Costs that change directly with production units (e.g., Materials, Direct Labor).', icon: <Zap className="text-cyber-lime" /> },
            { title: 'Semi-Variable', content: 'Costs with both fixed and variable elements (e.g., Electricity with a base fee + usage rate).', icon: <Sparkles className="text-hot-pink" /> },
            { title: 'Step-Fixed', content: 'Costs that are fixed for a range but jump to a higher level once capacity is exceeded (e.g., hiring an extra supervisor).', icon: <TrendingUp className="text-white" /> }
        ]
    },
    {
        id: 'marginal',
        title: 'Marginal Magic',
        emoji: '✨',
        sections: [
            { title: 'Contribution', content: 'Selling Price - Variable Cost. This is what helps pay for fixed costs and profit.', icon: <Info className="text-cyber-lime" /> },
            { title: 'Decision Rule', content: 'If Contribution > 0, accepting a special order increases total profit, even if the price is below total cost!', icon: <ShieldAlert className="text-hot-pink" /> },
            { title: 'Vs. Absorption', content: 'Marginal = Internal only. Absorption = External reporting. Absorption hides fixed costs in inventory!', icon: <BookOpen className="text-white" /> }
        ]
    },
    {
        id: 'cvp',
        title: 'CVP & Risk',
        emoji: '🎯',
        sections: [
            { title: 'Break-Even', content: 'The point where Total Revenue = Total Cost. (Fixed Cost / Contribution per unit).', icon: <Target className="text-white" /> },
            { title: 'Safety Margin', content: 'The gap between current sales and the Break-Even point. Higher is safer!', icon: <Zap className="text-cyber-lime" /> },
            { title: 'Operating Leverage', content: 'Sensitivity of profit to sales shifts. High Fixed Costs = High Leverage = High Risk.', icon: <ShieldAlert className="text-hot-pink" /> }
        ]
    }
]

export function Handbook({ isOpen, onClose, initialTopic }) {
    const { clearSuggestion } = useGameStore()
    const [activeTopic, setActiveTopic] = useState(initialTopic || TOPICS[0].id)

    // Sync activeTopic if initialTopic changes while open
    useEffect(() => {
        if (initialTopic) setActiveTopic(initialTopic)
    }, [initialTopic])

    const handleClose = () => {
        clearSuggestion()
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-midnight/80 backdrop-blur-md z-[2000]"
                    />

                    {/* Handbook Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-midnight border-l-4 border-white neo-brutal shadow-none z-[2001] flex flex-col pt-32 p-8"
                    >
                        <div className="absolute top-8 left-8 flex items-center gap-4">
                            <div className="p-4 bg-cyber-lime rounded-2xl text-midnight shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                <BookOpen size={32} />
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase">THE HANDBOOK</h2>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-4 hover:bg-hot-pink rounded-full transition-colors group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform" />
                        </button>

                        {/* Topic Navigation */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            {TOPICS.map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => setActiveTopic(topic.id)}
                                    className={`p-6 bento-card border-none ring-1 flex flex-col items-center gap-3 transition-all ${activeTopic === topic.id
                                        ? 'ring-cyber-lime bg-cyber-lime/10 scale-105'
                                        : 'ring-white/10 hover:ring-white/30'
                                        }`}
                                >
                                    <span className="text-3xl">{topic.emoji}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${activeTopic === topic.id ? 'text-cyber-lime' : 'text-gray-500'}`}>
                                        {topic.title}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 mt-12 overflow-y-auto pr-4 space-y-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTopic}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {TOPICS.find(t => t.id === activeTopic).sections.map((section, idx) => (
                                        <div key={idx} className="bento-card border-none bg-white/5 ring-1 ring-white/10 p-8 hover:ring-white/30 transition-all flex gap-6">
                                            <div className="mt-1">{section.icon}</div>
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-black italic text-white uppercase tracking-tighter">{section.title}</h4>
                                                <p className="text-gray-400 font-light leading-relaxed">{section.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <footer className="mt-8 pt-8 border-t border-white/10 text-center">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] italic">Knowledge is the ultimate asset. Stack it up.</p>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
