<template>
  <vue-draggable-resizable :w="400" :h="300" :x="initialPosition.x" :y="initialPosition.y"  :z="getZIndex" @activated="handleActivate">
    <section class="bg-white border select-none border-gray-300 shadow-lg rounded-lg w-full h-full">
      <div class="flex flex-row justify-between bg-gray-200 p-2 rounded-t-lg">
        <h1 class="font-medium">{{ app.applicationName }}</h1> 
        <div @click="apps.closeApplication(app)" class="cursor-pointer hover:bg-red-400 px-2 rounded">X</div>
      </div>
      <div class="p-4">
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
</script>


<style>
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
  border: 1px solid rgba(0,0,0,0.1) !important;
  background: white !important;
  opacity: 0 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
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