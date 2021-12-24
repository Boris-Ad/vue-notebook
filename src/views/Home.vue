<template>
  <div class="header my-3">
    <div id="v-model-radiobutton" class="row align-items-center">
      <h4 class="me-4 col">Добавить событие</h4>
      <div class="col-sm-6 d-flex justify-content-end">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="radioOne" :value="true" v-model="picked" />
          <label class="form-check-label" for="radioOne">Для себя</label>
        </div>

        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="radioAll" :value="false" v-model="picked" />
          <label class="form-check-label" for="radioAll">Для всех</label>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-3" />
  <main class="main row m-0">
    <div class="col col-md-4">
      <v-date-picker is-expanded @dayclick="onDayClick" @update:from-page="updatePage" is-dark v-model="date" :attributes="attrs" />
    </div>

    <div v-if="picked" class="col-12 col-lg-8 ms-auto">
      <create-event v-if="selectedDate" :selectedDate="selectedDate" />
    </div>
    <div v-else class="col-12 col-lg-8 ms-auto">
      <create-event-for-all v-if="selectedDate" :selectedDate="selectedDate" />
    </div>
    <hr class="my-3" />
  </main>

  <footer class="footer mt-3">
    <saved-events :updateMonth="updateMonth" />
  </footer>

  <teleport to="body">
    <GDialog v-if="myModal" v-model="myModal" max-width="500">
      <app-modal @closeModal="myModal = false" title="Ошибка!" text="Авторизуйтесь или пройдите регистрацию" />
    </GDialog>
  </teleport>
</template>

<script>
import { GDialog } from 'gitart-vue-dialog'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AppModal from '../components/AppModal.vue'
import CreateEvent from '../components/CreateEvent.vue'
import SavedEvents from '../components/SavedEvents.vue'
import CreateEventForAll from '../components/CreateEventForAll.vue'

export default {
  components: { GDialog, AppModal, CreateEvent, SavedEvents, CreateEventForAll },
  setup() {
    const date = ref(new Date())
    const store = useStore()
    const updateMonth = ref({})
    const myModal = ref(false)
    const picked = ref(true)

    const selectedDate = computed(() => store.getters.selectedDate)
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const datesForAttrs = computed(() =>
      store.getters['events'].map(item => new Date(item.year, item.month - 1, item.day))
    )
    const datesForAllForAttrs = computed(() =>
      store.getters['eventsForAll'].map(item => ({ yearlyInterval: 1, days: item.day, months: item.month }))
    )

    const onDayClick = day => {
      if (!isAuthenticated.value) return (myModal.value = true)
      store.commit('setDate', day)
    }

    const updatePage = date => {
      updateMonth.value = {
        month: date.month,
        year: date.year,
      }
    }

    const attrs = ref([
      {
        highlight: {
          color: 'white',
          fillMode: 'outline',
        },
        dates: datesForAttrs.value,
      },
      {
        highlight: {
          color: 'red',
          fillMode: 'outline',
        },
        dates: datesForAllForAttrs.value,
      },
    ])

    watch([datesForAttrs, datesForAllForAttrs], newValues => {
      attrs.value[0].dates = newValues[0]
      attrs.value[1].dates = newValues[1]
    })

    return {
      date,
      onDayClick,
      myModal,
      AppModal,
      selectedDate,
      isAuthenticated,
      updatePage,
      updateMonth,
      attrs,
      picked,
    }
  },
}
</script>

<style>
.invalid {
  color: crimson;
  border-color: crimson;
}
</style>
