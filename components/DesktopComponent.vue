<template>
  <main class="w-screen h-screen overflow-hidden">
    <NuxtImg 
      format="webp" 
      src="/Background.jpg" 
      class="w-full h-full object-cover object-top"
    />
    <ApplicationComponent v-for="app in apps.activeApplications" :app="app" />
   
  </main>
</template>

<script setup>

const apps = useApplicationStore()

</script>