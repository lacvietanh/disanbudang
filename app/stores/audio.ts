import { defineStore } from 'pinia'
import type { AudioPlayerState, HeritageAudio } from '~/types'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.8)
  const isMuted = ref(false)
  const currentTrack = ref<HeritageAudio | null>(null)
  const heritageId = ref<string | null>(null)

  const isMiniPlayerVisible = ref(false)
  const isExpanded = ref(false)

  // Computed
  const progressPercent = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
  )

  const formattedCurrentTime = computed(() => formatTime(currentTime.value))
  const formattedDuration = computed(() => formatTime(duration.value))

  // Actions
  function loadTrack(audio: HeritageAudio, hId: string) {
    currentTrack.value = audio
    heritageId.value = hId
    currentTime.value = 0
    duration.value = audio.duration
    isMiniPlayerVisible.value = true
  }

  function play() {
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function setCurrentTime(time: number) {
    currentTime.value = Math.max(0, Math.min(time, duration.value))
  }

  function setVolume(v: number) {
    volume.value = Math.max(0, Math.min(1, v))
    if (v > 0) isMuted.value = false
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  function skip(seconds: number) {
    setCurrentTime(currentTime.value + seconds)
  }

  function closeMiniPlayer() {
    isPlaying.value = false
    currentTrack.value = null
    heritageId.value = null
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

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    heritageId,
    isMiniPlayerVisible,
    isExpanded,
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
