<template>
  <div>
    <img alt="Лого станларт" src="../assets/logo.png">
    <taskadd/>
  </div>
</template>

<script>
// @ is an alias to /src
import taskadd from '@/components/taskadd.vue'

export default {
  name: 'home',
  components: {
    taskadd
  }
}
</script>
