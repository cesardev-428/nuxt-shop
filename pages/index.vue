<template>
  <div class="w-full">
    <section class="Breadcrumb px-3 py-6 ">
      <breadCrumb></breadCrumb>
    </section>

    <div class="grid grid-cols-12 gap-4  ">
      <div class="col-span-2 ">
        <categories></categories>
      </div>
      <div class="col-span-10 ">
        <products 
        :page="currentPage"
        :loading = "loading"
        ></products>
        <pagination 
          @sendCurrentPage="currentPage = $event"
          @loading="loading = $event"
        ></pagination>
      </div>
      
    </div>
</div>

</template>
<script lang="ts" setup>
  import breadCrumb from '~/components/breadCrumb.vue';
  import products from '~/components/products.vue';
  import categories from '~/components/categories.vue';
  import pagination from '~/components/pagination.vue';
  const currentPage = ref<number>(1)
  const loading = ref<boolean>(false)


</script> 
<style>

</style>