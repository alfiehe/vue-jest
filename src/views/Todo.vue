<template>
  <div class="todolist">
    <header>
      <h5>TodoList</h5>
      <input
        v-model="todoText"
        @keyup.enter="handleEnter"
        type="text" 
      />
    </header>
    <div class="todolist-con">
    <h4>待完成</h4>
    <ul class="wait-to-do">
      <li>
        <p>
          <i>0</i>
          <input type="text" />
        </p>
        <p>
          <span class="move">√</span>
          <span class="del">-</span>
        </p>
      </li>
    </ul>
    <h4>已完成</h4>
    <ul class="has-completed">
      <li>
        <p>
          <i>0</i>
          <input type="text" />
        </p>
        <p>
          <span class="move">X</span>
          <span class="del">-</span>
        </p>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Todo',
  data: () => ({
    todoText: '',
    todoList: []
  }),
  methods: {
    handleEnter(e) {
      if (this.todoText.trim().length > 0) {
        this.todoList.splice(this.todoList.length, 0, this.todoText)
      }
    }
  }
}
</script>

<style lang="scss">
    .todolist {
        h4 {
            text-align: left;
            margin: 15px 0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            h5 {
                margin: 0;
                font-size: 18px;
            }
            input {
                width: 400px;
                outline: none;
                border: none;
                padding: 0 5px;
            }
            div {
                width: 600px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
            }
        }
        .todolist-con {
            width: 600px;
            margin: 0 auto;
            ul {
                margin: 0;
                padding: 0;
                li {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    background-color: #fff;
                    border-radius: 3px;
                    line-height: 2em;
                    & + li {
                        margin-top: 15px;
                    }
                    p {
                        margin: 0;
                        padding-right: 5px;
                        input {
                            border: none;
                            width: 450px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            outline: none;
                        }
                        i {
                            width: 20px;
                            display: inline-block;
                            color: #fff;
                            margin-right: 10px;
                            font-style: normal;
                            font-size: 14px;
                            background-color: #ea6969;
                            border-bottom-left-radius: 3px;
                            border-top-left-radius: 3px;
                        }
                    }
                    span {
                        display: inline-block;
                        cursor: pointer;
                        color: #999;
                        width: 30px;
                    }
                }
                &.has-completed {
                    li {
                        p {
                            i {
                                background-color: #42b142;
                            }
                        }
                    }
                }
            }
        }
    }
</style>