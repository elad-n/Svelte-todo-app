<script>
	import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';
    import AddTodo from './AddTodo.svelte';
    // import the global store.
    import { todoFromStore } from '../stores/store';

    let todos = todoFromStore;
    let currentFilter = 'all';

    // subscribe to any change in this value from the store.
    todoFromStore.subscribe(value => {
      // here can do whatever we want we the new changed (probably from a different component to out store todos)
      todos = value;
    });

    const deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
    };

    const toggleCheck = (id) => {
        todos = todos.map(item=> {
          if(item.id === id) item.completed = !item.completed;
          return item;
        });
    };

    const updateFilter = filter => currentFilter = filter;

    const checkAll = () => {
      todos = todos.map(item => {
        item.completed = true;
        return item;
      });
    };

	$: filteredTodos = currentFilter === 'all'
		? todos
		: currentFilter === 'completed'
			? todos.filter(todo => todo.completed)
			: todos.filter(todo => !todo.completed);

    $: todosRemaining = filteredTodos.filter(todo => !todo.completed).length;

</script>

<div class="app-container">
    <h1>Todo App</h1>
    <AddTodo />

    <div class="current-filter-container">current filter - {currentFilter}</div>

    <div class="list-container">
        {#each filteredTodos as {id, title, completed}, i}
            <div class="todo-item-container" transition:fly="{{ y: 20, duration: 300 }}" >
                <div class="todo-item" on:click={toggleCheck(id)}>
                    <input type="checkbox" bind:checked={completed} />
                    <div class="title" class:completed={completed}>{title}</div>
                </div>

                <button on:click={deleteTodo(id)}>delete</button>
             </div>
        {/each}
    </div>

    {#if !todos.length}
         <div class="all-done">All Done</div>
    {/if}

    <div class="todos-remaining">todos Remaining: {todosRemaining}</div>

    <div class="btn-container">
        <div>
           <button on:click={()=>{updateFilter('all')} } class:active="{currentFilter === 'all'}">all tasks</button>
            <button on:click={()=>{updateFilter('active')} } class:active="{currentFilter === 'active'}">active</button>
           <button on:click={()=>{updateFilter('completed')} } class:active="{currentFilter === 'completed'}">completed</button>
        </div>
        <div>
            <button on:click="{checkAll}">clear all completed</button>
        </div>
    </div>

</div>
<style lang="scss">
svg {
		display: block;
		margin: 20px auto;
		height: 75px;
}
    .app-container {
        display: flex;
        flex-flow: column;
        .current-filter-container {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
        }
        .list-container {
                margin-top: 20px;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
            .todo-item-container {
                    width: 100%;
                    display: flex;
                    flex: 1;
                    margin-bottom: 12px;
                    animation-duration: 0.3s;
                    justify-content: space-between;
            .todo-item {
                         cursor: pointer;
                         display: flex;
                         align-items: center;
                    }
         }}
    }
    .title {
        margin-left: 10px;
        margin-right: 10px;
    }

    .btn-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }
    .todos-remaining {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    button {
        cursor: pointer;
        font-size: 14px;
         background-color: white;
         appearance: none;
         &:hover {
           background: salmon;
         }
         &:focus {
           outline: none;
         }
      }
      .active {
        background: salmon;
      }

    .all-done {

    }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

</style>
