<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import { createEventDispatcher } from "svelte";
  export let data = [];
  export let headers = [];
  export let showHead = true;
  export let hightLight = "";
  const emitEvent = createEventDispatcher();
</script>

<div class="data-tabel-frame">
  {#if data && data[0]}
    <DataTable>
      {#if showHead}
        <Head>
          <Row>
            {#each headers as header, index (index)}
              <Cell>{header.label}</Cell>
            {/each}
          </Row>
        </Head>
      {/if}
      <Body>
        {#each data as item, index (index)}
          <Row>
            {#each headers as { prop, clickable } (prop)}
              <Cell on:click={(e) => emitEvent("itemClick", { e, prop, item })}>
                <span class:clickable class="cell-inner-text"
                  >{@html (() => {
                    let reHtml =
                      (item[prop] && item[prop].label) || item[prop] || "";
                    if (hightLight) {
                      reHtml = reHtml.replace(
                        new RegExp(hightLight, "g"),
                        (v) => `<span class="hight-light">${v}</span>`
                      );
                    }
                    return reHtml;
                  })()}</span
                >
              </Cell>
            {/each}
          </Row>
        {/each}
      </Body>
    </DataTable>
  {/if}
</div>

<style>
  .data-tabel-frame :global(.mdc-data-table) {
    width: 100%;
  }
  .data-tabel-frame :global(.mdc-data-table__row) {
    cursor: pointer;
  }

  :global(.mdc-data-table__cell:hover .cell-inner-text.clickable),
  :global(.mdc-data-table__cell:hover .cell-inner-text.clickable .hight-light) {
    color: var(--mdc-theme-primary, #ff3e00);
  }
</style>
