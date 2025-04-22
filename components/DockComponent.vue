<template>
  <section class="flex flex-row p-2 gap-1 bg-white/10 rounded-3xl">
    <div v-for="application in apps.applications" class="hover:bg-white/5 p-2 rounded-xl" @click="apps.openApplication(application)">
      <NuxtImg :src="application.applicationIcon" class="h-14" />
    </div>
  </section>
</template>

<script setup>

const apps = useApplicationStore()

</script>