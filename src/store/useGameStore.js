import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
    level: 0,
    cash: 1000,
    inventory: 0,
    productionCapacity: 1000,

    // Cost Data
    costs: {
        fixed: 100,
        variablePerUnit: 0.20,
        stepFixed: 50,
        unitsPerStep: 50,
        semiFixedBase: 20,
        semiVarRate: 0.05
    },

    // Game State & Stats
    isGameOver: false,
    score: 0,
    mistakes: 0,
    health: 100, // Represents Safety Margin / Audit Risk Tolerance
    suggestedTopic: null,
    feedback: null,
    phaseStats: {},
    mistakeDetails: {}, // Tracks specific weaknesses for Gap Report

    // Actions
    setLevel: (level) => set({ level }),
    nextLevel: () => set((state) => ({ level: state.level + 1 })),

    addCash: (amount) => set((state) => {
        const newCash = state.cash + amount
        return {
            cash: newCash,
            isGameOver: newCash < 0
        }
    }),

    resetGame: () => set({
        level: 0,
        cash: 1000,
        isGameOver: false,
        score: 0,
        mistakes: 0,
        health: 100,
        suggestedTopic: null,
        feedback: null,
        phaseStats: {},
        mistakeDetails: {}
    }),

    addScore: (points) => set((state) => ({ score: state.score + points })),

    // topicId: 'fixed_cost', 'calculation', etc. | severity: % health damage
    recordMistake: (topicId = 'general', severity = 10) => set((state) => {
        const currentPhase = state.level;
        const currentStats = state.phaseStats[currentPhase] || { mistakes: 0, score: 0 };
        const newHealth = Math.max(0, state.health - severity);

        return {
            mistakes: state.mistakes + 1,
            health: newHealth,
            isGameOver: newHealth <= 0,
            mistakeDetails: {
                ...state.mistakeDetails,
                [topicId]: (state.mistakeDetails[topicId] || 0) + 1
            },
            phaseStats: {
                ...state.phaseStats,
                [currentPhase]: { ...currentStats, mistakes: currentStats.mistakes + 1 }
            }
        };
    }),

    setFeedback: (feedback) => set({ feedback }),
    clearFeedback: () => set({ feedback: null }),

    // Cost Calculation Utilities
    calculateTotalCost: (units) => {
        const { costs } = get()
        const fixed = costs.fixed
        const variable = units * costs.variablePerUnit
        const steps = Math.ceil(units / costs.unitsPerStep)
        const stepFixedTotal = steps * costs.stepFixed
        const semiVariable = costs.semiFixedBase + (units > 0 ? costs.semiVarRate * 8 : 0) // Simplified semi-var for now

        return {
            fixed,
            variable,
            stepFixed: stepFixedTotal,
            semiVariable,
            total: fixed + variable + stepFixedTotal + semiVariable
        }
    },

    calculateMarginalCostPerUnit: () => {
        return get().costs.variablePerUnit
    }
}))
