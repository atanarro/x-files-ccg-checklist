<script>
import Table from './components/Table.vue';
import data from './card-data.js';

export default {
  name: 'App',
  components: {
    Table
  },
  computed: {
    cardData() {
      const cards = Object.seal(data);
      cards.sort();
      return cards;
    },
  },
}
</script>

<template>
  <h1>The X-Files CCG checklist</h1>
  <Table :cards="cardData" />
</template>

<style rel="stylesheet/scss">
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

#app {
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
