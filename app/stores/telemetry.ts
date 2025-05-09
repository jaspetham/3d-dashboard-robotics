import { defineStore } from 'pinia'

type Telemetry = {
  battery: number
  temperature: number
  joints: number[]
}

export const useTelemetryStore = defineStore('telemetry', {
  state: () => ({
    data: null as Telemetry | null,
    isLoading: false,
    hasError: false,
  }),
  actions: {
    async fetchTelemetry() {
      this.isLoading = true
      this.hasError = false
      try {
        const result = await $fetch<Telemetry>('/api/robot-telemetry')
        this.data = JSON.parse(JSON.stringify(result))
      } catch {
        this.hasError = true
      }
      this.isLoading = false
    },
  },
})
