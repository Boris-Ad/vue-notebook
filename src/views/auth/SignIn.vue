<template>
  <app-auth-form formHeader="Авторизация" btnSubmitName="Войти" />
</template>

<script>
import AppAuthForm from '@/components/AppAuthForm.vue'

export default {
  components: { AppAuthForm },
  setup() {
    return {}
  },
}
</script>
