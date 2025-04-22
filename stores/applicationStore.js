export const useApplicationStore = defineStore('application', () => {
  const applications = ref([])
  const activeApplications = ref([])
  const router = useRouter()

  const loadApplications = async () => {
    try {
      const response = await fetch('/applications.json')
      applications.value = await response.json()
    } catch (err) {
      console.error('Error loading applications:', err)
    }
  }

  function openApplication(app) {
    const index = activeApplications.value.indexOf(app)
    if (index !== -1) {
      activeApplications.value.splice(index, 1)
      activeApplications.value.push(app)
    }
    else {
      activeApplications.value.push(app)      
    }
    console.log(activeApplications.value);
    
    router.push('/')
  }

  function closeApplication(app) {
    const index = activeApplications.value.indexOf(app)
    if (index !== -1) {
      activeApplications.value.splice(index, 1)
    }
  }

  loadApplications()

  return {
    closeApplication,
    openApplication,
    activeApplications,
    applications,
    loadApplications
  }
})