<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
      <button @click="$emit('closeModal')" type="button" class="btn-close"></button>
    </div>
    <div class="modal-body">
      <p>{{ text }}</p>
      <button @click="$emit('onContinue')" v-if="continueBtn" type="button" class="btn btn-primary">{{continueBtn}}</button>
      <button @click="$emit('onCancel')" v-if="cancelBtn" type="button" class="btn btn-primary mx-3">{{cancelBtn}}</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closeModal','onContinue','onCancel'],
  props: {
    title: { type: String },
    text: { type: String },
    continueBtn: { type: String, default: null },
    cancelBtn: { type: String, default: null },
  },
}
</script>
<style>
.modal {
  display: block;
}
</style>
