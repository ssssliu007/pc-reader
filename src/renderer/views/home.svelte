<script>
  import Search from "~/components/Search";
  import Viewed from "~/components/Viewed";
  import Tab, { Label} from '@smui/tab';
  import {replace} from 'svelte-spa-router'
  import TabBar from '@smui/tab-bar';
  export let params = {};
  const tabs = ['search', 'viewed']
</script>
<TabBar {tabs} let:tab on:MDCTabBar:activated={({detail})=>{
  replace('/home/' + tabs[detail.index])
}}>
  <Tab {tab} minWidth>
    <Label>{tab}</Label>
  </Tab>
</TabBar>
<br />
{#if params.tab === 'search'}
  <Search />
{:else if params.tab === 'viewed'}
  <Viewed />
{:else}
  <Search />
{/if}
