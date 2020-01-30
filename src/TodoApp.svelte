<script>
	import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';

    export let todos = [
        { id: 1, title: 'Learn Svelte', completed: false },
        { id: 2, title: 'Write todo app', completed: false },
        { id: 3, title: 'Teach it', completed: false },
        { id: 4, title: 'Go to sleep', completed: false },
    ];

    let currentTodo= ' ';
    let currentFilter = 'all';

    const addTodo = () => {
        todos = [...todos, {id: todos.length + 1, title: currentTodo, completed: false }];
        currentTodo= ' ';
    };

    const deleteTodo = (id) => {
        console.log(id);
        todos = todos.filter(todo => todo.id !== id);
    };

    const toggleCheck = (id) => {
        todos = todos.map(item=> {
          if(item.id === id) item.completed = !item.completed;
          return item;
        })
    };

    const updateFilter = filter => currentFilter = filter;

	$: filteredTodos = currentFilter === 'all'
		? todos
		: currentFilter === 'completed'
			? todos.filter(todo => todo.completed)
			: todos.filter(todo => !todo.completed);

    $: todosRemaining = filteredTodos.filter(todo => !todo.completed).length;

</script>

<div class="app-container">
    current {currentFilter}
    todos Remaining {todosRemaining}
    <div>
        add todo
        <input type="text" bind:value={currentTodo} >
        <button on:click={()=>{addTodo()}}> add todo </button>
    </div>
    {#each filteredTodos as {id, title, completed}, i}
        <div class="list-container" transition:fly="{{ y: 20, duration: 300 }}" >
         <input type="checkbox" on:click={toggleCheck(id)}>
         <div class="title" class:completed={completed}>{title}</div>
         <button on:click={deleteTodo(id)}>delete</button>
         </div>
    {/each}


    {#if !todos.length}
         <div class="all-done">all done</div>
    {/if}

    <div class="btn-container">
        <button on:click={()=>{updateFilter('all')} }>all tasks</button>
        <button on:click={()=>{updateFilter('active')} }>active</button>
        <button on:click={()=>{updateFilter('completed')} }>completed</button>
    </div>

</div>
<style>
    .app-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }
    input {
        margin: 0;
    }
    button {
        margin: 0;
    }
    .list-container {
        width: 50%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        margin-left: 10px;
        margin-right: 10px;
    }

    .btn-container {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
    }

    .all-done {

    }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

</style>
