<script>
  import { Router, Link, navigate } from "svelte-routing";
  import { user } from "../../stores/userStore.js";
  import { fetchPost } from "../../util/fetchUtil.js";
  import { toast } from "svelte-sonner";

  async function logout() {
    try {
      const result = await fetchPost("/auth/logout");
      user.set(null);
      toast.success(result.data.successMessage);
      navigate("/");
    } catch (error) {
      toast.success(error.data.errorMessage);
    }
  };

</script>

<Router>
  <nav>
    <Link to="/">Landingpage</Link>
    {#if $user}
      <Link to="/dashboard">Home</Link>
      <button onclick={logout}>Logout</button>
    {:else}
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    {/if}
  </nav>
</Router>
