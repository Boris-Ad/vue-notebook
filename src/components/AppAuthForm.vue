<template>
  <div class="card mx-auto mt-4" style="max-width: 26rem;">
    <div class="card-header">{{ formHeader }}</div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="email"
            @blur="emailBlur"
            @focus="onFocus"
            type="email"
            :class="['form-control', { invalid: emailError }]"
            id="email"
            spellcheck="false"
          />
          <div v-if="emailError" class="form-text invalid">{{ emailError }}</div>
          <div v-else-if="$store.getters.error === 'auth/user-not-found'" class="form-text invalid">
            Такой email не найден
          </div>
          <div v-else-if="$store.getters.error === 'auth/email-already-in-use'" class="form-text invalid">
            Такой email уже используется
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input
            v-model="password"
            @blur="passwordBlur"
            @focus="onFocus"
            type="password"
            :class="['form-control', { invalid: passwordError }]"
            id="password"
          />
          <div v-if="passwordError" class="form-text invalid">{{ passwordError }}</div>
          <div v-else-if="$store.getters.error === 'auth/wrong-password'" class="form-text invalid">
            Пароль не действительный
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ btnSubmitName }}</button>
          <button @click.prevent="exit" class="btn btn-danger mx-3">Отмена</button>
          <router-link
            v-if="formHeader === 'Авторизация'"
            :to="{ name: 'SignUp' }"
            class="btn btn-primary mx-3 ms-auto"
          >
            Регистрация
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'

export default {
  props: {
    formHeader: { type: String },
    btnSubmitName: { type: String },
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const PASSWORD_LENGTH = 6
    const { handleSubmit, isSubmitting } = useForm()
    const onFocus = () => store.commit('setError', null)

    const {
      value: email,
      errorMessage: emailError,
      handleBlur: emailBlur,
    } = useField('email', yup.string().required('Введите Email').email('Введите корректный Email').trim())

    const {
      value: password,
      errorMessage: passwordError,
      handleBlur: passwordBlur,
    } = useField(
      'password',
      yup.string().required('Введите пароль').min(PASSWORD_LENGTH, `Не меньше ${PASSWORD_LENGTH} символов`).trim()
    )

    const path = 'auth' + route.path
    
    const onSubmit = handleSubmit(async values => {
      await store.dispatch(path, values)
      if (!store.getters.error) {
        router.push('/')
      }
    })
    const exit = () => {
      router.push('/')
    }

    return {
      onSubmit,
      exit,
      email,
      emailError,
      emailBlur,
      password,
      passwordError,
      passwordBlur,
      isSubmitting,
      onFocus,
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
