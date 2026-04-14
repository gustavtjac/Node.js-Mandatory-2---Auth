<script>
  let email = '';
  let password = '';
  let submitted = false;

  function handleSubmit() {
    submitted = true;
  }
</script>

<section aria-labelledby="login-heading">
  <header>
    <h1 id="login-heading">Sign in</h1>
    <p>Welcome back</p>
  </header>

  <form on:submit|preventDefault={handleSubmit}>
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} placeholder="gustavo@roque.com" autocomplete="email" required />

    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} autocomplete="current-password" required/>

    <button type="submit">
      {submitted ? 'Signing in…' : 'Sign in'}
    </button>
  </form>

</section>