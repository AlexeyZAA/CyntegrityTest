<template>
  <div>
    <img alt="Лого" src="../assets/logo.png">
    <user/>
  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/components/User.vue'

export default {
  name: 'User',
  components: {
   user
  }
}
</script>
