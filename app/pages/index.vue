<script lang="ts" setup>
import { ref } from "vue";
const manualJoint = ref(0);
</script>
<template>
    <div class="min-h-screen flex flex-col md:flex-row gap-4 p-4 bg-gray-100">
        <div class="w-full md:w-1/2 flex flex-col gap-4">
            <div class="flex-1">
                <TelemetryChart />
            </div>
            <div class="flex-1 flex items-end">
                <TelemetryPanel v-model:manualJoint="manualJoint" class="w-full h-full" />
            </div>
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center">
            <Robot3DView :manualJoint="manualJoint" class="w-full" />
        </div>
    </div>
</template>

<style>
</style>
