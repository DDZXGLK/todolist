<template>
  <div class="todo-header">
    <input
      type="text"
      @keyup.enter="addTodo"
      v-model="name"
      placeholder="请输入你的任务名称，按回车键确认"
    />
  </div>
</template>

<script>
// 引入自动生成id的库nanoid
import { nanoid } from "nanoid";

export default {
  name: "MyHeader",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addTodo(e) {
      const newTodo = { id: nanoid(), name: this.name, completed: false };
      this.$emit("recive",newTodo);
      this.name = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}
</style>