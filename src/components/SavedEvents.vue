<template>
  <h4>В этом месяце</h4>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="first-child" scope="col">Дата</th>
          <th scope="col">Событие</th>
          <th scope="col">Описание</th>
          <th scope="col">Категория</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <th scope="row">{{ event.day }}</th>
          <td>{{ event.eventTitle }}</td>
          <td>{{ event.eventText }}</td>
          <td>{{ event.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    updateMonth: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore()

    const eventsForOne = computed(() =>
      store.getters['events'].filter(
        item => item.month === props.updateMonth.month && item.year === props.updateMonth.year
      )
    )
    const eventsForAll = computed(() =>
      store.getters['eventsForAll'].filter(item => item.month === props.updateMonth.month)
    )

    const events = computed(() => [...eventsForOne.value, ...eventsForAll.value].sort((a, b) => a.day - b.day))

    return { events }
  },
}
</script>

<style>
.table thead th:not(.first-child){
  min-width: 200px;
}
</style>
