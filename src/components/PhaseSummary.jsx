import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, AlertCircle, ArrowRight, RefreshCcw } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

export function PhaseSummary({ level, onClose }) {
    const { phaseStats, nextLevel, setLevel } = useGameStore()
    const stats = phaseStats[level] || { mistakes: 0, score: 0 }

    const isPerfect = stats.mistakes === 0
    const isGood = stats.mistakes <= 2

    let title = "PHASE COMPLETE!"
    let message = "Solid work. You're getting the hang of this."
    let stars = 2

    if (isPerfect) {
        title = "PERFECT RUN!"
        message = "Flawless execution. You clearly know your margins."
        stars = 3
    } else if (!isGood) {
        title = "PHASE COMPLETE"
        message = "You made it through, but watch those mistakes. Costing errors kill profit."
        stars = 1
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-midnight/90 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-md bento-card bg-midnight border-4 border-white neo-brutal shadow-none p-8 text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Trophy size={64} className={isPerfect ? 'text-cyber-lime' : isGood ? 'text-electric-purple' : 'text-gray-500'} />
                        {isPerfect && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute -top-2 -right-2 bg-hot-pink text-white text-xs font-black px-2 py-1 rounded-full border-2 border-white"
                            >
                                S-RANK
                            </motion.div>
                        )}
                    </div>
                </div>

                <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">{title}</h2>
                <p className="text-gray-400 mb-8">{message}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">MISTAKES</p>
                        <p className={`text-2xl font-black ${stats.mistakes === 0 ? 'text-cyber-lime' : 'text-hot-pink'}`}>
                            {stats.mistakes}
                        </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">RATING</p>
                        <div className="flex justify-center gap-1 mt-1">
                            {[1, 2, 3].map(i => (
                                <Star
                                    key={i}
                                    size={20}
                                    className={`${i <= stars ? 'fill-current text-cyber-lime' : 'text-gray-700'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            // Reset level stats logic would go here if we had a reset action
                            // For now just close to let them review (or we could reload level)
                            window.location.reload() // Simple retry for prototype
                        }}
                        className="flex-1 py-4 rounded-xl font-bold uppercase tracking-wider border-2 border-white/10 hover:bg-white/5 hover:border-white/30 transition-all text-sm flex items-center justify-center gap-2"
                    >
                        <RefreshCcw size={16} /> Retry Phase
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-[2] py-4 rounded-xl font-black uppercase tracking-wider bg-cyber-lime text-midnight border-2 border-midnight hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2"
                    >
                        Next Mission <ArrowRight size={16} />
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <button
                        onClick={() => window.open('https://discord.gg/financial-mastery', '_blank')}
                        className="text-gray-400 hover:text-white text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 w-full transition-colors"
                    >
                        Need the solution? <span className="text-electric-purple underline">Join the Audit HQ (Discord)</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
