<script>
	import Router from 'svelte-spa-router'
	import routes from "~/router";
	import Frame from "~/components/Frame";
	import {replace} from 'svelte-spa-router';
	replace('/home/')
</script>

<style></style>	

<Frame>
	<Router routes={routes} />
</Frame>
