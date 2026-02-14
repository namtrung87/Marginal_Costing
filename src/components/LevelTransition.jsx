import { motion } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const TRANSITIONS = {
    1: {
        subject: "Welcome aboard, Manager",
        from: "Director of Operations <director@techgear.corp>",
        body: "Glad to have you on the team. Our factory floor is a mess. We don't even know which costs are fixed and which are variable.\n\nYour first task is simple: Review the ledger and classify our costs. Don't mess this up.",
        objective: "Classify Costs Correctly"
    },
    2: {
        subject: "New Product Launch: X-Pad",
        from: "Marketing Dept <marketing@techgear.corp>",
        body: "The R&D team just finished the X-Pad prototype. We need to set a price that covers our costs and generates a decent margin.\n\nThe board is watching. Make sure we break even at a reasonable volume.",
        objective: "Achieve Target Profit"
    },
    3: {
        subject: "URGENT: Special Order Inquiry",
        from: "Sales Team <sales@techgear.corp>",
        body: "A large retailer wants to buy 200 units, but they're asking for a steep discount. The price is BELOW our normal selling price.\n\nMy gut says reject it, but you're the numbers person. Do the math. If it adds to the bottom line, take it.",
        objective: "Make the Right Decision"
    },
    4: {
        subject: "Q3 Board Meeting Prep",
        from: "CFO <cfo@techgear.corp>",
        body: "Profits are down despite high sales. The board is confused. They think we should be making more money based on the absorption costing reports.\n\nYou need to explain the difference between Marginal and Absorption costing. Show them where the profit went.",
        objective: "Reconcile Profit Figures"
    },
    5: {
        subject: "The Final Test",
        from: "CEO <ceo@techgear.corp>",
        body: "You've done well so far. But the market is turning. We need a comprehensive strategy for the next fiscal year.\n\nPull everything together. Optimization is key.",
        objective: "Maximize Total Valuation"
    }
}

export const LevelTransition = ({ level, onComplete }) => {
    const [typedBody, setTypedBody] = useState('')
    const content = TRANSITIONS[level] || TRANSITIONS[1]
    const fullBody = content.body

    // Typewriter effect
    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setTypedBody(fullBody.slice(0, i + 1))
            i++
            if (i > fullBody.length) clearInterval(interval)
        }, 15) // Speed of typing
        return () => clearInterval(interval)
    }, [fullBody])

    return (
        <div className="fixed inset-0 z-[2500] bg-black flex items-center justify-center p-6 font-mono">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-[#0a0a1f] border border-cyber-lime/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.1)]"
            >
                {/* Email Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyber-lime">
                        <Mail size={20} />
                        <span className="font-bold text-sm tracking-widest uppercase">Encrypted Message</span>
                    </div>
                    <div className="text-gray-500 text-xs">SECURE CONNECTION ESTABLISHED</div>
                </div>

                {/* Email Metadata */}
                <div className="p-6 space-y-2 border-b border-white/5">
                    <div className="flex gap-4">
                        <span className="text-gray-500 w-20 text-right">SUBJECT:</span>
                        <span className="text-white font-bold">{content.subject}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-gray-500 w-20 text-right">FROM:</span>
                        <span className="text-cyber-lime">{content.from}</span>
                    </div>
                </div>

                {/* Email Body */}
                <div className="p-8 min-h-[200px] text-gray-300 whitespace-pre-line leading-relaxed">
                    {typedBody}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-cyber-lime ml-1 align-middle"
                    />
                </div>

                {/* Footer / Action */}
                <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-electric-purple" />
                        <span className="text-sm font-bold text-gray-400">OBJECTIVE: <span className="text-white">{content.objective}</span></span>
                    </div>

                    <button
                        onClick={onComplete}
                        className="px-8 py-3 bg-cyber-lime hover:bg-white hover:text-black text-midnight font-black uppercase tracking-widest rounded-sm transition-all flex items-center gap-2"
                    >
                        Accept Mission <ArrowRight size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
