import { defineStore } from 'pinia'
import type { HeritageAudio } from '~/types'
import { MOCK_HERITAGES } from '~/data/mockHeritages'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.8)
  const isMuted = ref(false)
  const currentTrack = ref<HeritageAudio | null>(null)
  const heritageId = ref<string | null>(null)
  const errorMessage = ref('')
  const audioEl = shallowRef<HTMLAudioElement | null>(null)

  const isMiniPlayerVisible = ref(false)
  const isExpanded = ref(false)
  const isSpeechMode = ref(false)

  let speechUtterance: SpeechSynthesisUtterance | null = null
  let speechInterval: any = null

  // Computed
  const progressPercent = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
  )

  const formattedCurrentTime = computed(() => formatTime(currentTime.value))
  const formattedDuration = computed(() => formatTime(duration.value))

  function getSpeechText(): string {
    const heritage = MOCK_HERITAGES.find(h => h.id === heritageId.value)
    const rawText = heritage
      ? `${heritage.title}. ${heritage.shortDescription}. ${heritage.longStory}`
      : currentTrack.value?.title || ''

    return rawText
      .replace(/\*\*/g, '')
      .replace(/#/g, '')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  function activateSpeechSynthesis(audio: HeritageAudio, hId: string) {
    if (audioEl.value) {
      audioEl.value.pause()
      audioEl.value = null
    }

    isSpeechMode.value = true
    currentTrack.value = audio
    heritageId.value = hId
    errorMessage.value = 'Giọng đọc AI (Text-to-Speech)'
    isMiniPlayerVisible.value = true

    // Estimate duration based on word count
    const text = getSpeechText()
    const wordCount = text.split(/\s+/).length
    duration.value = Math.ceil(wordCount / 2.2) // ~130 words per minute

    if (isPlaying.value) {
      playSpeech()
    }
  }

  function playSpeech() {
    if (!import.meta.client) return

    if (window.speechSynthesis.paused && speechUtterance) {
      window.speechSynthesis.resume()
    } else {
      window.speechSynthesis.cancel()

      const text = getSpeechText()
      speechUtterance = new SpeechSynthesisUtterance(text)
      speechUtterance.lang = 'vi-VN'
      speechUtterance.rate = 0.95
      speechUtterance.volume = isMuted.value ? 0 : volume.value

      const voices = window.speechSynthesis.getVoices()
      const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'))
      if (viVoice) speechUtterance.voice = viVoice

      speechUtterance.onend = () => {
        isPlaying.value = false
        currentTime.value = 0
        clearInterval(speechInterval)
      }

      speechUtterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          isPlaying.value = false
          errorMessage.value = 'Không thể chạy giọng đọc AI.'
          clearInterval(speechInterval)
        }
      }

      window.speechSynthesis.speak(speechUtterance)
    }

    clearInterval(speechInterval)
    speechInterval = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        if (currentTime.value < duration.value) {
          currentTime.value += 1
        } else {
          isPlaying.value = false
          currentTime.value = 0
          clearInterval(speechInterval)
        }
      }
    }, 1000)
  }

  // Actions
  function loadTrack(audio: HeritageAudio, hId: string) {
    cleanupAudio()
    currentTrack.value = audio
    heritageId.value = hId
    currentTime.value = 0
    duration.value = audio.duration
    errorMessage.value = ''
    isMiniPlayerVisible.value = true
    isSpeechMode.value = false

    if (import.meta.client) {
      const player = new Audio(audio.url)
      player.preload = 'metadata'
      player.volume = isMuted.value ? 0 : volume.value

      player.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(player.duration)) duration.value = player.duration
      })
      player.addEventListener('timeupdate', () => {
        currentTime.value = player.currentTime
      })
      player.addEventListener('ended', () => {
        isPlaying.value = false
        currentTime.value = 0
      })
      player.addEventListener('error', () => {
        // Fallback to SpeechSynthesis
        activateSpeechSynthesis(audio, hId)
      })

      audioEl.value = player
    }
  }

  function play() {
    isPlaying.value = true
    if (isSpeechMode.value) {
      playSpeech()
    } else {
      errorMessage.value = ''
      audioEl.value?.play().catch(() => {
        // If playing audio fails, fall back to SpeechSynthesis
        if (currentTrack.value && heritageId.value) {
          activateSpeechSynthesis(currentTrack.value, heritageId.value)
          playSpeech()
        } else {
          isPlaying.value = false
          errorMessage.value = 'Trình duyệt chưa thể phát audio. Vui lòng thử lại.'
        }
      })
    }
  }

  function pause() {
    isPlaying.value = false
    if (isSpeechMode.value) {
      if (import.meta.client) {
        window.speechSynthesis.pause()
      }
      clearInterval(speechInterval)
    } else {
      audioEl.value?.pause()
    }
  }

  function togglePlay() {
    if (isPlaying.value) pause()
    else play()
  }

  function setCurrentTime(time: number) {
    const nextTime = Math.max(0, Math.min(time, duration.value))
    currentTime.value = nextTime
    if (isSpeechMode.value) {
      if (!import.meta.client) return
      
      const ratio = nextTime / duration.value
      const text = getSpeechText()
      const words = text.split(' ')
      const targetWordIndex = Math.floor(words.length * ratio)
      const remainingText = words.slice(targetWordIndex).join(' ')

      window.speechSynthesis.cancel()

      if (isPlaying.value) {
        speechUtterance = new SpeechSynthesisUtterance(remainingText)
        speechUtterance.lang = 'vi-VN'
        speechUtterance.rate = 0.95
        speechUtterance.volume = isMuted.value ? 0 : volume.value

        const voices = window.speechSynthesis.getVoices()
        const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'))
        if (viVoice) speechUtterance.voice = viVoice

        speechUtterance.onend = () => {
          isPlaying.value = false
          currentTime.value = 0
          clearInterval(speechInterval)
        }

        speechUtterance.onerror = (e) => {
          if (e.error !== 'interrupted') {
            isPlaying.value = false
            clearInterval(speechInterval)
          }
        }

        window.speechSynthesis.speak(speechUtterance)

        clearInterval(speechInterval)
        speechInterval = setInterval(() => {
          if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            if (currentTime.value < duration.value) {
              currentTime.value += 1
            } else {
              isPlaying.value = false
              currentTime.value = 0
              clearInterval(speechInterval)
            }
          }
        }, 1000)
      }
    } else {
      if (audioEl.value) audioEl.value.currentTime = nextTime
    }
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
    if (v > 0) isMuted.value = false
    
    if (isSpeechMode.value) {
      if (speechUtterance) {
        speechUtterance.volume = isMuted.value ? 0 : volume.value
      }
    } else {
      if (audioEl.value) audioEl.value.volume = isMuted.value ? 0 : volume.value
    }
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
    if (isSpeechMode.value) {
      if (speechUtterance) {
        speechUtterance.volume = isMuted.value ? 0 : volume.value
      }
    } else {
      if (audioEl.value) audioEl.value.volume = isMuted.value ? 0 : volume.value
    }
  }

  function skip(seconds: number) {
    setCurrentTime(currentTime.value + seconds)
  }

  function cleanupSpeech() {
    if (import.meta.client) {
      window.speechSynthesis.cancel()
    }
    clearInterval(speechInterval)
    isSpeechMode.value = false
    speechUtterance = null
  }

  function closeMiniPlayer() {
    isPlaying.value = false
    cleanupAudio()
    currentTrack.value = null
    heritageId.value = null
    errorMessage.value = ''
    isMiniPlayerVisible.value = false
    isExpanded.value = false
  }

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
  }

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function cleanupAudio() {
    cleanupSpeech()
    if (!audioEl.value) return
    audioEl.value.pause()
    audioEl.value.src = ''
    audioEl.value.load()
    audioEl.value = null
  }

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    heritageId,
    errorMessage,
    isMiniPlayerVisible,
    isExpanded,
    isSpeechMode,
    progressPercent,
    formattedCurrentTime,
    formattedDuration,
    loadTrack,
    play,
    pause,
    togglePlay,
    setCurrentTime,
    setVolume,
    toggleMute,
    skip,
    closeMiniPlayer,
    toggleExpanded,
  }
})
