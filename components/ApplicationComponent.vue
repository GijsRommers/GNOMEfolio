<template>
  <vue-draggable-resizable :w="400" :h="300" :min-width="250" :min-height="200" :x="initialPosition.x" :y="initialPosition.y" :z="getZIndex"
    @activated="handleActivate">
    <section class="bg-white border select-none border-gray-300 shadow-lg rounded-lg w-full h-full">
      <div class="flex flex-row justify-between bg-gray-200 p-2 rounded-t-lg">
        <p class="font-medium">{{ app.applicationName }}</p>
        <div @click="apps.closeApplication(app)" class="cursor-pointer hover:bg-red-600 px-2 rounded">X</div>
      </div>
      <div class="p-4 overflow-auto h-[calc(100%-40px)] mdcontent">
        <NuxtMarkdown v-if="markdownContent" :source="markdownContent" />
        <div v-else class="flex items-center justify-center h-full">
          <span class="text-gray-500">Loading content...</span>
        </div>
      </div>
    </section>
  </vue-draggable-resizable>
</template>


<script setup>
const apps = useApplicationStore()
const markdownContent = ref('')

const props = defineProps({
  app: {
    type: Object,
    required: true
  }
})

const appIndex = props.app.index || apps.activeApplications.indexOf(props.app)
const initialPosition = {
  x: 100 + (appIndex * 50),
  y: 100 + (appIndex * 50)
}

const getZIndex = computed(() => {
  const index = apps.activeApplications.indexOf(props.app)
  return 100 + index
})

function handleActivate() {
  apps.openApplication(props.app)
}

async function loadMarkdown() {
  try {
    markdownContent.value = await apps.fetchMarkdown(props.app)
  } catch (error) {
    console.error('Failed to load markdown:', error)
    markdownContent.value = '# Error\nFailed to load content'
  }
}

onMounted(loadMarkdown)

</script>


<style>
.mdcontent h1 {
  font-size: 20pt;
}

.mdcontent h2 {
  font-size: 16pt;
}

.mdcontent h3 {
  font-size: 14pt;
  font-weight: 500;
}

.mdcontent h4 {
  font-size: 12pt;
  font-weight: 600;
}


.vdr {
  border: none !important;
  outline: none !important;
}

.vdr.active {
  border: none !important;
}

.vdr .handle {
  width: 7px !important;
  height: 7px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  background: white !important;
  opacity: 0 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}

.handle-tl {
  top: 0px !important;
  left: 0px !important;
}

.handle-tm {
  top: 0px !important;
}

.handle-tr {
  top: 0px !important;
  right: 0px !important;
}

.handle-ml {
  left: 0px !important;
}

.handle-mr {
  right: 0px !important;
}

.handle-bl {
  bottom: 0px !important;
  left: 0px !important;
}

.handle-bm {
  bottom: 0px !important;
}

.handle-br {
  bottom: 0px !important;
  right: 0px !important;
}

/* Only show handles when window is active */
.vdr:not(.active) .handle {
  display: none !important;
}
</style>