<template>
  <div>
    <img alt="Лого" src="../assets/logo.png">
    <usertask/>
  </div>
</template>

<script>
// @ is an alias to /src
import usertask from '@/components/UserTask.vue'

export default {
  name: 'UserTask',
  components: {
   usertask
  }
}
</script>
