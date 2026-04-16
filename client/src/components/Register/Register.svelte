<script>
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let submitted = false;

  function handleSubmit() {
    submitted = true;    
  }
</script>

<section aria-labelledby="register-heading">
  <header>
    <h1 id="register-heading">Create account</h1>
    <p>Sign up to get started</p>
  </header>

  <form on:submit|preventDefault={handleSubmit}>
    <fieldset>
      <legend>Your name</legend>
      <label for="first-name">First name</label>
      <input id="first-name" type="text" bind:value={firstName} placeholder="Gustavo" autocomplete="given-name" required />

      <label for="last-name">Last name</label>
      <input id="last-name" type="text" bind:value={lastName} placeholder="Rock" autocomplete="family-name" required />
    </fieldset>

    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} placeholder="gustavo@roque.com" autocomplete="email" required />

    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} autocomplete="new-password" required />

    <label for="confirm-password">Confirm password</label>
    <input id="confirm-password" type="password" bind:value={confirmPassword} autocomplete="new-password" required />

    <button type="submit">
      {submitted ? 'Account created' : 'Create account'}
    </button>
  </form>
</section>