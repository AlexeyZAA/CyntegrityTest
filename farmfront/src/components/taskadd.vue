
<template id="main">
<v-ons-page>
  <v-ons-toolbar>
    <div class="center">Добавляем задачу</div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="Ваша задача" float
          v-model="taskname"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="время" float
          v-model="tasktime"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
        <v-ons-list-item>
      <div class="center">
        <v-ons-button @click="setTask" style="margin: 6px 0">Отправить</v-ons-button>
      </div>
    </v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import axios from 'axios'
var loginpath = 'http://localhost:3333' // 'http://localhost:3333'// http://mapi.ctrans.ru

export default {
  name: 'Taskadd',
  data () {
    return {
      taskname: '',
      tasktime: '',
    }
  },
  methods: {
    setTask: function () {
      const patchLogin = loginpath + '/api/auth/login'
      axios
        .get(patchLogin, {
          tasknamepar: this.taskname,
          tasktimepar: this.tasktime
        })
        .then()
        .catch()
    }
  }
}
</script>