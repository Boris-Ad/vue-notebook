<template>
  <h4 class="mt-3 mt-md-0">{{ selectedDate.ariaLabel }}</h4>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="eventTitle" class="form-label">Название события</label>
      <input v-model="eventTitle" type="text" class="form-control" id="eventTitle" />
      <div v-if="eventTitleError" class="form-text invalid">{{ eventTitleError }}</div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Сохранить</button>
    <button @click="$store.commit('setDate', null)" type="button" class="btn btn-danger mx-3">Отмена</button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: {
    selectedDate: { type: Object },
  },
  setup() {
    const store = useStore()
    const { handleSubmit, isSubmitting } = useForm()

    const { value: eventTitle, errorMessage: eventTitleError } = useField(
      'eventTitle',
      yup.string().required('Не должно быть пустым').trim()
    )

    const date = computed(() => store.getters['selectedDate'])

    const onSubmit = handleSubmit(async values => {
      await store.dispatch('methods/addEventAll', {
        ...values,
        day: date.value.day,
        month: date.value.month,
        eventText: 'Ежегодный праздник',
      })
      store.commit('setDate', null)
    })
    
    return { onSubmit, eventTitle, eventTitleError, isSubmitting }
  },
}
</script>
