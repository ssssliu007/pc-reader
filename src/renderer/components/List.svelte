<script>
  import DataTable from "~/components/DataTableC";
  import Textfield from "@smui/textfield";
  import HelperText from '@smui/textfield/helper-text/index';
  import { Icon } from "@smui/fab";
  import { createEventDispatcher } from 'svelte';
  import http from "~/http";
  import cheerio from "cheerio";
  // import { push } from "svelte-spa-router";
  export let id;
  const emitEvent = createEventDispatcher()

  let searchkey = "";
  let hightLight = "";
  let list = [];
  let onShowList = [];
  let isLoading = false;
  let isOnTyping = false;
  let isNoData = false;
  const rowCount = 5;
  const headers = Array.from({ length: rowCount }).map((i, prop) => ({
    prop,
    clickable: true,
  }));

  const itemClick = (cEvent) => {
    emitEvent('itemClick', cEvent.detail)
  };

  const initList = () => {
    isLoading = true;
    list = [];
    let formData = new FormData();
    formData.append("searchkey", searchkey);
    return http
      .get("http://www.xbiquge.la/" + id.replace(/_/g, "/"))
      .then((res) => {
        let $ = cheerio.load(res.data);
        $("#list a").each((iNo, iEl) => {
          let elInfo = {
            label: $(iEl).text(),
            id: $(iEl).attr("href").replace(".html", "").replace(/\//g, "_"),
          };
          list.push(elInfo);
        });
        list = list;
        isLoading = false;
      })
      .catch((e) => {
        console.error(e);
        isLoading = false;
      });
  };
  const toSearch = (fList = list, reverse = false) => {
    let re = [];
    if (reverse === true) {
      fList.reverse();
    }
    let iNo = 0;
    fList.forEach((i) => {
      if (!searchkey || (i.label && i.label.match(searchkey))) {
        if (iNo % rowCount === 0) {
          re.push([i]);
        } else {
          re[~~(iNo / rowCount)].push(i);
        }
        iNo++;
      }
    });
    if(re[0]){
      hightLight = searchInput;
      onShowList = re;
    }else{
      isNoData = !!onShowList[0]
    }
  };
  let searchInputTimer;
  const searchInput = () => {
    isOnTyping = true;
    isNoData = false;
    clearTimeout(searchInputTimer);
    searchInputTimer = setTimeout(() => {
      isOnTyping = false;
      toSearch();
    }, 800);
  };

  initList().then(toSearch);
</script>

<div class="main-wrap">
  <div class="search-wrap">
    <Textfield
      fullwidth withTrailingIcon class="input-wrap" bind:value={searchkey} on:input={searchInput}
    >
      {#if isLoading === true}
        <Icon class="mdc-text-field__icon">
          <i class="material-icons loading-rolling">cached</i>
        </Icon>
      {:else if isOnTyping === true}
        <Icon class="mdc-text-field__icon">
          <i class="material-icons loading-shining">more_horiz</i>
        </Icon>
      {/if}
    </Textfield>
    <div class:show={isNoData} class="error-message-text">没找到关键词相关项目</div>
  </div>
  <div class="table-wrap">
    <DataTable
      data={onShowList}
      {headers}
      on:itemClick={itemClick}
      showHead={false}
      hightLight={hightLight}
    />
  </div>
</div>

<style>
  .main-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .search-wrap {
    margin-bottom: 10px;
  }
  .table-wrap {
    flex: 1;
    overflow-y: scroll;
  }
  .table-wrap :global(.cell-inner-text) {
    max-width: 15em;
    white-space: normal;
  }
  .error-message-text{
    font-size: 12px;
    height: 0;
    line-height: 1.6;
    color: rgb(202, 23, 23);
    opacity: 0;
    transition: all .3s .1s;
  }
  .error-message-text.show{
    height: 1.6em;
    opacity: 1;
  }
</style>
