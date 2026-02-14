import { Howl, Howler } from 'howler'

// Placeholder sounds - these are just for structure. 
// In a real app, you'd use local files like '/sounds/bgm.mp3'
export const sounds = {
    // UI Sounds
    click: new Howl({ src: ['https://actions.google.com/sounds/v1/foley/button_click.ogg'], volume: 0.5 }),
    success: new Howl({ src: ['https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'], volume: 0.5 }),
    fail: new Howl({ src: ['https://actions.google.com/sounds/v1/cartoon/clank_car_crash.ogg'], volume: 0.3 }),
    levelUp: new Howl({ src: ['https://actions.google.com/sounds/v1/cartoon/bell_ring_old_school.ogg'], volume: 0.4 }),

    // Ambient Background (Looping)
    bgm: new Howl({
        src: ['https://actions.google.com/sounds/v1/science_fiction/scifi_drone.ogg'],
        html5: true, // Force HTML5 Audio to allow streaming large files
        loop: true,
        volume: 0.1
    }),
}

export const playSound = (soundName) => {
    try {
        if (sounds[soundName]) {
            sounds[soundName].play()
        }
    } catch (e) {
        console.warn('Audio play failed:', e)
    }
}

export const toggleMute = () => {
    try {
        const isMuted = !Howler._muted
        Howler.mute(isMuted)
        localStorage.setItem('mom_isMuted', isMuted)

        // Ensure BGM plays if unmuted
        if (!isMuted && sounds.bgm.state() === 'loaded' && !sounds.bgm.playing()) {
            sounds.bgm.play()
        }

        return isMuted
    } catch (e) {
        console.warn('Audio toggle failed:', e)
        return false
    }
}

export const initAudio = () => {
    try {
        // Restore mute state
        const savedMuted = localStorage.getItem('mom_isMuted') === 'true'
        if (savedMuted) {
            Howler.mute(true)
        }

        if (sounds.bgm.state() === 'loaded' && !sounds.bgm.playing()) {
            sounds.bgm.play()
        } else if (sounds.bgm.state() === 'unloaded') {
            sounds.bgm.load()
            sounds.bgm.once('load', () => {
                if (!Howler._muted) sounds.bgm.play()
            })
        }
    } catch (e) {
        console.warn('Audio init failed:', e)
    }
}
