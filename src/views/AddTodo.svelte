<script>
    import { todoFromStore } from '../stores/store';

    let currentTodo = ' ';

    function addTodo() {
         todoFromStore.update(value => {
              return [...value, {id: value.length + 1, title: currentTodo, completed: false }];
         });
         currentTodo= ' ';
    }

    function handleInput(event) {
      console.log(event);
      currentTodo = event.target.value;
    };

</script>

<div class="input-container">
    <input placeholder="What needs to be done" class="todo-input" type="text" value={currentTodo} on:input={handleInput} >
    <button on:click={()=>{addTodo()}}> add todo </button>
</div>

<style lang="scss">
   .input-container {
         display: flex;
        .todo-input {
            width: 100%;
            padding: 10px 18px;
            font-size: 18px;
        }
   }
</style>