import { motion } from 'framer-motion'
import { Trophy, Star, RefreshCcw, Share2, Award, AlertCircle } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { useState } from 'react'
import { Certificate } from './Certificate'

export function GameSummary({ onClose }) {
    const { score, mistakes, setLevel } = useGameStore()
    const [showCertificate, setShowCertificate] = useState(false)

    // Title & Badge Logic
    let rank = "JUNIOR ANALYST"
    let rankColor = "text-gray-400"
    let message = "Good start. Keep practicing your margins."

    if (score > 8000) { // Placeholder thresholds
        rank = "CFO MATERIAL"
        rankColor = "text-cyber-lime"
        message = "Absolutely legendary. You see the matrix of money."
    } else if (score > 5000) {
        rank = "COST CONTROLLER"
        rankColor = "text-electric-purple"
        message = "Solid performance. You know how to protect the bottom line."
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-midnight/95 backdrop-blur-md z-[2000] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-2xl bento-card bg-midnight border-4 border-white neo-brutal shadow-none p-8 md:p-12 text-center relative overflow-hidden"
            >
                {/* ... existing card contents ... */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-block p-6 rounded-full bg-white/5 border-2 border-white/20 mb-6"
                    >
                        <Award size={80} className={rankColor} />
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2 uppercase text-white">
                        GAME OVER
                    </h1>

                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">FINAL RANK</p>
                        <h2 className={`text-3xl md:text-5xl font-black italic tracking-tighter uppercase ${rankColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                            {rank}
                        </h2>
                    </div>

                    <p className="text-lg text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
                        {message}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">TOTAL SCORE</p>
                            <p className="text-3xl font-black text-white">{score.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">AUDIT INTEGRITY</p>
                            <p className="text-3xl font-black text-hot-pink">{useGameStore.getState().health}%</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 col-span-2 md:col-span-1">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">BALANCE</p>
                            <p className="text-3xl font-black text-cyber-lime">${(useGameStore.getState().cash / 1000).toFixed(1)}k</p>
                        </div>
                    </div>

                    {/* Gap Report / Performance Analysis */}
                    <div className="mb-10 text-left bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                            <AlertCircle size={14} /> Performance Gap Report
                        </h3>
                        <div className="space-y-3">
                            {Object.keys(useGameStore.getState().mistakeDetails).length === 0 ? (
                                <p className="text-cyber-lime font-bold italic">No weaknesses detected. You are ready for the real exam.</p>
                            ) : (
                                <>
                                    {useGameStore.getState().mistakeDetails['classification'] > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white">Cost Classification Logic</span>
                                            <span className="text-hot-pink font-bold">Needs Review</span>
                                        </div>
                                    )}
                                    {useGameStore.getState().mistakeDetails['absorption_logic'] > 0 || useGameStore.getState().mistakeDetails['calculating'] > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white">Absorption vs Marginal</span>
                                            <span className="text-hot-pink font-bold">Critical Gaps</span>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-4 pt-4 border-t border-white/5 italic">
                                        "Your gaps in Classification could cost you 15 marks in the final exam."
                                    </p>
                                    <button className="w-full mt-2 py-2 bg-electric-purple/20 text-electric-purple border border-electric-purple/50 rounded-lg text-xs font-black uppercase hover:bg-electric-purple hover:text-white transition-all">
                                        Get "Gap Filler" Module ($9)
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="py-4 px-8 rounded-xl font-bold uppercase tracking-wider bg-white text-midnight hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={20} /> Re-Initialize
                        </button>
                        <button
                            onClick={() => setShowCertificate(true)}
                            className="py-4 px-8 rounded-xl font-bold uppercase tracking-wider border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Share2 size={20} /> Generate Certificate
                        </button>
                    </div>
                </div>

                <Certificate
                    isOpen={showCertificate}
                    onClose={() => setShowCertificate(false)}
                    data={{ rank, score }}
                />
            </motion.div>
        </motion.div>
    )
}
