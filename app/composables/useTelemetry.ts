import { storeToRefs } from 'pinia'
import { useTelemetryStore } from '~/stores/telemetry'

export const useTelemetry = () => {
  const store = useTelemetryStore()
  const { data, isLoading, hasError } = storeToRefs(store)
  return { data, isLoading, hasError, fetchTelemetry: store.fetchTelemetry }
}