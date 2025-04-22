export const useBatteryStore = defineStore('battery', () => {
  const batteryLevel = ref(1)
  const isCharging = ref(false)
  const batterySupported = ref(true)
  let battery = null
  let hasBattery = ref(true)

  const batteryPercentage = computed(() => {
    return Math.round(batteryLevel.value * 100)
  })


  const setupBattery = async () => {
    try {
      if ('getBattery' in navigator) {
        battery = await navigator.getBattery()
        
        updateBatteryInfo()
        if (batteryLevel.value === 1 && isCharging.value) {
          batterySupported.value = false
        }

        battery.addEventListener('levelchange', updateBatteryInfo)
        battery.addEventListener('chargingchange', updateBatteryInfo)
      } else {
        batterySupported.value = false
      }
    } catch (error) {
      console.error('Battery API error:', error)
      batterySupported.value = false
    }
  }

  const updateBatteryInfo = () => {
    if (battery) {
      batteryLevel.value = battery.level
      isCharging.value = battery.charging
    }
  }

  const cleanupBattery = () => {
    if (battery) {
      battery.removeEventListener('levelchange', updateBatteryInfo)
      battery.removeEventListener('chargingchange', updateBatteryInfo)
    }
  }

  return {
    batteryLevel,
    isCharging,
    batterySupported,
    batteryPercentage,
    setupBattery,
    cleanupBattery,
    hasBattery
  }
})