import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, X } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { playSound } from '../utils/sounds'

export function HandbookNotification({ onOpenHandbook }) {
    const { suggestedTopic, clearSuggestion } = useGameStore()

    useEffect(() => {
        if (suggestedTopic) {
            playSound('success') // Or a subtle hint sound
        }
    }, [suggestedTopic])

    return (
        <AnimatePresence>
            {suggestedTopic && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    className="fixed bottom-24 right-8 z-[1000] flex flex-col items-end gap-4"
                >
                    <div className="bento-card border-none bg-cyber-lime text-midnight p-6 neo-brutal border-midnight flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="p-3 bg-midnight text-cyber-lime rounded-xl">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Insight Available</p>
                            <h4 className="text-xl font-black italic uppercase leading-none">Review {suggestedTopic.toUpperCase()}?</h4>
                        </div>
                        <div className="flex gap-2 ml-4">
                            <button
                                onClick={() => {
                                    onOpenHandbook(suggestedTopic)
                                    clearSuggestion()
                                }}
                                className="px-6 py-2 bg-midnight text-white font-black uppercase text-xs rounded-full hover:scale-105 active:scale-95 transition-all"
                            >
                                Open
                            </button>
                            <button
                                onClick={clearSuggestion}
                                className="p-2 hover:bg-midnight/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
