<template>
  <div class="bg-light p-2 mb-1">
    <strong class="d-block mb-1">Type</strong>
    <div class="form-group">
      <select class="custom-select">
        <option :value="type.value" v-for="(type, index) in types" :key="'type'+index">
          {{ type.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeVariants',
  props:['types', 'selectedType']
}
</script>