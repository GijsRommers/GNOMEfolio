<template>
  <vue-draggable-resizable :w="400" :h="300" :x="100" :y="100"  :parent="true">
    <section class="bg-white border border-gray-300 shadow-lg rounded-lg w-full h-full">
      <div class="flex flex-row justify-between bg-gray-200 p-2 rounded-t-lg">
        <h1 class="font-medium">{{ app.applicationName }}</h1> 
        <div @click="apps.closeApplication(app)" class="cursor-pointer hover:bg-red-400 px-2 rounded">X</div>
      </div>
      <div class="p-4">
        <!-- Application content would go here -->
        <p>Content for {{ app.applicationName }}</p>
      </div>
    </section>
  </vue-draggable-resizable>
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


