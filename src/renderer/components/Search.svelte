<script>
  import DataTable from "~/components/DataTableC";
  import Textfield from "@smui/textfield";
  import { Icon } from "@smui/fab";
  import http from "~/http";
  import cheerio from "cheerio";
  import { push } from "svelte-spa-router";

  let searchkey = "";
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
      prop: "latest",
      label: "最新章节",
      clickable: true,
    },
    {
      prop: "author",
      label: "作者",
    },
    {
      prop: "date",
      label: "更新日期",
    },
  ];
  const itemClick = (cEvent) => {
    let {prop, item } = cEvent.detail;
    console.log(item)
    switch (prop) {
      case "id":
      case "name":
      default:
        push("/contents/" + item["id"]);
        break;
      case "latest":
        push("/detail/" + item["latestId"]);
        break;
    }
  };
  const toSearch = () => {
    isLoading = true;
    list = [];
    let formData = new FormData();
    formData.append("searchkey", searchkey);
    return http
      .post("http://www.xbiquge.la/modules/article/waps.php", formData)
      .then((res) => {
        let $ = cheerio.load(res.data);
        $("#content tr").each((i, el) => {
          if (i === 0) {
            return;
          }
          let id = $(el).children().eq(0).find("a").attr("href");
          let latestId = $(el).children().eq(1).find("a").attr("href");
          if (id) {
            id = id.replace("http://www.xbiquge.la/", "").replace(/\//g, "_");
          }
          if (latestId) {
            latestId = latestId.replace(".html", "").replace(/\//g, '_');
          }
          let info = {
            id,
            latestId,
            name: $(el).children().eq(0).text().replace(/\s/g, ""),
            latest: $(el).children().eq(1).text().replace(/\s/g, ""),
            author: $(el).children().eq(2).text().replace(/\s/g, ""),
            date: $(el).children().eq(3).text().replace(/\s/g, ""),
          };
          list.push(info);
        });
        hightLight = searchkey;
        list = list;
        isLoading = false;
      })
      .catch((e) => {
        console.error(e);
        isLoading = false;
      });
  };
  toSearch();
</script>

<div class="search-wrap">
  <Textfield
    fullwidth
    withTrailingIcon
    label="搜索"
    class="input-wrap"
    bind:value={searchkey}
  >
    {#if isLoading === true}
      <Icon class="mdc-text-field__icon">
        <i class="material-icons loading-rolling">cached</i>
      </Icon>
    {:else}
      <Icon
        role="button"
        tabindex
        on:click={toSearch}
        class="mdc-text-field__icon material-icons"
      >search</Icon>
    {/if}
  </Textfield>
</div>
<DataTable data={list} {headers} on:itemClick={itemClick} hightLight={hightLight} />

<style>
  .search-wrap {
    /* display: flex; */
    margin-bottom: 15px;
  }
  .search-wrap :global(.input-wrap) {
    /* flex: 1; */
    margin-right: 10px;
  }
</style>
