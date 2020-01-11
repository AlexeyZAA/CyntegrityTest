
<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Добавляем задачу</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Ваша задача" float v-model="tasknameuser"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="время" float v-model="tasktime"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-button @click="taskAdd" style="margin: 6px 0">Отправить</v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import axios from "axios";
const apipath = "http://localhost:8888/taskapi/";

export default {
  name: "Taskadd",
  
  data() {
    return {
      tasknameuser: "",
      tasktime: ""
    };
  },
  methods: {
    taskAdd: function() {
      const taskadd = apipath;
      let postdata = {
          task_name: "this.codeCompare",
          task_time: "localStorage.getItem('phone')"
      }
      axios
        .post(taskadd, postdata)
        .then(resp => {
          alert(resp);
        })
        .catch(alert("Herovo"));
    }
  }
};
</script>