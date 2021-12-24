<template>
  <app-auth-form formHeader="Регистрация" btnSubmitName="Зарегистрироваться" />
</template>

<script>
import AppAuthForm from '../../components/AppAuthForm.vue'

export default {
  components: { AppAuthForm },
  setup() {
    return {}
  },
}
</script>
