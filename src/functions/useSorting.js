import {ref} from 'vue';

export function useSorting() {

  const sortCriteria = ref('affiliation');
  const  sortBy = (criteria)=> {sortCriteria.value = criteria;};

  return { sortCriteria, sortBy };
}
