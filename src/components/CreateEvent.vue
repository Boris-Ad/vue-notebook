<template>
  <h4 class="mt-3 mt-md-0">{{ selectedDate.ariaLabel }}</h4>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="eventTitle" class="form-label">Название события</label>
      <input v-model="eventTitle" type="text" class="form-control" id="eventTitle" />
      <div v-if="eventTitleError" class="form-text invalid">{{ eventTitleError }}</div>
    </div>

    <div class="mb-3">
      <label for="eventText" class="form-label">Описание</label>
      <textarea v-model="eventText" class="form-control" id="eventText" rows="2" maxlength="61"></textarea>
      <div v-if="eventTextError" class="form-text invalid">{{ eventTextError }}</div>
    </div>

    <div class="mb-3">
      <label for="eventCategory" class="form-label">Категория ( Семья, Работа )</label>
      <select v-if="getCategories" v-model="setCategory" id="eventCategory" class="form-select">
        <option v-for="(category, inx) in getCategories" :key="inx">{{ category }}</option>
        <option>Добавить категорию</option>
      </select>
      <div v-else class="mb-3">
        <input
          ref="inputCategory"
          @input="eventCategoryError = false"
          v-model.trim="eventCategory"
          type="text"
          class="form-control"
        />
        <div v-if="eventCategoryError" class="form-text invalid">{{ eventCategoryError }}</div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Сохранить</button>
    <button @click="$store.commit('setDate', null)" type="button" class="btn btn-danger mx-3">Отмена</button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

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
    const { value: eventText, errorMessage: eventTextError } = useField(
      'eventText',
      yup.string().required('Не должно быть пустым').max(60, 'Превышен лимит').trim()
    )

    const openSelect = ref(true)
    const inputCategory = ref(null)
    const eventCategory = ref('')
    const eventCategoryError = ref(false)

    const getCategories = computed(() => {
      if (store.getters['events'].length && openSelect.value) {
        const set = new Set(store.getters['events'].map(item => item.category))
        return Array.from(set)
      } else {
        return false
      }
    })

    const setCategory = ref(getCategories.value[0])

    const date = computed(() => store.getters['selectedDate'])

    const onSubmit = handleSubmit(async values => {
      if (openSelect.value === false && eventCategory.value === '') {
        return (eventCategoryError.value = 'Не должно быть пустым')
      }
      await store.dispatch('methods/addEvent', {
        ...values,
        day: date.value.day,
        month: date.value.month,
        year: date.value.year,
        category: eventCategory.value || setCategory.value,
      })
      store.commit('setDate', null)
    })

    watch(setCategory, async value => {
      if (value === 'Добавить категорию') {
        openSelect.value = false
        setCategory.value = ''
        await nextTick()
        inputCategory.value.focus()
      }
    })

    return {
      onSubmit,
      eventTitle,
      isSubmitting,
      eventTextError,
      eventTitleError,
      eventText,
      setCategory,
      getCategories,
      eventCategory,
      eventCategoryError,
      inputCategory,
    }
  },
}
</script>
