<template>
<li
  v-for="node in props.Nodes"
  class=" ">
  <div class="flex group/cat">
    <a href="#adding-an-outer-shadow" class="   text-lg flex items-start py-1 text-textPrimaryl dark:text-textPrimary  group-hover/cat:text-primary group-hover/cat:hover:text-primary duration-200">
      {{node.label}}
    </a>
  
    <button v-if="node.children">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" size-4 mt-1 stroke-textPrimaryl dark:stroke-textPrimary group-hover/cat:stroke-primary group-hover/cat:hover:stroke-primary">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
  <ul 
    v-if="node.children"
    class="ml-4">
    <tree :Nodes="node.children" ></tree>
    <!-- <li>
      <a href="#adding-an-inner-shadow" class="group flex items-start py-1 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
        Adding an inner shadow
      </a>
    </li> -->
  </ul>
</li>
</template>
<script setup lang="ts">
 import tree from '~/components/tree.vue';
 const props = defineProps<{
    Nodes?: Array<Tree>
    
  }>()

</script>