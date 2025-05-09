<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTelemetry } from '~/composables/useTelemetry'
const { data, isLoading, hasError, fetchTelemetry } = useTelemetry()

const manualJoint = ref(0)

const emit = defineEmits(['update:manualJoint'])
watch(manualJoint, (val) => {
  emit('update:manualJoint', Number(val))
})

onMounted(() => {
  fetchTelemetry()
})
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow flex flex-col gap-2">
    <button @click="fetchTelemetry" class="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Telemetry</button>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="hasError">Error loading telemetry.</div>
    <div v-else-if="data">
      <div>🔋 Battery: {{ data.battery.toFixed(0) }}%</div>
      <div>🌡️ Temp: {{ data.temperature.toFixed(1) }}°C</div>
      <div>🤖 Joints: {{ data.joints.map(j => j.toFixed(1)).join(', ') }}</div>
    </div>
    <div class="mt-4">
      <label for="joint-slider" class="block text-sm font-medium">Move Joint 1</label>
      <input
      id="joint-slider"
      v-model="manualJoint"
        type="range"
        min="-90"
        max="90"
        class="w-full"
      >
      <div>Joint 1 Angle: {{ manualJoint }}°</div>
    </div>
  </div>
</template>