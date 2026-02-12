import { useState, useEffect } from 'react'
import { PhaseSummary } from './components/PhaseSummary'
import { GameSummary } from './components/GameSummary'
import { initAudio, sounds, playSound, toggleMute } from './utils/sounds'
import { useGameStore } from './store/useGameStore'
import {
    Home,
    Volume2,
    VolumeX,
    BookOpen,
    Calculator as CalcIcon,
    Menu,
    Target,
    Zap,
    HelpCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Level1 } from './components/Level1'
import { Level2 } from './components/Level2'
import { Level3 } from './components/Level3'
import { Level4 } from './components/Level4'
import { Level5 } from './components/Level5'
import { Calculator } from './components/Calculator'
import { Handbook } from './components/Handbook'
import { Tutorial } from './components/Tutorial'

function App() {
    const { level, cash, nextLevel, setLevel } = useGameStore()
    const [isCalcOpen, setIsCalcOpen] = useState(false)
    const [isHandbookOpen, setIsHandbookOpen] = useState(false)
    const [isTutorialOpen, setIsTutorialOpen] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showPhaseSummary, setShowPhaseSummary] = useState(false)
    const [showGameSummary, setShowGameSummary] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Auto-open tutorial on level change
    useEffect(() => {
        if (level > 0 && level <= 5) {
            setIsTutorialOpen(true)
            setShowPhaseSummary(false) // Hide summary when starting new level
        }
        if (level === 6) {
            setShowGameSummary(true)
        }
    }, [level])

    const handleNextLevel = () => {
        // Show summary instead of immediately advancing
        setShowPhaseSummary(true)
    }

    const advanceLevel = () => {
        setShowPhaseSummary(false)
        playSound('click')
        nextLevel()
    }

    const startMission = () => {
        initAudio()
        playSound('levelUp')
        nextLevel()
    }

    const toggleAudio = () => {
        const muted = toggleMute()
        setIsMuted(muted)
    }

    const renderLevel = () => {
        switch (level) {
            case 1: return <Level1 onComplete={() => setShowPhaseSummary(true)} />
            case 2: return <Level2 onComplete={() => setShowPhaseSummary(true)} />
            case 3: return <Level3 onComplete={() => setShowPhaseSummary(true)} />
            case 4: return <Level4 onComplete={() => setShowPhaseSummary(true)} />
            case 5: return <Level5 onComplete={() => setShowPhaseSummary(true)} />
            default: return (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-12 py-12"
                >
                    <div className="bento-card border-none bg-white/5 ring-1 ring-white/10">
                        <h2 className="text-6xl mb-6 font-black text-cyber-lime leading-none italic">
                            PROLOGUE
                        </h2>
                        <p className="text-xl leading-relaxed text-gray-400 max-w-2xl mx-auto font-light">
                            Ditch the spreadsheets. Master the <span className="text-white font-bold underline decoration-electric-purple decoration-4">MARGIN</span>.
                            The corporate world is chasing ghosts, but you? You're chasing real profit.
                        </p>
                    </div>

                    <button
                        onClick={startMission}
                        className="neo-button bg-electric-purple border-cyber-lime hover:bg-cyber-lime hover:text-midnight transition-colors"
                    >
                        Launch Mission
                    </button>

                    <div className="mt-12 flex justify-center">
                        <img src="/mentor_avatar.png" alt="Mentor AI" className="w-32 h-32 rounded-full border-4 border-cyber-lime shadow-[0_0_30px_rgba(204,255,0,0.3)]" />
                    </div>
                </motion.div>
            )
        }
    }

    return (
        <div className="relative min-h-screen bg-midnight overflow-x-hidden text-white px-6 pb-20">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-electric-purple/20 rounded-full blur-[120px] animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyber-lime/10 rounded-full blur-[150px] animate-blob" style={{ animationDelay: '-5s' }} />

            {/* Modern Menu Bar / Navbar */}
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-4xl px-4">
                <div className="bg-midnight/60 backdrop-blur-2xl border-4 border-white neo-brutal shadow-none p-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setLevel(0)}
                            className="p-3 hover:bg-cyber-lime hover:text-midnight rounded-xl transition-all active:scale-90"
                        >
                            <Home size={24} />
                        </button>
                        <div className="h-8 w-[2px] bg-white/10" />
                        <h1 className="text-xl font-black italic hidden md:block tracking-tighter">
                            MASTERY<span className="text-electric-purple">.</span>MARGINS
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleAudio}
                            className={`p-3 rounded-xl transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <button
                            onClick={() => setIsHandbookOpen(true)}
                            className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                        >
                            <BookOpen size={20} className="group-hover:text-cyber-lime" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Handbook</span>
                        </button>

                        <button
                            onClick={() => setIsCalcOpen(true)}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                        >
                            <CalcIcon size={20} />
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 bg-cyber-lime text-midnight rounded-xl hover:scale-105 active:scale-95 transition-all"
                        >
                            <Menu size={20} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Level Breadcrumbs / Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-4 right-4 mt-4 bento-card border-none bg-midnight/90 ring-4 ring-white shadow-none p-8"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
                                {[1, 2, 3, 4, 5].map(lv => (
                                    <button
                                        key={lv}
                                        onClick={() => { setLevel(lv); setIsMenuOpen(false); }}
                                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${level === lv
                                            ? 'border-cyber-lime bg-cyber-lime/10'
                                            : 'border-white/10 hover:border-white/40'
                                            }`}
                                    >
                                        <span className="text-[10px] font-black text-gray-500 uppercase">Phase {lv}</span>
                                        <span className={`text-2xl font-black italic ${level === lv ? 'text-white' : 'text-gray-400'}`}>0{lv}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Stats Header (Pushed down by fixed nav) */}
            <header className="relative z-10 max-w-6xl mx-auto pt-44 pb-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="glass-stat">
                        <Target className="text-electric-purple" size={20} />
                        <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">MODE</span>
                        <span className="text-white text-xl">SIMULATION</span>
                    </div>
                    <div className="glass-stat">
                        <Zap className="text-cyber-lime" size={20} />
                        <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">BALANCE</span>
                        <span className="text-white text-xl">${cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-cyber-lime overflow-hidden bg-cyber-lime/10 flex items-center justify-center">
                        <img
                            src="/mentor_avatar.png"
                            alt="Mentor"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyber-lime"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>'
                            }}
                        />
                    </div>
                    <button
                        onClick={() => setIsTutorialOpen(true)}
                        className="flex items-center gap-3 px-6 py-3 bg-cyber-lime/10 text-cyber-lime rounded-full border border-cyber-lime/20 hover:bg-cyber-lime/20 transition-all"
                    >
                        <HelpCircle size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-bold italic">Need Advice?</span>
                    </button>
                </div>
            </header>

            <main className="relative z-10 max-w-6xl mx-auto min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={level}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        {renderLevel()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Overlays */}
            <Calculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
            <Handbook isOpen={isHandbookOpen} onClose={() => setIsHandbookOpen(false)} />
            <Tutorial level={level} isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

            {showPhaseSummary && (
                <PhaseSummary
                    level={level}
                    onClose={advanceLevel}
                />
            )}

            {showGameSummary && (
                <GameSummary onClose={() => window.location.reload()} />
            )}

            <footer className="fixed bottom-8 left-0 w-full text-center z-20 pointer-events-none">
                <div className="inline-block px-6 py-2 bg-midnight/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                    Phase {level} Mission Active
                </div>
            </footer>
        </div>
    )
}

export default App
