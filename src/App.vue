<script>
import { computed } from 'vue'

import Table from './components/Table.vue';
import data from './card-data.js';

export default {
  name: 'App',
  components: {
    Table
  },
  setup() {
    const cardData = computed(() => data);
    return {cardData};
  },
}
</script>

<template>
  <h1>The X-Files CCG checklist</h1>
  <Table :cards="cardData" />
</template>
<style scoped rel="stylesheet/css">
h1 {
  text-align: center;
}
</style>
<style rel="stylesheet/css">
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
body {
  font-family: 'Special Elite', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px;
  user-select: none;
  background-image: url('assets/x.svg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
</style>
