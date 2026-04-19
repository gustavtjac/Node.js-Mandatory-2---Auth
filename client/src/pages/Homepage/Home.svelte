<script>
    import Navbar from "../../components/Nav/Navbar.svelte";
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { user } from "../../stores/userStore.js";

    onMount(() => {
        if (!$user) navigate('/auth')
    });


</script>
<Navbar/>
<h2>Home / Dashboard </h2>

