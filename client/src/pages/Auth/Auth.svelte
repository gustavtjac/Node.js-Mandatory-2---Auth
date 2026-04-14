<script>
    import Navbar from "../../components/Nav/Navbar.svelte";
    import Login from "../../components/Login/Login.svelte";
    import Register from "../../components/Register/Register.svelte";

  let view = 'login';



</script>

<Navbar/>


<main aria-label="Authentication">
  {#if view === 'login'}
    <Login />
    <footer>
      <p>Don't have an account? <button type="button" on:click={() => view = 'register'}>Create one</button></p>
    </footer>
  {:else}
    <Register />
    <footer>
      <p>Already have an account? <button type="button" on:click={() => view = 'login'}>Sign in</button></p>
    </footer>
  {/if}
</main>



