<template>
<div class="p-12 dark:bg-textSecondary  rounded h-full shadow-2xl ">
  <!-- <h5 class=" font-semibold mb-4 text-sm leading-6 text-primary dark:text-primaryl">On this page</h5> -->
  <ul class="text-slate-700 text-sm leading-6">
    <li>
      <a href="#basic-usage" class="block py-1 text-xl font-medium text-textPrimaryl dark:text-textPrimary"> 
        Categories
      </a>
    </li>
    <tree :Nodes="nodes"></tree>

  </ul>
</div>
</template>
<script setup lang="ts">
 import tree from '~/components/tree.vue';

 /* const nodes = ref(Array[Tree]) */

  const nodes = computed<Array<Tree>>(() => {
    const tdata:Array<Tree> = [
    {
      id: 1,
      label: 'Foods',
      children: [
        {
          id: 2,
          label: 'Fruits',
          children: [
            {
              id: 3,
              label: 'Banana'
            },
            {
              id: 4,
              label: 'Apple'
            },
            {
              id: 5,
              label: 'Strawberry'
            }
          ]
        },
        {
          id: 6,
          label: 'Vegetables',
          children: [
            {
              id: 7,
              label: 'Carrot'
            },
            {
              id: 8,
              label: 'Lettuce'
            },
            {
              id: 9,
              label: 'Potato'
            }
          ]
        }
      ]
    },
    {
      id: 10,
      label: 'Drinks',
      children: [
        {
          id: 11,
          label: 'Beers',
          children: [
            {
              id: 12,
              label: 'Budweiser'
            },
            {
              id: 13,
              label: 'Heineken'
            }
          ]
        },
        {
          id: 14,
          label: 'Wines'
        },
        {
          id: 15,
          label: 'Whiskey'
        }
      ]
    }
  ]
    return tdata
})
</script>