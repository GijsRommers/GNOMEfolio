export const useBatteryStore = defineStore('battery', () => {
  // State
  const batteryLevel = ref(1)
  const isCharging = ref(false)
  const batterySupported = ref(true)
  let battery = null

  // Computed
  const batteryPercentage = computed(() => {
    return Math.round(batteryLevel.value * 100)
  })

  const batteryIconClass = computed(() => {
    return {
      'battery-icon': true,
      'animate-pulse': isCharging.value
    }
  })

  const batteryColor = computed(() => {
    if (batteryLevel.value <= 0.1) return '#FF5252' // Red for low battery
    if (batteryLevel.value <= 0.3) return '#FFC107' // Amber for medium-low
    return '#FFFFFF' // White for normal
  })

  // Methods
  const setupBattery = async () => {
    try {
      if ('getBattery' in navigator) {
        battery = await navigator.getBattery()
        
        // Initial update
        updateBatteryInfo()
        
        // Listen for battery changes
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

  // Return state and methods
  return {
    batteryLevel,
    isCharging,
    batterySupported,
    batteryPercentage,
    batteryIconClass,
    batteryColor,
    setupBattery,
    cleanupBattery
  }
})