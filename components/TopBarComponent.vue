<template>
    <section class="bg-black px-1 h-8  fixed w-full flex flex-row justify-between items-center">
        <RouterLink :to="$route.path === '/activities' ? '/' : '/activities'" class="flex flex-row gap-2 items-center hover:bg-gray-400/30 px-4 py-[10px] rounded-full transition-all w=">
            <div class="w-7 h-2 bg-white rounded-full"></div>
        </RouterLink>
        <div class="text-white font-semibold px-4 rounded-full text-md hover:bg-gray-400/30 transition-all">
            <h1 class="mt-[3px]">{{ clock.currentTime }}</h1>
        </div>
        <div class="flex items-center hover:bg-gray-400/30 px-3 py-1 rounded-full transition-all">
            <div v-if="battery.batterySupported || !battery.hasBattery" class="relative w-3 h-4 border-2 border-white rounded-sm flex flex-col justify-end">
                <div class="absolute top-[-1px] left-1/2 transform -translate-x-1/2 h-[1px] w-[3px] bg-white"></div>
                <div class="w-[calc(100%-2px)] mx-[1px] my-[1px] transition-all" :class="{
                    'bg-white': battery.batteryPercentage > 30,
                    'bg-red-500': battery.batteryPercentage <= 30
                }" :style="{ height: `${(battery.batteryPercentage / 100) * (100 - 10)}%` }"></div>
            </div>
        </div>
    </section>
</template>
<script setup>
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
