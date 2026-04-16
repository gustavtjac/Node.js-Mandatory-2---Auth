<script>
  import { fetchPost } from "../../util/fetchUtil.js";
  let username = "";
  let password = "";
  let submitted = false;

  async function handleSubmit() {
    submitted = true;

    try {
      const result = await fetchPost("/auth/login", {
        username,
        password,
      });

      console.log(result);
      //SKIFT MED CUSTOM ALARM
      //TILFØJ AT DER ER FRONTEND AUTH
      //REDIRECT TIL DASHBOARD
      alert(result.data.successMessage);
    } catch (error) {
      //SKIFT MED CUSTOM ALARM
      alert(error.data.errorMessage);
    }
  }
</script>

<section aria-labelledby="login-heading">
  <header>
    <h1 id="login-heading">Sign in</h1>
    <p>Welcome back</p>
  </header>

  <form on:submit|preventDefault={handleSubmit}>
    <label for="username">Email</label>
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
      autocomplete="current-password"
      required
    />

    <button type="submit">
      {submitted ? "Signing in…" : "Sign in"}
    </button>
  </form>
</section>
