<script>
import { Router, Link, Route } from "svelte-routing";
import { user } from "../../stores/userStore.js";
</script>


<Router>
 <nav>
  <Link to="/">Landingpage</Link>
  {#if $user}
    <Link to="/dashboard">Home</Link>
  {:else}
    <Link to="/auth">Auth</Link>
  {/if}
</nav>
</Router>


