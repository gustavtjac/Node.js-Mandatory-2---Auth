<script>
  import { fetchPost } from "../../util/fetchUtil.js";
  import { toast } from 'svelte-sonner';
  import { navigate } from 'svelte-routing';

  let username = '';
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let submitted = false;

  async function handleSubmit(event) {
    event.preventDefault();
    submitted = true;
    try {
      const result = await fetchPost("/auth/register", {
        username,
        firstName,
        lastName,
        email,
        password1: password,
        password2: confirmPassword,
      });
      toast.success(result.data.successMessage);
      navigate('/login');
    } catch (error) {
      submitted = false;
      toast.error(error.data.errorMessage);
    }
  }
</script>

<section aria-labelledby="register-heading">
  <header>
    <h1 id="register-heading">Create account</h1>
    <p>Sign up to get started</p>
  </header>

  <form onsubmit={handleSubmit}>
    <label for="username">Username</label>
    <input id="username" type="text" bind:value={username} placeholder="gustavo1969" autocomplete="username" required />

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
      {submitted ? 'Creating account…' : 'Create account'}
    </button>
  </form>
</section>