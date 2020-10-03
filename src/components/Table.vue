<script>
export default {
  name: 'Table',
  props: {
    cards: {type: Array, default: () => []},
  },
  data() {
    return {
      sortCriteria: 'affiliation',
      model: {
        id: {},
        affiliation: {},
        motive: {},
        method: {},
        result: {}
      }
    };
  },
  computed: {
    sortedCards() {
      const cards = this.cards.map(card=>({
        ...card,
        excluded: this.excluded(card),
      }));

      cards.sort((cardA, cardB) =>{
        return cardA[this.sortCriteria] > cardB[this.sortCriteria] ? 1 : -1;
      });
      return cards;
    },
  },
  created() {
    this.sortedCards.forEach(({id, affiliation, motive, method, result}) => {
      this.model.id[id] = false;
      this.model.affiliation[affiliation] = false;
      this.model.motive[motive] = false;
      this.model.method[method] = false;
      this.model.result[result] = false;
    });
  },
  methods: {
    sortBy(criteria) {
      this.sortCriteria = criteria;
    },
    excluded(card) {
      return Object.keys(this.model).reduce((acc, cur) => acc || this.model[cur][card[cur]],  false);
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th @click="sortBy('name')">
          X-FILES
        </th>
        <th @click="sortBy('affiliation')">
          Affiliation
        </th>
        <th @click="sortBy('motive')">
          Motive
        </th>
        <th @click="sortBy('method')">
          Method
        </th>
        <th @click="sortBy('result')">
          Result
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="card in sortedCards"
        :key="card.id"
        :class="{excluded: card.excluded}"
      >
        <td>
          <label
            :for="card.id + '-name'"
            :title="card.id"
          >
            <input
              :id="card.id + '-name'"
              v-model="model.id[card.id]"
              type="checkbox"
              :name="card.id + '-name'"
            >{{ card.name }}</label>
        </td>
        <td>
          <label :for="card.id + '-affiliation'">
            <input
              :id="card.id + '-affiliation'"
              v-model="model.affiliation[card.affiliation]"
              type="checkbox"
              :name="card.id + '-affiliation'"
            >{{ card.affiliation }}</label>
        </td>
        <td>
          <label :for="card.id + '-motive'">
            <input
              :id="card.id + '-motive'"
              v-model="model.motive[card.motive]"
              type="checkbox"
              :name="card.id + '-motive'"
            >{{ card.motive }}</label>
        </td>
        <td>
          <label :for="card.id + '-method'">
            <input
              :id="card.id + '-method'"
              v-model="model.method[card.method]"
              type="checkbox"
              :name="card.id + '-method'"
            >{{ card.method }}</label>
        </td>
        <td>
          <label :for="card.id + '-result'">
            <input
              :id="card.id + '-result'"
              v-model="model.result[card.result]"
              type="checkbox"
              :name="card.id + '-result'"
            >{{ card.result }}
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped rel="stylesheet/scss">
table {
  border-collapse: collapse;
}

table tbody {
  border-top: 20px solid transparent;
}

table {
  border-collapse: inherit;
  text-align: left;
  width: 100%;
  max-width: 1280px;
}
table th {
  cursor: pointer;
  background: #2c3e50;
  color: white;
  padding: 5px 5px 0 5px;
}

label {
  cursor: pointer;
}

td {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
