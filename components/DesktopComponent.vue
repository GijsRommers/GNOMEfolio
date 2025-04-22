<template>
  <main class="w-screen select-none h-screen overflow-hidden relative">
    <NuxtImg 
      format="webp" 
      src="/Background.jpg" 
      class="w-full h-full object-cover object-top absolute inset-0 z-0"
    />
      
    <div class="absolute inset-0 pointer-events-none z-10">
      <ApplicationComponent 
        v-for="app in apps.activeApplications" 
        :key="app.applicationName" 
        :app="app"
        class="pointer-events-auto"
      />
    </div>

  </main>
</template>

<script setup>
const apps = useApplicationStore()
</script>