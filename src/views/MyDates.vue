<template>
  <div class="header mt-3">
    <h4>Мои даты</h4>
    <hr class="my-3" />
  </div>
  <div class="main">
    <div v-if="$store.getters['events'].length" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title mb-3">Сортировать</h5>
        <div class="mb-3 row">
          <div class="mb-2 mb-xl-0" style="width: 10rem;">
            <select v-model="selectData.year" id="year" class="form-select">
              <option value="">Год</option>
              <option v-for="(year, inx) in yearsOptions" :key="inx">{{ year }}</option>
            </select>
          </div>

          <div class="mb-2 mb-xl-0" style="width: 10rem;">
            <select v-model="selectData.month" class="form-select">
              <option value="">Месяц</option>
              <option v-for="(month, inx) in monthsOptions" :key="inx">{{ monthArr[month - 1] }}</option>
            </select>
          </div>
          <div class="mb-2 mb-xl-0" style="width: 10rem;">
            <select v-model="selectData.day" class="form-select">
              <option value="">День</option>
              <option v-for="(day, inx) in daysOptions" :key="inx">{{ day }}</option>
            </select>
          </div>
          <div class="mb-2 mb-xl-0" style="width: 10rem;">
            <select v-model="selectData.category" class="form-select">
              <option value="">Категория</option>
              <option v-for="(category, inx) in categoriesOptions" :key="inx">{{ category }}</option>
            </select>
          </div>
          <div class="col">
            <button @click="reset" type="button" class="btn btn-danger">Сбросить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table v-if="$store.getters['events'].length" class="table">
        <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Событие</th>
            <th scope="col">Описание</th>
            <th scope="col">Категория</th>
            <th scope="col" class="text-center">Изменить дату</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <th scope="row">{{ event.day }} {{ monthArr[event.month - 1] }} {{ event.year }}г.</th>
            <td>{{ event.eventTitle }}</td>
            <td>{{ event.eventText }}</td>
            <td>{{ event.category }}</td>
            <td>
              <div class="d-flex justify-content-end">
                <v-date-picker
                  :modelValue="new Date(event.year, event.month - 1, event.day)"
                  @update:modelValue="updateDate(event.id, $event)"
                  :update-on-input="false"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      readonly="readonly"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>

                <button @click="removeEvent(event.id)" type="button" class="btn btn-danger btn-sm ms-2">Удалить</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'

export default {
  setup() {
    const store = useStore()
    const selectData = reactive({
      year: '',
      month: '',
      day: '',
      category: '',
    })
    const monthArr = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ]

    const updateDate = (id, data) => {
      const day = data.getDate()
      const month = data.getMonth() + 1
      const year = data.getFullYear()
      store.dispatch('methods/updateEvent', { id, day, month, year })
    }

    const yearsOptions = computed(() => {
      const set = new Set(store.getters['events'].map(item => item.year))
      return [...set].sort((a, b) => a - b)
    })
    const monthsOptions = computed(() => {
      const set = new Set(store.getters['events'].map(item => item.month))
      return [...set].sort((a, b) => a - b)
    })
    const daysOptions = computed(() => {
      const set = new Set(store.getters['events'].map(item => item.day))
      return [...set].sort((a, b) => a - b)
    })
    const categoriesOptions = computed(() => {
      const set = new Set(store.getters['events'].map(item => item.category))
      return [...set]
    })

    const reset = () => {
      selectData.year = ''
      selectData.month = ''
      selectData.day = ''
      selectData.category = ''
    }

    const removeEvent = async id => {
      if (store.getters['events'].length === 1) {
        store.commit('setEvents', [])
      }
      await store.dispatch('methods/removeEvent', id)
    }

    const events = computed(() =>
      [...store.getters['events']]
        .sort((a, b) => a.day - b.day)
        .sort((a, b) => a.month - b.month)
        .sort((a, b) => a.year - b.year)
        .filter(item => {
          if (selectData.year !== '') return item.year == selectData.year
          return item
        })
        .filter(item => {
          if (selectData.month !== '') return monthArr[item.month - 1] == selectData.month
          return item
        })
        .filter(item => {
          if (selectData.day !== '') return item.day == selectData.day
          return item
        })
        .filter(item => {
          if (selectData.category !== '') return item.category == selectData.category
          return item
        })
    )

    return {
      events,
      monthArr,
      selectData,
      yearsOptions,
      monthsOptions,
      daysOptions,
      categoriesOptions,
      reset,
      removeEvent,
      updateDate,
    }
  },
}
</script>
