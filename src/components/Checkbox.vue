<script>
import { ref, watch } from 'vue'

export default {
  name: 'Checkbox',
  props: {
    id: {type: String, default: undefined},
    name: {type: String, default: undefined},
    modelValue: {type: Boolean, default: false},
    title: {type: String, default: undefined},
    excluded: {type: Boolean, default: false},
  },
  emits: ['update:modelValue'],
  setup(props) {
    const internalValue = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (newValue) => {internalValue.value = newValue;}
    );
    return {internalValue};
  },
};
</script>

<template>
  <label
    :class="{excluded}"
    :for="id"
    :title="title"
  >
    <input
      :id="id"
      v-model="internalValue"
      type="checkbox"
      :name="name"
      @input="$emit('update:modelValue', !internalValue)"
    ><slot /></label>
</template>

<style scoped rel="stylesheet/css">
label {
  cursor: pointer;
}

.excluded label {
  color: grey;
  text-decoration: line-through;
}

input[type=checkbox] {
  position: relative;
  cursor: pointer;
}

.excluded input {
  color: grey;
}

.excluded input[type=checkbox]:before {
  color: grey;
  border-color: grey;
}

input[type=checkbox]:before {
  content: "";
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  left: 0;
  border: 1px solid #2c3e50;
  background-color: white;
  color:  #2c3e50;
  box-shadow: 2px 2px 0 -1px;
}
input[type=checkbox]:checked:after {
  content: "×";
  font-weight: bold;
  display: block;
  position: absolute;
  top: -2px;
  left: 2px;
}
</style>
