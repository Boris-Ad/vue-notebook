<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a @click.prevent class="navbar-brand" href="#">Ежедневник</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">Главная</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'MyDates' }">Мои даты</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'CommonDates' }">Общие даты</router-link>
          </li>
          <li class="nav-item">
            <a v-if="isAuthenticated" @click.prevent="logout" class="nav-link" href="#">Выйти</a>
            <a v-else @click.prevent="login" class="nav-link" href="#">Войти</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <teleport to="body">
    <GDialog v-if="myModal" v-model="myModal" max-width="500">
      <app-modal
        @closeModal="myModal = false"
        @onContinue="onContinue"
        @onCancel="onCancel"
        title="Внимание!"
        text="Есть несохраненные данные которые удалятся"
        continueBtn="Продолжить"
        cancelBtn="Отмена"
      />
    </GDialog>
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GDialog } from 'gitart-vue-dialog'
import AppModal from '@/components/AppModal.vue'
import { computed, ref } from 'vue'

export default {
  components: { GDialog, AppModal },
  setup() {
    const store = useStore()
    const router = useRouter()
    const myModal = ref(false)
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const onContinue = async () => {
      await store.dispatch('auth/signout')
      myModal.value = false
    }
    const onCancel = () => {
      myModal.value = false
    }

    const login = () => {
      router.push({ name: 'SignIn' })
    }

    const logout = async () => {
      if (store.getters.selectedDate) {
        myModal.value = true
      } else {
        await store.dispatch('auth/signout')
      }
    }
    return { login, logout, myModal, onContinue, onCancel, isAuthenticated }
  },
}
</script>
