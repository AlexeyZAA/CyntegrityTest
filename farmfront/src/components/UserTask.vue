<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Задачи пользователя</div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-action-sheet-button icon="md-square-o">
        {{
        loginLabel
        }}
      </v-ons-action-sheet-button>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input
            placeholder="юзеры: admin, user, guest - pass: также"
            v-model="tasknameuser"
            size="100"
          ></v-ons-input>
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
          >Добавить задачи</v-ons-button>
          <v-ons-button
            v-if="btnAdd"
            @click="
              actionSheetVisiblePip = true;
              pipGetCount();
            "
            style="margin-left: 6px"
          >Добавить конвейер</v-ons-button>
          <v-ons-button v-if="userauth" @click="logout" style="margin-left: 7px">Выйти</v-ons-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list>  
      <v-ons-list-item>
      <div>задачи для выбранного конвейера</div>
        <div class="center" style="margin-left: 10px">
        <v-ons-button v-if="userauth" @click="taskInPip" >Показать</v-ons-button>
        <v-ons-button v-if="userauth" @click="taskInPipAdd" style="margin-left: 10px">Добавить в конвеер</v-ons-button>
        </div>
      </v-ons-list-item>  
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>{{ myPip }}</v-ons-list-header>
      <v-ons-list-item expandable :expanded.sync="isVisiblePip">
        Все контейнеры
        <div class="expandable-content">
          <v-ons-list>
            <v-ons-list-item v-for="(value, index) in pipresponse" v-bind:key="index">
              <div class="left">
                <v-ons-radio :input-id="'radio-' + index" :value="value._id" v-model="selectedPip" style="border: ridge"></v-ons-radio>
              </div>
              <div class="center">
                <span class="list-item__title">Конвейер: {{ value.pip_name }}</span>
                <br />
                <span class="list-item__subtitle">Время на выполнение: {{ value.pip_time }}</span>
                <span style="display:none">Id: {{ value._id }}</span>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <br />

    <v-ons-list>
      <v-ons-list-header>Список задач</v-ons-list-header>
      <v-ons-list-item expandable :expanded.sync="isVisibleTask">
        Все задачи
        <div class="expandable-content">
          <v-ons-list>
            <v-ons-list-item v-for="(value, index) in axiosjsonres" v-bind:key="index">
              <div class="left">
                <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40" />
              </div>
              <div class="left">
                <v-ons-checkbox :input-id="'check-' + index" :value="value._id" v-model="checkedTask"></v-ons-checkbox>
              </div>
              <div class="center">
                <div class="center">
                  <span class="list-item__title">Задача: {{ value.task_name }}</span>
                  <br />
                  <span class="list-item__subtitle">Время: {{ value.task_time }}</span>
                  <span style="display: none">Id: {{ value._id }}</span>
                </div>
                <div style="margin-left: auto;">
                  <v-ons-button @click="taskDel(value._id)">Удалить</v-ons-button>
                </div>
              </div>
            </v-ons-list-item>
          </v-ons-list>
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

    <v-ons-action-sheet :visible.sync="actionSheetVisiblePip" cancelable title="Новый конвеер">
      <v-ons-list>
        <v-ons-list-item>
          <div style="color:black">
            <v-ons-input size="50" disabled="true">{{ tasknameuser }} № {{ numpip }}</v-ons-input>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-input placeholder="среднее время выполнения" float size="100" v-model="pip_time"></v-ons-input>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-action-sheet-button @click="pipAdd" icon="md-square-o">Добавить конвейер</v-ons-action-sheet-button>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-action-sheet>
  </v-ons-page>
</template>

<script>
import axios from "axios";
//путь до апи
const apipath = "http://localhost:8888/taskapi/";
const pippathcount = "http://localhost:8888/pipapi/count/pip";
const pippath = "http://localhost:8888/pipapi/";
//предположим есть зарегестрированные юзеры

const usersarr = new Map([
  ["admin", "admin"],
  ["user", "user"],
  ["guest", "guest"]
]);
export default {
  name: "usertask",
  data() {
    return {
      tasknameuser: "",
      passw: "",
      loginLabel: "",
      userauth: false,
      axiosjsonres: [],
      btnAdd: false, //видимость кнопки вызова диалога
      actionSheetVisible: false, //всплывайка добавляйка
      actionSheetVisiblePip: false, //всплывайка добавляйка конвееров
      respPost: "",
      task_name: "",
      task_time: "",
      pip_time: "",
      pip_name: this.tasknameuser + "№" + this.numpip,
      fordel: [],
      isVisiblePip: false,
      checkedTask: [], //отмеченные задачи
      isVisibleTask: false,
      myPip: "Конвейеры",
      userpip: "",
      pipresponse: [],
      numpip: 0,
      selectedPip: ""
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
        this.pipGet();
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
    taskInPip: function (){
      let ar = {checkObj: this.checkedTask}
      axios
        .put(pippath + this.selectedPip, { ar })
        .then()
        .catch();
    },
    taskInPipAdd: function () {
      axios
        .put(pippath + this.selectedPip, {data: {tasks: this.checkedTask, id: this.selectedPip }})
        .then()
        .catch();
    },
    taskAdd: function() {
      axios
        .post(apipath, {
          datatask: { task_name: this.task_name, task_time: this.task_time }
        })
        .then(response => {
          this.respPost = response;
        })
        .catch();
      this.$alert("Добавлена задача");
      this.actionSheetVisible = false;
      this.taskGet();
    },
    taskDel: function(idval) {
      axios
        .delete(apipath + idval)
        .then(() => {
          alert("then delete");
        })
        .catch();
      this.$alert("Удалена задача");
    },
    logout: function() {
      this.tasknameuser = "";
      this.passw = "";
      this.loginLabel = "";
      this.userauth = false;
      this.axiosjsonres = [];
      this.pipresponse = [];
      this.btnAdd = false;
      this.respPost = "";
      this.respPostPip = "";
      this.task_name = "";
      this.task_time = "";
      this.fordel = [];
      this.actionSheetVisible = false;
      this.actionSheetVisiblePip = false;
    },
    pipGetCount: function() {
      axios
        .get(pippathcount)
        .then(respip => {
          this.numpip = respip.data;
        })
        .catch();
    },
    pipGet: function() {
      axios
        .get(pippath)
        .then(response => {
          this.pipresponse = response.data;
        })
        .catch();
    },
    pipGetMy: function() {
      axios
        .get(pippath)
        .then(response => {
          this.pipresponse = response.data;
        })
        .catch();
    },
    pipAdd: function() {
      axios
        .post(pippath, {
          datapip: {
            pip_user: this.tasknameuser,
            pip_name: this.tasknameuser + " №" + this.numpip,
            pip_time: this.pip_time
          }
        })
        .then(resppost => {
          this.respPostPip = resppost;
        })
        .catch();
      this.actionSheetVisiblePip = false;
      this.$alert("Добавлен конвейер");
      this.pipGet();
    }
  }
};
</script>
