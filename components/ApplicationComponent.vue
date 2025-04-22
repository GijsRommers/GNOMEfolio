<template>
<section class="h-16 w-16 bg-white z-20">
  <div class="flex flex-row justify-between ">
    <h1>{{ app.applicationName }}</h1> 
    <div @click="apps.closeApplication(app)">X</div>
  </div>
</section>
</template>

<script setup>
console.log('app started');

const apps = useApplicationStore()

const props = defineProps({
  app: {
    type: Object,
    required: true
  }
})
</script>
