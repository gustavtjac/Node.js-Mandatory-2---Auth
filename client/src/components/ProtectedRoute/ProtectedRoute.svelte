<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { checkAuth, user } from '../../stores/userStore.js';

    let ready = false;

    onMount(async () => {
        await checkAuth();
        if (!$user){
            return navigate('/auth')
        } 
        return ready = true;
    });
</script>

{#if ready}
    <slot />
{/if}