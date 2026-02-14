import { useState, useEffect } from 'react'
import { PhaseSummary } from './components/PhaseSummary'
import { GameSummary } from './components/GameSummary'
import { GameOver } from './components/GameOver'
import { LevelTransition } from './components/LevelTransition'
import { HandbookNotification } from './components/HandbookNotification'
import { initAudio, playSound, toggleMute } from './utils/sounds'
import { useGameStore } from './store/useGameStore'
import {
    Home,
    Volume2,
    VolumeX,
    BookOpen,
    Calculator as CalcIcon,
    Info,
    ChevronDown,
    LayoutGrid
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
    // Only destructure what ACTUALLY exists in the store
    const { level, cash, nextLevel, setLevel, isGameOver } = useGameStore()

    // All UI state managed locally to avoid store mismatch
    const [isCalcOpen, setIsCalcOpen] = useState(false)
    const [isHandbookOpen, setIsHandbookOpen] = useState(false)
    const [handbookTopic, setHandbookTopic] = useState(null)
    const [isTutorialOpen, setIsTutorialOpen] = useState(true)
    const [isMuted, setIsMuted] = useState(() => localStorage.getItem('mom_isMuted') === 'true')
    const [showPhaseSummary, setShowPhaseSummary] = useState(false)
    const [showGameSummary, setShowGameSummary] = useState(false)
    const [showTransition, setShowTransition] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openHandbook = (topic = null) => {
        setHandbookTopic(topic)
        setIsHandbookOpen(true)
    }

    // Show game summary when all levels are done
    useEffect(() => {
        if (level > 0 && level <= 5) {
            setShowPhaseSummary(false)
        }
        if (level === 6) {
            setShowGameSummary(true)
        }
    }, [level])

    const startMission = () => {
        initAudio()
        playSound('levelUp')
        setLevel(1)
        setShowTransition(true)
    }

    // Called when a level's gameplay is completed
    const handleLevelComplete = () => {
        setShowPhaseSummary(true)
    }

    // Called when "Next Mission" is clicked in PhaseSummary
    const advanceLevel = () => {
        setShowPhaseSummary(false)
        playSound('click')
        nextLevel()
        setShowTransition(true)
    }

    const closeTransition = () => {
        setShowTransition(false)
        setIsTutorialOpen(true)
    }

    const toggleAudio = () => {
        const muted = toggleMute()
        setIsMuted(muted)
    }

    const renderLevel = () => {
        switch (level) {
            case 1: return <Level1 onComplete={handleLevelComplete} />
            case 2: return <Level2 onComplete={handleLevelComplete} />
            case 3: return <Level3 onComplete={handleLevelComplete} />
            case 4: return <Level4 onComplete={handleLevelComplete} />
            case 5: return <Level5 onComplete={handleLevelComplete} />
            default: return (
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
                            MASTERY OF <br />
                            <span className="text-cyber-lime underline decoration-8 underline-offset-10">MARGINS</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-bold uppercase tracking-[0.5em] italic">
                            Financial Navigator Mode: ACTIVE
                        </p>
                    </motion.div>

                    <button
                        onClick={startMission}
                        className="neo-button bg-white text-midnight border-midnight text-3xl font-black italic px-20 py-8 hover:scale-105 transition-all shadow-[0_0_50px_rgba(173,255,47,0.3)]"
                    >
                        INITIALIZE AUDIT →
                    </button>

                    {/* Mission Selector */}
                    <div className="grid grid-cols-5 gap-4 mt-12">
                        {[1, 2, 3, 4, 5].map((mission) => (
                            <button
                                key={mission}
                                onClick={() => setLevel(mission)}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-cyber-lime hover:text-midnight transition-all group"
                            >
                                <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-midnight/50 block">Mission 0{mission}</span>
                                <span className="text-xl font-black italic">{
                                    mission === 1 ? 'CLASS' :
                                        mission === 2 ? 'BEHAV' :
                                            mission === 3 ? 'DUEL' :
                                                mission === 4 ? 'CHAOS' : 'FINAL'
                                }</span>
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="relative min-h-screen bg-midnight font-orbitron overflow-x-hidden text-white px-6 pb-40">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(173,255,47,0.03)_0%,transparent_100%)]" />
                <div className="absolute top-0 left-0 w-full h-1 bg-cyber-lime/10 animate-scanline" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* CRT Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] border-[40px] border-midnight/20 rounded-[100px] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

            {/* Navbar */}
            <nav className="relative z-50 max-w-7xl mx-auto py-10 flex justify-between items-center bg-midnight/50 backdrop-blur-xl border-x border-white/5 px-12 rounded-b-[3rem] mb-12 shadow-2xl">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setLevel(0)}
                        className="w-12 h-12 bg-cyber-lime text-midnight rounded-xl flex items-center justify-center font-black italic shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
                        title="Return to Headquarters"
                    >
                        <Home size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black italic tracking-tighter leading-none">MASTERY OF MARGINS</h1>
                        <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.4em] mt-1">Financial Navigator</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-8 mr-8 border-r border-white/10 pr-8">
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all font-black italic text-xs uppercase"
                            >
                                <LayoutGrid size={14} className="text-cyber-lime" />
                                <span>Phase Navigation</span>
                                <ChevronDown size={14} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-4 w-64 bg-midnight/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 z-[100]"
                                    >
                                        {[1, 2, 3, 4, 5].map((m) => (
                                            <button
                                                key={m}
                                                onClick={() => {
                                                    setLevel(m)
                                                    setIsMenuOpen(false)
                                                }}
                                                className={`w-full text-left p-4 hover:bg-cyber-lime hover:text-midnight rounded-xl transition-all group flex justify-between items-center ${level === m ? 'bg-cyber-lime/10 border border-cyber-lime/30' : ''}`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black uppercase opacity-60">Mission 0{m}</span>
                                                    <span className="text-sm font-black italic">{
                                                        m === 1 ? 'CLASSIFICATION' :
                                                            m === 2 ? 'MARGIN LOGIC' :
                                                                m === 3 ? 'COSTING DUEL' :
                                                                    m === 4 ? 'CHAOS BEP' : 'MARKET SHOCK'
                                                    }</span>
                                                </div>
                                                {level === m && <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="text-right">
                            <span className="text-[8px] text-gray-500 font-black uppercase block">Live Protocol</span>
                            <span className="text-sm font-black text-cyber-lime italic uppercase tracking-widest">{level > 0 ? `Mission 0${level}` : 'Standby'}</span>
                        </div>
                    </div>

                    <button
                        onClick={toggleAudio}
                        className={`p-4 rounded-xl transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>

                    <button
                        onClick={() => setIsTutorialOpen(true)}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Tutorial"
                    >
                        <Info size={24} />
                    </button>
                    <button
                        onClick={() => setIsCalcOpen(true)}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Calculator"
                    >
                        <CalcIcon size={24} />
                    </button>
                    <button
                        onClick={() => openHandbook()}
                        className="p-4 bg-cyber-lime text-midnight border-2 border-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                        title="Handbook"
                    >
                        <BookOpen size={24} />
                    </button>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={level}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        {renderLevel()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Overlays */}
            <HandbookNotification onOpenHandbook={openHandbook} />
            <Calculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
            <Handbook
                isOpen={isHandbookOpen}
                onClose={() => setIsHandbookOpen(false)}
                initialTopic={handbookTopic}
            />
            <Tutorial level={level} isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

            {/* Game State Transitions */}
            {showTransition && (
                <LevelTransition
                    level={level}
                    onComplete={closeTransition}
                />
            )}

            {showPhaseSummary && (
                <PhaseSummary
                    level={level}
                    onClose={advanceLevel}
                />
            )}

            {showGameSummary && (
                <GameSummary onClose={() => window.location.reload()} />
            )}

            {isGameOver && (
                <GameOver />
            )}

            <footer className="fixed bottom-8 left-0 w-full text-center z-20 pointer-events-none">
                <div className="inline-block px-6 py-2 bg-midnight/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                    {level > 0 ? `Phase ${level} Simulation Active` : 'System Standby'}
                </div>
            </footer>
        </div>
    )
}

export default App
