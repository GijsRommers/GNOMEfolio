export const useClockStore = defineStore('clock', () => {
  const currentTime = ref('')
  let intervalId

  const updateClock = () => {
    const now = new Date()

    const options = {
      month: 'short',  
      day: '2-digit',  
      hour: '2-digit',  
      minute: '2-digit',
      hour12: false   
    }

    currentTime.value = now.toLocaleString('en-US', options).replace(',', '')
  }

  const startClock = () => {
    updateClock()
    intervalId = setInterval(updateClock, 1000)
  }

  const stopClock = () => {
    clearInterval(intervalId)
  }

  return {
    currentTime,
    startClock,
    stopClock
  }
})
