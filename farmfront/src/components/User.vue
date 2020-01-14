
<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Задачи пользователя</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-action-sheet-button icon="md-square-o">{{ loginLabel }}</v-ons-action-sheet-button>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Пользователь" float v-model="tasknameuser"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="пароль" type="password" float v-model="passw"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="center">
          <v-ons-button @click="loginUser" style="margin: 6px 0">Войти</v-ons-button>
          <v-ons-button
            v-if="btnAdd"
            @click="actionSheetVisible = true"
            style="margin-left: 6px"
          >Добавить</v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list-header>Список задач</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item v-for="(value, index) in axiosjsonres" v-bind:key="index">
        <div class="left">
          <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40" />
        </div>
        <div class="center">
          <span class="list-item__title">Задача: {{ value.task_name }}</span>
          <span class="list-item__subtitle">Время: {{ value.task_time }}</span>
          <span v-if="false" class="list-item__subtitle">Id: {{ value._id }}</span>
        </div>
        <div>
          <v-ons-button @click="taskDel" style="margin: 6px 0">Удалить</v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable title="Новое задание">
      <v-ons-list>
        <v-ons-list-item>
          <v-ons-input placeholder="имя задачи" float v-model="task_name"></v-ons-input>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-input placeholder="время на выполнение" float v-model="task_time"></v-ons-input>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-action-sheet-button @click="taskAdd" icon="md-square-o">Добавить задачу</v-ons-action-sheet-button>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-action-sheet>
  </v-ons-page>
</template>

<script>
import axios from 'axios'
//путь до апи
const apipath = 'http://localhost:8888/taskapi/'; //or localhost
//предположим есть зарегестрированные юзеры
const usersarr = new Map([
  ["admin", "admin"],
  ["user", "user"],
  ["guest", "guest"]
]);
export default {
  name: "User",
  data() {
    return {
      tasknameuser: '',
      passw: '',
      loginLabel: '',
      userauth: false,
      axiosjsonres: [],
      arrlist: [], //массив списка задач
      btnAdd: false, //видимость кнопки вызова диалога
      actionSheetVisible: false,   //всплывайка добавляйка
      respPost: '',
      task_name: '',
      task_time: ''

    };
  },
  methods: {
    loginUser: function() {
      if (usersarr.has(this.tasknameuser)) {
        if (this.passw !== usersarr.get(this.tasknameuser)) {
          this.loginLabel = "неверный пароль";
        } else {
          this.loginLabel = this.tasknameuser;
          this.userauth = true;
          this.btnAdd = true;
        }
      } else {
        this.loginLabel = "нет пользователя";
      }
      if (this.userauth) {
        this.taskGet();
      }
    },
    taskGet: function() {
      axios
        .get(apipath)
        .then(response => {
          this.axiosjsonres = response.data;
        })
        .catch();
    },
    taskAdd: function() {
      axios
        .post(apipath, {
           datatask: {'task_name': this.task_name, 'task_time': this.task_time}
        })
        .then(response => {
          this.respPost = response;
        })
        .catch();
      this.$alert("Добавлена задача");
      this.actionSheetVisible = false;
      this.taskGet()
    },
    taskDel: function() {
      alert('Удалили котенка')
    }
  }
};
</script>