<template>
  <div class="header mt-3">
    <h4>Общие даты</h4>
    <hr class="my-3" />
  </div>
  <div class="main">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Название</th>
            <th v-if="$store.getters['auth/isAuthenticated']" scope="col">Поддерживаю</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <th scope="row">{{ event.day }} {{ month[event.month - 1] }}</th>
            <td>{{ event.eventTitle }}</td>
            <td v-if="$store.getters['auth/isAuthenticated']">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()
    const events = computed(() => [...store.getters['eventsForAll']].sort((a, b) => a.month - b.month))
    const month = [
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
    return { events, month }
  },
}
</script>
