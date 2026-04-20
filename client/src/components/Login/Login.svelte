<script>
  import { fetchPost } from "../../util/fetchUtil.js";
  import { navigate } from 'svelte-routing';
  import { toast } from 'svelte-sonner'
  import { checkAuth } from "../../stores/userStore.js";
  let username = "";
  let password = "";
  let submitted = false;

  async function handleSubmit(event) {
    event.preventDefault();
    submitted = true;

    try {
      const result = await fetchPost("/auth/login", {
        username,
        password,
      });
      await checkAuth();
      toast.success(result.data.successMessage);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.data.errorMessage)
    }
  };

</script>

<section aria-labelledby="login-heading">
  <header>
    <h1 id="login-heading">Sign in</h1>
    <p>Welcome back</p>
  </header>

  <form onsubmit={handleSubmit}>
    <label for="username">Username</label>
    <input
      id="username"
      type="username"
      bind:value={username}
      placeholder="Username"
      required
    />

    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={password}
      required
    />

    <button type="submit">
      {submitted ? "Signing in…" : "Sign in"}
    </button>
  </form>
</section>
