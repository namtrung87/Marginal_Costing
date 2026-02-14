import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

export function MentorMessage({ message, type = "info" }) {
    if (!message) return null;

    const colors = {
        info: "text-cyber-lime border-cyber-lime/30 bg-cyber-lime/5",
        warning: "text-hot-pink border-hot-pink/30 bg-hot-pink/5",
        success: "text-electric-purple border-electric-purple/30 bg-electric-purple/5"
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-6 rounded-[2rem] border-2 ${colors[type]} flex gap-4 items-start backdrop-blur-md`}
            >
                <div className="mt-1">
                    <Terminal size={20} />
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 block">Advisor Feedback</span>
                    <p className="font-bold leading-snug text-sm md:text-base">
                        {message}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
