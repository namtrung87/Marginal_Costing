import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { playSound } from '../utils/sounds'
import { useEffect } from 'react'

export const GameOver = () => {
    const { resetGame, score, level } = useGameStore()

    useEffect(() => {
        playSound('fail')
    }, [])

    return (
        <div className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1a1a2e] border-2 border-red-500/50 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.3)]"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500">
                        <AlertTriangle size={40} className="text-red-500" />
                    </div>
                </div>

                <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter">
                    MISSION <span className="text-red-500">FAILED</span>
                </h2>

                <p className="text-gray-400 mb-8 leading-relaxed">
                    The company has run out of cash. The board has terminated your contract active immediately.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Phase Reached</div>
                        <div className="text-2xl font-black text-white">0{level}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total Score</div>
                        <div className="text-2xl font-black text-cyber-lime">{score}</div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        playSound('click')
                        resetGame()
                    }}
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <RefreshCw size={20} />
                    <span>RESTART SIMULATION</span>
                </button>
            </motion.div>
        </div>
    )
}
