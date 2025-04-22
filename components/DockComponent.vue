<template>
  <section class="flex flex-row p-2 gap-1 bg-slate-700/80 rounded-3xl fixed bottom-4 left-1/2 -translate-x-1/2 ">
    <div v-for="application in apps.applications" class="hover:bg-white/5 p-2 rounded-xl" @click="apps.openApplication(application)">
      <NuxtImg :src="application.applicationIcon" class="h-14" />
    </div>
  </section>
</template>

<script setup>

const apps = useApplicationStore()

</script>