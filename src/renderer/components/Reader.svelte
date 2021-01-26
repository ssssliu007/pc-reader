<script>
  import { onMount, createEventDispatcher, beforeUpdate } from "svelte";
  export let pages = [];
  export let isNoMore = false;
  const emitEvent = createEventDispatcher();
  let wrapDom;
  let isLoading = false;
  let isload = false;
  onMount(() => {
    let chokeTimer;
    let bottomPer = 1;
    wrapDom &&
      wrapDom.addEventListener("scroll", (e) => {
        if (chokeTimer) return;
        chokeTimer = setTimeout(() => {
          let { offsetHeight, scrollHeight, scrollTop, offsetWidth } = wrapDom;
          if (!isLoading && !isNoMore) {
            if (
              (scrollHeight - scrollTop - offsetHeight) / offsetHeight <
              bottomPer
            ) {
              isLoading = true;
              emitEvent("scrollToBottom", {
                done: (thisPage) => {
                  setTimeout(() => {
                    console.log(thisPage.dom);
                  }, 300);
                  isLoading = false;
                },
                nextId: pages[pages.length - 1].nextId,
              });
            } else {
            }
          }
          chokeTimer = 0;
          setOffsetInfo(scrollTop, offsetWidth);
        }, 300);
      });
  });
  beforeUpdate(() => {
    // console.log(pages);
    if (!isload) {
      if (pages && pages[0]) {
        isload = initScroll();
      }
    }
  });
  function initScroll() {
    let idArray = pages[0].id.split("_");
    idArray.pop();
    let scrollInfo = window.localStorage.getItem(idArray.join("_"));
    try {
      scrollInfo = JSON.parse(scrollInfo);
    } catch (error) {
      setTimeout(() => {
        setOffsetInfo(0, wrapDom.offsetWidth);
      }, 1000);
      return false;
    }
    if (!(scrollInfo && scrollInfo.id && pages[0].id === scrollInfo.id)) {
      setTimeout(() => {
        setOffsetInfo(0, wrapDom.offsetWidth);
      }, 1000);
      return;
    }
    setTimeout(() => {
      wrapDom.style.width = scrollInfo.winWidth + "px";
      wrapDom.scrollTop = scrollInfo.scrollTop;
      setTimeout(() => {
        wrapDom.style.width = null;
      }, 50);
    }, 100);
    return true;
  }
  function setOffsetInfo(scrollTop, offsetWidth) {
    let thisPage;
    let pageScrollTop = pages.reduce((sTop, p) => {
      let { scrollHeight } = p.contentDom;
      if (sTop > scrollHeight) {
        return sTop - scrollHeight;
      } else {
        thisPage = thisPage || p;
        return sTop;
      }
    }, scrollTop);
    let idArray = thisPage.id.split("_");
    idArray.pop();
    window.localStorage.setItem(
      idArray.join("_"),
      JSON.stringify({
        id: thisPage.id,
        scrollTop: pageScrollTop,
        winWidth: offsetWidth,
        name: thisPage.name,
        nameId: thisPage.nameId,
        header: thisPage.header,
      })
    );
    console.log(thisPage)
  }
</script>

<div class="wrap" bind:this={wrapDom}>
  {#each pages as page (page.id)}
    <div class="header">
      {page.header}
    </div>
    <div class="content" bind:this={page.contentDom}>
      {@html page.content}
    </div>
  {/each}
  {#if isNoMore}
    <p class="is-no-more">没有更多了 Orz</p>
  {/if}
</div>

<style>
  .header {
    font-size: 160%;
    text-align: center;
    font-weight: 1000;
  }
  .wrap {
    height: 100%;
    overflow-y: auto;
  }
  .content {
    min-height: 150vh;
    user-select: none;
  }
  .is-no-more{
    opacity: .6;
    text-align: center;
    color: #1eb2ff;
  }
</style>
