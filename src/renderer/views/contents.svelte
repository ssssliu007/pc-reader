<script>
  import List from "~/components/List";
  import {push} from 'svelte-spa-router'
  export let params = {};
  const itemClick = (cEvent) => {
    let { e, prop, item } = cEvent.detail;
    let id = item[prop].id;
    if(id){
      push('/detail/' + id)
    }
    console.log(e, prop, item);
  };
</script>

<div class="wrap">
  <List id={params.id} on:itemClick={itemClick} />
</div>

<style>
  .wrap {
    height: 100%;
    overflow-y: auto;
  }
</style>
