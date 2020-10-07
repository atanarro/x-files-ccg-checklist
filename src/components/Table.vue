<script>
import { computed, ref } from 'vue'
import { useSorting } from '@/functions/useSorting';
import Checkbox from "@/components/Checkbox";

export default {
  name: 'Table',
  components: {Checkbox},
  props: {
    cards: {type: Array, default: () => []},
  },
  setup(props) {

    const {sortBy, sortCriteria} = useSorting();

    const excluded = ref({
      id: {},
      affiliation: {},
      motive: {},
      method: {},
      result: {}
    });

    props.cards.forEach(({id, affiliation, motive, method, result}) => {
      excluded.value.id[id] = false;
      excluded.value.affiliation[affiliation] = false;
      excluded.value.motive[motive] = false;
      excluded.value.method[method] = false;
      excluded.value.result[result] = false;
    });

    const sortedCards = computed(() => {
      const isExcluded = (card)=> Object.keys(excluded.value).reduce((acc, cur) => acc || excluded.value[cur][card[cur]], false);
      const cards = props.cards.map(card=>({
        ...card,
        excluded: isExcluded(card),
      }));

      cards.sort((cardA, cardB) =>{
        return cardA[sortCriteria.value] > cardB[sortCriteria.value] ? 1 : -1;
      });
      return cards;
    });

    return {sortedCards, excluded, sortBy, sortCriteria};
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
          <Checkbox
            :id="card.id + '-name'"
            v-model="excluded.id[card.id]"
            :name="card.id + '-name'"
            :title="card.id"
            :excluded="card.excluded"
          >
            {{ card.name }}
          </Checkbox>
        </td>
        <td>
          <Checkbox
            :id="card.id + '-affiliation'"
            v-model="excluded.affiliation[card.affiliation]"
            :name="card.id + '-affiliation'"
            :excluded="card.excluded"
          >
            {{ card.affiliation }}
          </Checkbox>
        </td>
        <td>
          <Checkbox
            :id="card.id + '-motive'"
            v-model="excluded.motive[card.motive]"
            :name="card.id + '-motive'"
            :excluded="card.excluded"
          >
            {{ card.motive }}
          </Checkbox>
        </td>
        <td>
          <Checkbox
            :id="card.id + '-method'"
            v-model="excluded.method[card.method]"
            :name="card.id + '-method'"
            :excluded="card.excluded"
          >
            {{ card.method }}
          </Checkbox>
        </td>
        <td>
          <Checkbox
            :id="card.id + '-result'"
            v-model="excluded.result[card.result]"
            :name="card.id + '-result'"
            :excluded="card.excluded"
          >
            {{ card.result }}
          </Checkbox>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped rel="stylesheet/css">
table {
  margin: auto;
  border-collapse: collapse;
}

table tbody {
  border-top: 20px solid transparent;
}

table {
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  max-width: 1280px;
}

tr {
  border: solid;
  border-width: 8px 0;
  border-color: transparent;
}

table th {
  cursor: pointer;
  background: #2c3e50;
  color: white;
  padding: 5px 5px 0 5px;
}

td {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
}
</style>
