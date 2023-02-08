<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @recive="recive"></MyHeader>
        <List
          :todoList="todoList"
          :checkTodo="checkTodo"
          :deleteTodo="deleteTodo"
        >
        </List>
        <MyFooter
          :todoList="todoList"
          @checkAll="checkAll"
          @clearTodo="clearTodo"
        ></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import List from "./components/List.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    List,
    MyFooter,
  },
  data() {
    return {
      todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    };
  },
  methods: {
    //添加新待办
    recive(todoObj) {
      this.todoList.unshift(todoObj);
    },
    // 取消勾选
    checkTodo(id) {
      this.todoList.forEach((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
      });
    },
    // 删除待办项
    deleteTodo(id) {
      this.todoList = this.todoList.filter((item) => {
        return item.id !== id;
      });
    },
    // 全选/全不选
    checkAll(completed) {
      this.todoList.forEach((item) => {
        item.completed = completed;
      });
    },
    // 清除选中的Todo
    clearTodo() {
      this.todoList = this.todoList.filter((item) => {
        return !item.completed;
      });
    },
    updateTodo(id, name) {
      this.todoList.forEach((item) => {
        if (item.id === id) item.name = name;
      });
    },
  },
  watch: {
    todoList: {
      deep: true,
      handler(value) {
        localStorage.setItem("todoList", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo");
    this.$bus.$off("deleteTodo");
    this.$bus.$off("updateTodo");
  },
};
</script>

<style>
/* base */
body {
  background-color: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(31, 119, 153);
  margin-right: 5px;
}

.btn-edit:hover {
  color: #fff;
  background-color: rgb(31, 119, 153);
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
