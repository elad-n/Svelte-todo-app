<script>
    import { Router, Route } from "svelte-routing";
    import TodoApp from './views/TodoApp.svelte';
    import Intro from './views/Intro.svelte';
    import NavLink from "./components/NavLink.svelte";
    export let url = "";
	export let name;
</script>

<main>
    <img src={'/img/svelte-logo-horizontal.svg'} alt="svelte logo" class="logo">

    <Router url="{url}">
      <nav>
        <NavLink to="/">Intro</NavLink>
        <NavLink to="todoapp">todo app</NavLink>
      </nav>
      <div>
        <Route path="/" component="{Intro}" />
        <Route path="/todoapp" component="{TodoApp}" />
      </div>
    </Router>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>