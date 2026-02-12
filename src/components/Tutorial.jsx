import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, BookOpen, Target, Gamepad2, Lightbulb, ChevronRight, ChevronLeft } from 'lucide-react'

const TUTORIALS = {
    0: {
        title: 'WELCOME TO MASTERY OF MARGINS',
        subtitle: 'Your journey to master marginal costing starts here.',
        sections: [
            {
                tab: '📚 Overview',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-lg leading-relaxed">
                            <span className="text-cyber-lime font-bold">Marginal Costing</span> is a powerful management accounting technique that helps businesses make smarter decisions by focusing on how costs behave.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            In this game, you'll run a lemonade stand and learn how to classify costs, evaluate special orders, compare costing methods, analyze break-even points, and manage risk — all through hands-on challenges.
                        </p>
                    </div>
                )
            },
            {
                tab: '🎯 What You\'ll Learn',
                icon: <Target size={20} />,
                content: (
                    <div className="space-y-3">
                        {[
                            { phase: 'Phase 1', topic: 'Cost Classification', desc: 'Fixed, Variable, Step-Fixed & Semi-Variable costs' },
                            { phase: 'Phase 2', topic: 'Special Order Decisions', desc: 'When to accept orders below total cost' },
                            { phase: 'Phase 3', topic: 'Marginal vs Absorption', desc: 'Two costing methods and why profits differ' },
                            { phase: 'Phase 4', topic: 'Break-Even Analysis', desc: 'CVP analysis and the break-even point' },
                            { phase: 'Phase 5', topic: 'Operating Leverage', desc: 'Cost structure, risk, and survival' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-cyber-lime font-black text-sm whitespace-nowrap">{item.phase}</span>
                                <div>
                                    <p className="font-bold text-white">{item.topic}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        ]
    },
    1: {
        title: 'PHASE 1: COST CLASSIFICATION',
        subtitle: 'Learn to identify how different costs behave.',
        sections: [
            {
                tab: '📚 Concepts',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-5">
                        <p className="text-gray-400 leading-relaxed">
                            Not all business costs behave the same way. Understanding how costs change (or don't change) with production volume is the foundation of managerial accounting.
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    name: 'Fixed Costs',
                                    color: 'text-electric-purple',
                                    bg: 'bg-electric-purple/10 border-electric-purple/20',
                                    def: 'Costs that stay the same regardless of how many units you produce.',
                                    examples: 'Rent, insurance, salaries of permanent staff, loan repayments.'
                                },
                                {
                                    name: 'Variable Costs',
                                    color: 'text-cyber-lime',
                                    bg: 'bg-cyber-lime/10 border-cyber-lime/20',
                                    def: 'Costs that change directly and proportionally with each unit produced.',
                                    examples: 'Raw materials per unit, packaging per unit, direct labor per unit.'
                                },
                                {
                                    name: 'Step-Fixed Costs',
                                    color: 'text-hot-pink',
                                    bg: 'bg-hot-pink/10 border-hot-pink/20',
                                    def: 'Costs that remain fixed within a range of activity, but jump to a higher level once a capacity threshold is exceeded.',
                                    examples: 'Hiring an extra supervisor for every 50 workers, renting an extra machine when capacity is reached.'
                                },
                                {
                                    name: 'Semi-Variable Costs',
                                    color: 'text-white',
                                    bg: 'bg-white/5 border-white/10',
                                    def: 'Costs that have both a fixed base component and a variable component that changes with activity.',
                                    examples: 'Electricity (fixed connection fee + usage charge), phone bills (monthly plan + per-minute charges).'
                                }
                            ].map((cost, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${cost.bg}`}>
                                    <h4 className={`font-black text-lg ${cost.color} mb-2`}>{cost.name}</h4>
                                    <p className="text-white text-sm font-medium mb-2">{cost.def}</p>
                                    <p className="text-gray-500 text-xs"><span className="font-bold">Examples:</span> {cost.examples}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            },
            {
                tab: '🎯 Objectives',
                icon: <Target size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-gray-400 leading-relaxed">After completing this phase, you should be able to:</p>
                        <ul className="space-y-3">
                            {[
                                'Define and distinguish between Fixed, Variable, Step-Fixed, and Semi-Variable costs',
                                'Identify cost types from real-world descriptions',
                                'Understand why cost classification matters for decision-making',
                                'Recognize the behavioral pattern of each cost type'
                            ].map((obj, i) => (
                                <li key={i} className="flex items-start gap-3 text-white">
                                    <span className="text-cyber-lime font-black text-lg mt-0.5">✓</span>
                                    <span className="text-sm leading-relaxed">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            },
            {
                tab: '🎮 How to Play',
                icon: <Gamepad2 size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-gray-400 leading-relaxed">This is a drag-and-drop classification challenge:</p>
                        <div className="space-y-3">
                            {[
                                { step: '1', text: 'Read each cost item carefully — pay attention to the description that explains how the cost behaves' },
                                { step: '2', text: 'Drag each cost card from the left panel to the correct bucket on the right' },
                                { step: '3', text: 'There are 4 buckets: Fixed, Variable, Step-Fixed, and Semi-Variable' },
                                { step: '4', text: 'If you drop a cost in the wrong bucket, you\'ll get feedback — try again!' },
                                { step: '5', text: 'Classify all 6 costs correctly to advance to Phase 2' }
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="bg-cyber-lime text-midnight w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</span>
                                    <p className="text-white text-sm leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            },
            {
                tab: '💡 Tips',
                icon: <Lightbulb size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-gray-400 leading-relaxed">Key questions to ask yourself for each cost:</p>
                        <div className="space-y-3">
                            {[
                                { q: '"Does this cost change if I make one more cup?"', a: 'If YES → likely Variable. If NO → likely Fixed.' },
                                { q: '"Is there a per-unit amount mentioned?"', a: 'Per-unit costs (e.g., $0.12/cup) are Variable costs.' },
                                { q: '"Does it have a base fee PLUS a usage charge?"', a: 'That\'s a Semi-Variable cost — part fixed, part variable.' },
                                { q: '"Does it stay the same up to a point, then jump?"', a: 'That\'s a Step-Fixed cost — fixed within a capacity range.' },
                                { q: '"Is it a flat monthly or annual amount?"', a: 'Flat fees that don\'t change with output are Fixed costs.' }
                            ].map((tip, i) => (
                                <div key={i} className="p-4 bg-cyber-lime/5 rounded-2xl border border-cyber-lime/10">
                                    <p className="text-cyber-lime font-bold text-sm italic mb-1">{tip.q}</p>
                                    <p className="text-gray-400 text-xs">{tip.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        ]
    },
    2: {
        title: 'PHASE 2: THE SPECIAL ORDER',
        subtitle: 'Should you accept an offer below your total cost?',
        sections: [
            {
                tab: '📚 Concepts',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-5">
                        <p className="text-gray-400 leading-relaxed">
                            One of the most powerful applications of marginal costing is evaluating <span className="text-white font-bold">special orders</span> — one-time deals where a customer offers a price lower than your usual selling price.
                        </p>
                        <div className="p-5 rounded-2xl border bg-cyber-lime/10 border-cyber-lime/20">
                            <h4 className="font-black text-lg text-cyber-lime mb-2">Contribution Margin</h4>
                            <p className="text-white text-sm font-medium mb-2">Contribution = Selling Price − Variable Cost per Unit</p>
                            <p className="text-gray-400 text-xs">If Contribution is positive (Price &gt; Variable Cost), the order adds to profit — even if the price is below total cost!</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-electric-purple/10 border-electric-purple/20">
                            <h4 className="font-black text-lg text-electric-purple mb-2">The Key Insight</h4>
                            <p className="text-white text-sm font-medium">Fixed costs are already paid — they don't change with this decision.</p>
                            <p className="text-gray-400 text-xs mt-1">So the only relevant costs for a special order decision are the variable costs. Any price above variable cost contributes toward covering fixed costs and profit.</p>
                        </div>
                    </div>
                )
            },
            {
                tab: '🎯 Objectives',
                icon: <Target size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-gray-400 leading-relaxed">After completing this phase, you should be able to:</p>
                        <ul className="space-y-3">
                            {[
                                'Calculate the contribution margin per unit',
                                'Evaluate whether a special order should be accepted or rejected',
                                'Explain why fixed costs are irrelevant for short-term decisions',
                                'Understand the difference between marginal and total cost approaches to pricing'
                            ].map((obj, i) => (
                                <li key={i} className="flex items-start gap-3 text-white">
                                    <span className="text-cyber-lime font-black text-lg mt-0.5">✓</span>
                                    <span className="text-sm leading-relaxed">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            },
            {
                tab: '🎮 How to Play',
                icon: <Gamepad2 size={20} />,
                content: (
                    <div className="space-y-4">
                        <p className="text-gray-400 leading-relaxed">You'll face a real business decision:</p>
                        <div className="space-y-3">
                            {[
                                { step: '1', text: 'Read the scenario: a customer offers a price BELOW your normal selling price' },
                                { step: '2', text: 'Check the Margin Analyser panel to see Revenue vs. Variable Cost' },
                                { step: '3', text: 'Decide: Accept the order (if contribution > 0) or Reject it' },
                                { step: '4', text: 'Read the explanation to understand the marginal costing logic' }
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="bg-cyber-lime text-midnight w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</span>
                                    <p className="text-white text-sm leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            },
            {
                tab: '💡 Tips',
                icon: <Lightbulb size={20} />,
                content: (
                    <div className="space-y-4">
                        <div className="p-4 bg-cyber-lime/5 rounded-2xl border border-cyber-lime/10">
                            <p className="text-cyber-lime font-bold text-sm italic mb-1">"The rent is already paid!"</p>
                            <p className="text-gray-400 text-xs">Fixed costs exist whether or not you accept this order. They are sunk for this decision.</p>
                        </div>
                        <div className="p-4 bg-cyber-lime/5 rounded-2xl border border-cyber-lime/10">
                            <p className="text-cyber-lime font-bold text-sm italic mb-1">"Every cent above variable cost is profit"</p>
                            <p className="text-gray-400 text-xs">If a special order's price ($0.60) exceeds the variable cost ($0.20), you earn $0.40 contribution per unit.</p>
                        </div>
                        <div className="p-4 bg-hot-pink/5 rounded-2xl border border-hot-pink/10">
                            <p className="text-hot-pink font-bold text-sm italic mb-1">⚠️ Assumptions</p>
                            <p className="text-gray-400 text-xs">This logic assumes: spare capacity exists, it won't affect normal sales, and it's a one-time order.</p>
                        </div>
                    </div>
                )
            }
        ]
    },
    3: {
        title: 'PHASE 3: THE COSTING DUEL',
        subtitle: 'Marginal vs Absorption — which tells the real story?',
        sections: [
            {
                tab: '📚 Concepts',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-5">
                        <p className="text-gray-400 leading-relaxed">
                            There are two major methods for calculating product cost. They treat <span className="text-white font-bold">fixed manufacturing overheads</span> differently.
                        </p>
                        <div className="p-5 rounded-2xl border bg-cyber-lime/10 border-cyber-lime/20">
                            <h4 className="font-black text-lg text-cyber-lime mb-2">Marginal Costing</h4>
                            <p className="text-white text-sm font-medium">Unit Cost = Variable costs only</p>
                            <p className="text-gray-400 text-xs mt-1">Fixed overheads are treated as a period cost — charged in full to the income statement in the period they occur.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-electric-purple/10 border-electric-purple/20">
                            <h4 className="font-black text-lg text-electric-purple mb-2">Absorption Costing</h4>
                            <p className="text-white text-sm font-medium">Unit Cost = Variable costs + Allocated fixed overhead per unit</p>
                            <p className="text-gray-400 text-xs mt-1">Fixed overheads are absorbed into each unit. Unsold units carry their fixed overhead into inventory.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-hot-pink/10 border-hot-pink/20">
                            <h4 className="font-black text-lg text-hot-pink mb-2">Why Profits Differ</h4>
                            <p className="text-gray-400 text-xs">When production ≠ sales, the two methods report different profits. Absorption costing defers fixed costs in closing inventory, making profit appear higher when production exceeds sales.</p>
                        </div>
                    </div>
                )
            },
            {
                tab: '🎮 How to Play',
                icon: <Gamepad2 size={20} />,
                content: (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            {[
                                { step: '1', text: 'You\'re given production data: units produced, units sold, variable cost, and total fixed overhead' },
                                { step: '2', text: 'Calculate the unit cost under Marginal Costing (variable cost only)' },
                                { step: '3', text: 'Calculate the unit cost under Absorption Costing (variable + fixed overhead per unit)' },
                                { step: '4', text: 'Enter your answers and verify them' },
                                { step: '5', text: 'Then analyze why the two methods show different profit figures' }
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="bg-cyber-lime text-midnight w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</span>
                                    <p className="text-white text-sm leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        ]
    },
    4: {
        title: 'PHASE 4: BREAK-EVEN CLIMB',
        subtitle: 'Find the point where you stop losing and start making money.',
        sections: [
            {
                tab: '📚 Concepts',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-5">
                        <p className="text-gray-400 leading-relaxed">
                            <span className="text-white font-bold">Cost-Volume-Profit (CVP) Analysis</span> examines how changes in costs and volume affect profit. The most important metric is the <span className="text-cyber-lime font-bold">Break-Even Point</span>.
                        </p>
                        <div className="p-5 rounded-2xl border bg-cyber-lime/10 border-cyber-lime/20">
                            <h4 className="font-black text-lg text-cyber-lime mb-2">Break-Even Point (BEP)</h4>
                            <p className="text-white text-sm font-medium">BEP (units) = Fixed Costs ÷ Contribution per Unit</p>
                            <p className="text-gray-400 text-xs mt-1">The BEP is where Total Revenue = Total Cost. Below it, you make a loss. Above it, you make a profit.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-electric-purple/10 border-electric-purple/20">
                            <h4 className="font-black text-lg text-electric-purple mb-2">Contribution per Unit</h4>
                            <p className="text-white text-sm font-medium">Contribution = Selling Price − Variable Cost per Unit</p>
                            <p className="text-gray-400 text-xs mt-1">This is the amount each unit contributes toward covering fixed costs and generating profit.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-white/5 border-white/10">
                            <h4 className="font-black text-lg text-white mb-2">Margin of Safety</h4>
                            <p className="text-gray-400 text-xs">The gap between actual/budgeted sales and the BEP. A higher margin of safety means lower risk.</p>
                        </div>
                    </div>
                )
            },
            {
                tab: '🎮 How to Play',
                icon: <Gamepad2 size={20} />,
                content: (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            {[
                                { step: '1', text: 'Use the sliders to adjust Selling Price, Variable Cost, and Fixed Costs' },
                                { step: '2', text: 'Watch the CVP chart update in real-time — Revenue line vs. Cost line' },
                                { step: '3', text: 'The Break-Even Point is shown where the two lines cross' },
                                { step: '4', text: 'Experiment: What happens when you increase the price? Lower variable costs? Reduce fixed costs?' }
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="bg-cyber-lime text-midnight w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</span>
                                    <p className="text-white text-sm leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        ]
    },
    5: {
        title: 'PHASE 5: THE MARKET STORM',
        subtitle: 'Your cost structure determines if you survive.',
        sections: [
            {
                tab: '📚 Concepts',
                icon: <BookOpen size={20} />,
                content: (
                    <div className="space-y-5">
                        <p className="text-gray-400 leading-relaxed">
                            <span className="text-white font-bold">Operating Leverage</span> measures how sensitive your profit is to changes in sales volume. It depends heavily on your cost structure.
                        </p>
                        <div className="p-5 rounded-2xl border bg-cyber-lime/10 border-cyber-lime/20">
                            <h4 className="font-black text-lg text-cyber-lime mb-2">High Fixed Costs (High Leverage)</h4>
                            <p className="text-gray-400 text-xs">Profits grow fast when sales increase, but losses mount quickly when sales drop. Like a lever — small changes in input cause big changes in output.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-electric-purple/10 border-electric-purple/20">
                            <h4 className="font-black text-lg text-electric-purple mb-2">High Variable Costs (Low Leverage)</h4>
                            <p className="text-gray-400 text-xs">Profits grow slowly but losses are limited during downturns. More flexible — costs naturally shrink when sales drop.</p>
                        </div>
                        <div className="p-5 rounded-2xl border bg-hot-pink/10 border-hot-pink/20">
                            <h4 className="font-black text-lg text-hot-pink mb-2">The Trade-Off</h4>
                            <p className="text-gray-400 text-xs">There's no "best" cost structure — it depends on market stability. Stable markets favor high leverage (automation). Volatile markets favor flexibility (manual labor).</p>
                        </div>
                    </div>
                )
            },
            {
                tab: '🎮 How to Play',
                icon: <Gamepad2 size={20} />,
                content: (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            {[
                                { step: '1', text: 'Choose between two business models: Hustle Core (low fixed, high variable) or Auto-Stacker (high fixed, low variable)' },
                                { step: '2', text: 'A recession hits — sales drop 50%!' },
                                { step: '3', text: 'Watch the simulation to see how your cost structure handles the downturn' },
                                { step: '4', text: 'Analyze the result: which model survived and why?' }
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="bg-cyber-lime text-midnight w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</span>
                                    <p className="text-white text-sm leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        ]
    }
}

export function Tutorial({ level, isOpen, onClose }) {
    const tutorial = TUTORIALS[level] || TUTORIALS[0]
    const [activeTab, setActiveTab] = useState(0)

    // Reset tab when level changes
    React.useEffect(() => {
        setActiveTab(0)
    }, [level])

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
                        className="fixed inset-0 bg-midnight/80 backdrop-blur-md z-[3000]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-4 md:inset-12 lg:inset-20 z-[3001] bg-midnight border-4 border-white neo-brutal shadow-none flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b-4 border-white/10 flex items-start justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyber-lime text-midnight rounded-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">{tutorial.title}</h2>
                                    <p className="text-sm text-gray-400 mt-1">{tutorial.subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-hot-pink rounded-xl transition-colors group flex-shrink-0"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex gap-2 p-4 md:px-8 border-b border-white/5 overflow-x-auto flex-shrink-0">
                            {tutorial.sections.map((section, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === i
                                            ? 'bg-cyber-lime text-midnight'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {section.tab}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tutorial.sections[activeTab]?.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-4 md:p-6 border-t-4 border-white/10 flex items-center justify-between flex-shrink-0">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                                    disabled={activeTab === 0}
                                    className="p-3 bg-white/5 rounded-xl hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setActiveTab(Math.min(tutorial.sections.length - 1, activeTab + 1))}
                                    disabled={activeTab === tutorial.sections.length - 1}
                                    className="p-3 bg-white/5 rounded-xl hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                {tutorial.sections.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all ${activeTab === i ? 'bg-cyber-lime w-6' : 'bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className="neo-button bg-cyber-lime text-midnight border-midnight py-3 px-8 text-sm"
                            >
                                {level === 0 ? 'START GAME →' : 'START PHASE →'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
