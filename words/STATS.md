I have the letter density, now I need to display them. If there is no text, display a placeholder message. If there are letters, I have the count of each letter, something like

```
[
  { letter: 'a', count: 7, percentage: "23%" },
  ...
]
```

The issue here is by default not all letters are displayed. I could give the container a default height that displays only the first five items, and render the rest anyway, but that would not make much sense for screen readers. The toggle would be useless for them, and they would still see the other items even if they don't want to. There's also the issue of the toggle being rendered when there are five or less items; it would be useless as there wouldn't be any more letters to show. That seems like an easy problem to solve; if there are five or less items don't show the toggle. Then what about the rest? The first five items will be displayed regardless of the state of the toggle.

I think `v-for` supports expressions. I still have trouble putting things into words; it's often easier to write a demo in code than to try to weave words toghether to explain what I want. Anyway, I'll do it like this

```vue
<script setup>
import { ref, computed } from "vue";

const defaultLength = 5;
const showAll = ref(false);
const items = ref([]);
const lastIndex = computed(() => {
  const totalLength = items.value.length;
  const length = showAll.value ? totalLength : defaultLength;

  return Math.min(totalLength, length);
});

for (let i = 0; i < 10; i++) items.value.push(i);
</script>

<template>
  <ul>
    <li v-for="idx in lastIndex">{{ items[idx - 1] }}</li>
  </ul>
  <label>
    <span>Show {{ showAll ? "less" : "more" }}</span>
    <input type="checkbox" v-model="showAll" />
  </label>
</template>
```

it may be a good idea to put the densities stats in a component to clean things up.
