<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '@/components/layout/BaseLayout.vue';

</script>

<template>

  <BaseLayout>
    <template #header>
      <a href=""></a>
    </template>
    <template #main>
      <RouterView />
    </template>
    <template #footer>
      <p>Copyright &copy; <a href="https://vk.ru/mslimka" class="underline">Максим Штиль</a></p>
    </template>
  </BaseLayout>
</template>

<script>
export default {
  mounted(){
    const popElements = document.querySelectorAll('.pop')
    popElements.forEach(popElement => {
      popElement.style.animation = "pop 0.6s ease-out";
    })
  },
  
  components: {
    BaseLayout
  }
}
</script>
<style>
#app {
  position: relative;
  background: url('/blob-scene.svg') no-repeat center center !important;
  background-size: 2000px;
  overflow-x:hidden;

}

</style>
