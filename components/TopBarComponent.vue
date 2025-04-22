<template>
    <section class="bg-black h-8 px-1 fixed w-full flex flex-row justify-between items-center">
        <div class="flex flex-row gap-2 items-center hover:bg-gray-400/30 px-3 py-2 rounded-full transition-all">
            <div class="w-7 h-2 bg-white rounded-full"></div>
            <div class="w-[6px] h-[6px] bg-gray-400 rounded-full"></div>
        </div>
        <div class="text-white font-semibold px-2 rounded-full text-md hover:bg-gray-400/30 transition-all">
            {{ clock.currentTime }}
        </div>


        <div class="flex items-center hover:bg-gray-400/30 px-3 py-1 rounded-full transition-all">
            <!-- Single battery container, no nesting -->
            <div class="battery-container relative w-3 h-5 border border-white rounded-sm flex flex-col justify-end">
                <!-- Battery bump -->
                <div class="absolute top-[-1px] left-1/2 transform -translate-x-1/2 h-[1px] w-[3px] bg-white"></div>
                <!-- Battery fill (vertical) -->
                <div class="w-[calc(100%-2px)] mx-[1px] mb-[1px] rounded-sm transition-all duration-300" :class="{
                    'bg-green-500': battery.batteryPercentage > 50,
                    'bg-yellow-500': battery.batteryPercentage <= 50 && battery.batteryPercentage > 20,
                    'bg-red-500': battery.batteryPercentage <= 20
                }" :style="{ height: `${(battery.batteryPercentage / 100) * (100 - 10)}%` }"></div>
            </div>
            <span class="text-white text-xs ml-1">{{ battery.batteryPercentage }}%</span>
        </div>
    </section>
</template>
<script setup>
import { useClockStore } from '../stores/clockStore'
import { useBatteryStore } from '../stores/batteryStore'
import { onMounted, onBeforeUnmount } from 'vue'

const clock = useClockStore()
const battery = useBatteryStore()

onMounted(() => {
    clock.startClock()
    battery.setupBattery()
})

onBeforeUnmount(() => {
    clock.stopClock()
    battery.cleanupBattery()
})
</script>
