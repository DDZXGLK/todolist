<template>
  <ul class="todo-main">
    <transition-group name="todoList" appear>
      <Item  v-for="(item) in todoList"
      :key="item.id" 
      :info="item ">
      </Item>
    </transition-group>
  </ul>
</template>

<script>
import Item from './Item.vue'

export default {
  name:'List',
  components:{
    Item
  },
  props:["todoList"]
}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    overflow: hidden;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
  
  .todoList-enter,.todoList-leave-to{
    transform: translateX(100%);
  }

  .todoList-enter-active,.todoList-leave-active{
    transition: 0.5s linear;
  }

  .todoList-leave,.todoList-enter-to{
    transform: translateX(0);
  }
</style>