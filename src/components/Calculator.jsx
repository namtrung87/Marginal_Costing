import React, { useState } from 'react'
import { Calculator as CalcIcon, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Calculator({ isOpen, onClose }) {
    const [display, setDisplay] = useState('0')
    const [equation, setEquation] = useState('')

    const handleKey = (key) => {
        if (key === 'C') {
            setDisplay('0')
            setEquation('')
            return
        }

        if (key === '=') {
            try {
                const result = eval(equation.replace('x', '*').replace('÷', '/'))
                setDisplay(Number(result.toFixed(4)).toString())
                setEquation(equation + ' = ' + result)
            } catch (e) {
                setDisplay('ERR')
            }
            return
        }

        if (display === '0' || display === 'ERR') {
            setDisplay(key)
            setEquation(key)
        } else {
            setDisplay(display + key)
            setEquation(equation + key)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    className="fixed bottom-12 right-12 z-[1000] w-80 bg-white neo-brutal border-midnight p-8"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-midnight rounded-xl text-cyber-lime">
                                <Zap size={16} fill="currentColor" />
                            </div>
                            <span className="text-xs font-black text-midnight tracking-widest uppercase italic">CALC-U-TRON</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-midnight hover:text-hot-pink transition-colors p-2"
                        >
                            <X size={24} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="bg-midnight p-6 mb-8 text-right overflow-hidden rounded-3xl border-4 border-midnight ring-4 ring-white shadow-inner">
                        <div className="text-[10px] text-gray-600 font-bold h-4 truncate uppercase tracking-widest">{equation || 'System Idle'}</div>
                        <div className="text-5xl text-white font-black italic tracking-tighter truncate mt-2">{display}</div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {['7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', 'C', '+'].map(key => (
                            <button
                                key={key}
                                onClick={() => handleKey(key)}
                                className={`p-4 text-lg font-black italic rounded-2xl transition-all active:scale-95 ${['÷', 'x', '-', '+', 'C'].includes(key)
                                        ? 'bg-electric-purple text-white hover:bg-hot-pink'
                                        : 'bg-gray-100 text-midnight hover:bg-cyber-lime'
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                        <button
                            onClick={() => handleKey('=')}
                            className="col-span-4 bg-cyber-lime text-midnight p-6 text-xl font-black italic rounded-2xl neo-brutal border-midnight hover:translate-x-0 hover:translate-y-0 active:scale-95 mt-2"
                        >
                            SOLVE →
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
