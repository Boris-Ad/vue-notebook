<template>
  <component :is="meta + '-layout'" />
</template>
<script>
import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { MainLayout, AuthLayout },
  setup() {
    const route = useRoute()
    const meta = computed(() => route.meta.layout)

    return { meta }
  },
}
</script>
