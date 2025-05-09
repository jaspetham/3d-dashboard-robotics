<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { useResizeObserver } from '@vueuse/core'

type Props = {
  manualJoint?: number
}
const props = withDefaults(defineProps<Props>(), {
  manualJoint: 0
})

const container = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let robot: THREE.Group

const resizeRenderer = () => {
  if (!container.value || !renderer || !camera) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

onMounted(() => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  if (container.value) {
    container.value.appendChild(renderer.domElement)
    resizeRenderer()
  }
  robot = new THREE.Group()
  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
  robot.add(body)
  scene.add(robot)
  camera.position.z = 5
  animate()
})

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

watch(() => props.manualJoint, (angle) => {
  if (robot) robot.rotation.y = (angle || 0) * Math.PI / 180
})

useResizeObserver(container, resizeRenderer)

onBeforeUnmount(() => {
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div ref="container" class="w-full h-full bg-gray-900 rounded-lg"></div>
</template>