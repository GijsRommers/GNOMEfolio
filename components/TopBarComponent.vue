<template>
    <section class="bg-black h-8 px-1 fixed w-full flex flex-row justify-between items-center">
        <div class="flex flex-row gap-2 items-center hover:bg-gray-400/30 px-3 py-2 rounded-full transition-all">
            <div class="w-7 h-2 bg-white rounded-full"></div>
            <div class="w-[6px] h-[6px] bg-gray-400 rounded-full"></div>
        </div>
        <div class="text-white font-semibold px-2 rounded-full hover:bg-gray-400/30 transition-all">
            {{ clock.currentTime }}
        </div>
        <div>
            <div class="flex items-center gap-2 text-white px-3 py-1 rounded-full hover:bg-gray-400/30 transition-all">
                <div class="battery-icon relative">
                    <svg width="20" height="20" viewBox="0 0 24 24" :class="battery.batteryIconClass">
                        <path v-if="battery.isCharging"
                            d="M12,20H4V6h8V20z M12.67,4H11V2H5v2H3.33C2.6,4 2,4.6 2,5.33v15.33C2,21.4 2.6,22 3.33,22h9.33c0.74,0 1.34,-0.6 1.34,-1.33V5.33C14,4.6 13.4,4 12.67,4z"
                            :fill="battery.batteryColor" />
                        <path v-if="battery.isCharging" d="M16,8h-2v6h-2l4,6v-6h2V8z" fill="#FFE082" />
                        <path v-else
                            d="M15.67,4H14V2H6v2H4.33C3.6,4 3,4.6 3,5.33v15.33C3,21.4 3.6,22 4.33,22h11.33c0.74,0 1.34,-0.6 1.34,-1.33V5.33C17,4.6 16.4,4 15.67,4z M13,20H5V6h8V20z"
                            :fill="battery.batteryColor" />
                    </svg>
                </div>
                <span class="battery-percentage text-xs">{{ battery.batteryPercentage }}%</span>
            </div>
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

<style scoped>
.battery-icon {
    display: flex;
    align-items: center;
}
</style>