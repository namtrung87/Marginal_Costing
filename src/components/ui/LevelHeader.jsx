import React from 'react'
import { motion } from 'framer-motion'

export function LevelHeader({ icon: Icon, title, subtitle, colorClass = "bg-electric-purple", borderColorClass = "border-electric-purple/20" }) {
    return (
        <div className={`bento-card ${borderColorClass} flex flex-col md:flex-row items-center justify-between gap-8 py-8 transition-all duration-500`}>
            <div className="flex items-center gap-8">
                <div className={`p-6 rounded-[2rem] neo-brutal border-white ${colorClass}`}>
                    <Icon className="text-white" size={40} />
                </div>
                <div>
                    <h2 className="text-4xl text-white italic underline decoration-cyber-lime decoration-4 underline-offset-8 uppercase font-black">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
                <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Signal Stable</span>
                </div>
            </div>
        </div>
    )
}
