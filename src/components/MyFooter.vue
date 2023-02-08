<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ completedTodo }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearTodoList">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todoList"],
  computed: {
    completedTodo() {
      let count = 0;
      this.todoList.forEach((item) => {
        if (item.completed) count++;
      });
      return count;
    },
    total() {
      return this.todoList.length;
    },
    isAll: {
      get() {
        return this.completedTodo === this.total && this.total > 0;
      },
      set(value) {
        return this.$emit("checkAll", value);
      },
    },
  },
  methods: {
    clearTodoList() {
      this.$emit("clearTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>