<script>
  import DataTable from "~/components/DataTableC";
  import Textfield from "@smui/textfield";
  import { Icon } from "@smui/fab";
  import http from "~/http";
  import cheerio from "cheerio";
  import { push } from "svelte-spa-router";

  let searchkey = "全球高武";
  let hightLight = "";

  let list = [];
  let isLoading = false;
  const headers = [
    {
      prop: "name",
      label: "书名",
      clickable: true,
    },
    {
      prop: "header",
      label: "当前阅读",
      clickable: true,
    },
    // {
    //   prop: "author",
    //   label: "作者",
    // }
  ];
  const itemClick = (cEvent) => {
    let {prop, item } = cEvent.detail;
    console.log(item)
    switch (prop) {
      case "name":
        push("/contents/" + item["nameId"]);
        break;
      case "header":
      default:
        push("/detail/" + item["id"]);
        break;
    }
  };
  list = Object.values(window.localStorage).map(i=>{
    return i && JSON.parse(i);
  })
  console.log(list)
</script>
{#if list && list[0]}
  <DataTable data={list} {headers} on:itemClick={itemClick} />
{/if}

