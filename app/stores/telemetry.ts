import { defineStore } from 'pinia'
import { ref } from 'vue'

type Telemetry = {
  battery: number
  temperature: number
  joints: number[]
}

export const useTelemetryStore = defineStore('telemetry', () => {
  const data = ref<Telemetry | null>(null)
  const isLoading = ref(false)
  const hasError = ref(false)

  const fetchTelemetry = async () => {
    isLoading.value = true
    hasError.value = false
    try {
      const result = await $fetch<Telemetry>('/api/robot-telemetry')
      data.value = JSON.parse(JSON.stringify(result))
    } catch {
      hasError.value = true
    }
    isLoading.value = false
  }

  return { data, isLoading, hasError, fetchTelemetry }
})
