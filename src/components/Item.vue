<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="info.completed"
        @change="handleCheck(info.id)"
      />
      <span v-show="!info.isEdit">{{ info.name }}</span>
      <input
        type="text"
        v-show="info.isEdit"
        :value="info.name"
        ref="inputName"
        @blur="handleBlur(info, $event)"
      />
    </label>
    <button class="btn btn-danger" @click="handleDelete(info.id)">删除</button>
    <button
      class="btn btn-edit"
      v-show="!info.isEdit"
      @click="handleEdit(info)"
    >
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ["info"],
  methods: {
    // 选择
    handleCheck(id) {
      this.$bus.$emit("checkTodo", id);
    },
    // 删除
    handleDelete(id) {
      if (confirm("确定删除吗?")) {
        this.$bus.$emit("deleteTodo", id);
      }
    },
    // 编辑
    handleEdit(info) {
      // info.isEdit=true; 添加的数据不是响应式的
      if (info.hasOwnProperty("isEdit")) {
        //hasOwnProperty检测对象身上是否有某个属性，有则输出true
        info.isEdit = true;
      } else {
        this.$set(info, "isEdit", true);
      }
      this.$nextTick(function() {
        this.$refs.inputName.focus();
      });
    },
    handleBlur(info, e) {
      info.isEdit = false;
      // 修改逻辑(提供修改的id和修改的内容)
      if (e.target.value.trim() == "") return alert("输入框不能为空！");
      this.$bus.$emit("updateTodo", info.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>