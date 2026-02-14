import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ShieldCheck, Download, X, Share2 } from 'lucide-react'

export function Certificate({ isOpen, onClose, data }) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[3000] bg-midnight/90 backdrop-blur-2xl flex items-center justify-center p-8"
            >
                <motion.div
                    initial={{ scale: 0.8, rotate: -2 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="max-w-4xl w-full bg-white text-midnight p-16 relative neo-brutal border-8 border-midnight shadow-[20px_20px_0px_0px_rgba(173,255,47,1)] flex flex-col items-center"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-300 hover:text-midnight transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="flex items-center gap-4 mb-12">
                        <Award size={48} className="text-cyber-lime" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">OFFICIAL ACCREDITATION</span>
                        <Award size={48} className="text-cyber-lime" />
                    </div>

                    <h1 className="text-6xl font-black italic uppercase tracking-tighter text-center mb-8 leading-none">
                        FINANCIAL <br /> NAVIGATOR
                    </h1>

                    <div className="w-full h-1 bg-midnight/10 mb-12" />

                    <div className="text-center space-y-6 mb-12">
                        <p className="text-xl font-bold uppercase tracking-widest text-gray-500 italic">This certifies that the agent has mastered</p>
                        <p className="text-5xl font-black italic underline decoration-8 underline-offset-8 decoration-cyber-lime uppercase">
                            OPERATIONAL COST CONTROL
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-16 w-full mb-16">
                        <div className="text-center border-r-2 border-midnight/5">
                            <p className="text-[10px] font-black uppercase text-gray-500 mb-2">FINAL RANK</p>
                            <p className="text-3xl font-black italic">{data.rank}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-gray-500 mb-2">AUDIT SCORE</p>
                            <p className="text-3xl font-black italic">{data.score.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-12 w-full justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 border-4 border-midnight rounded-full flex items-center justify-center mb-4">
                                <ShieldCheck size={64} className="text-cyber-lime" />
                            </div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Validated by Audit HQ</p>
                        </div>
                    </div>

                    <div className="mt-16 flex gap-4 w-full">
                        <button className="flex-1 py-6 bg-midnight text-white font-black uppercase italic tracking-widest flex items-center justify-center gap-4 hover:bg-cyber-lime hover:text-midnight transition-all">
                            <Download size={24} /> Download PDF
                        </button>
                        <button className="flex-1 py-6 border-4 border-midnight text-midnight font-black uppercase italic tracking-widest flex items-center justify-center gap-4 hover:bg-midnight hover:text-white transition-all">
                            <Share2 size={24} /> Share Success
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
