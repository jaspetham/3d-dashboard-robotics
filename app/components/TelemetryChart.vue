<script setup lang="ts">
import { ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart,
  registerables
} from 'chart.js'
import { useTelemetry } from '~/composables/useTelemetry'

Chart.register(...registerables)
const { data } = useTelemetry()
const chartData = ref({
  labels: Array.from({ length: 10 }, (_, i) => `${i + 1}`),
  datasets: [
    {
      label: 'Battery',
      data: Array(10).fill(0),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
    },
    {
      label: 'Temperature',
      data: Array(10).fill(0),
      borderColor: '#f59e42',
      backgroundColor: 'rgba(245,158,66,0.2)',
    },
    {
      label: 'Joint 1',
      data: Array(10).fill(0),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.2)',
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: false },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Sample',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
}

watch(data, (telemetry) => {
  if (!telemetry) return
  const [batterySet, tempSet, jointSet] = chartData.value.datasets
  if (!batterySet || !tempSet || !jointSet) return
  const newBattery = [...batterySet.data, Number(telemetry.battery)]
  if (newBattery.length > 10) newBattery.shift()
  batterySet.data = newBattery
  const newTemp = [...tempSet.data, Number(telemetry.temperature)]
  if (newTemp.length > 10) newTemp.shift()
  tempSet.data = newTemp
  const newJoint = [...jointSet.data, Number(telemetry.joints[0] ?? 0)]
  if (newJoint.length > 10) newJoint.shift()
  jointSet.data = newJoint

})
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <Line :data="chartData" :options="chartOptions" :key="JSON.stringify(chartData)" />
  </div>
</template>