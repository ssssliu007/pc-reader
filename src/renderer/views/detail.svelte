{#await pendingPromise}
	<!-- promise is pending -->
	<div class="mdc-text-field__icon detail-loading-icon-wrap">
    <i class="material-icons loading-rolling detail-loading-icon">cached</i>
  </div>
{:then value}
	<!-- promise was fulfilled -->
	<Reader {pages} on:scrollToBottom={scrollToBottom} {isNoMore}/>
{:catch error}
	<!-- promise was rejected -->
	<p>哎呀哪里搞错了嘞: {error.message}</p>
{/await}

<script>
import Reader from "~/components/Reader"
import cheerio from "cheerio";
import http from "~/http"
export let params = {};

let id = params.id;
let pages = [];
let isNoMore = false;

const getPage = (id, isShift)=>{
  return http.get('http://www.xbiquge.la' + id.replace(/_/g, '/') + '.html').then((res)=>{
    let $ = cheerio.load(res.data);
    let header = $(".bookname h1").text();
    let content = $("#content");
    content.find('p').each((i, el)=>{
      $(el).replaceWith('')
    })
    content = content.html();
    let fnIds = [];
    $(".bookname .bottem1 a").each((i, el)=>{
      let id = $(el).attr('href');
      if( /\.html$/.test(id)){
        fnIds.push(id.replace('.html', '').replace(/\//g,'_'))
      }
    });
    let name = $(".con_top a").last().text();
    let nameId = $(".con_top a").last().attr('href').replace('http://www.xbiquge.la', '').replace(/\//g,'_');
    let thisPage = {
      id, name, nameId, header, content,
      nextId: fnIds[1], preId: fnIds[0]
    };
    pages[isShift === true ? 'unshift' : 'push'](thisPage);

    if(pages[3]){
      pages[isShift === true ? 'pop' : 'shift']();
    }
    pages = pages
    console.log(thisPage)
    return thisPage
  })
}
let pendingPromise = getPage(id);

function scrollToBottom({detail}){
  console.log(detail);
  if(!detail.nextId){
    isNoMore = true
    return Promise.resolve();
  }
  return getPage(detail.nextId).then((thisPage)=>{
    detail.done && detail.done(thisPage)
  }).catch((e)=>{
    console.error(e)
    setTimeout(() => {
      detail.done && detail.done(thisPage)
    }, 3000);
  })
}

</script>
<style>
  .detail-loading-icon-wrap{
    display: flex;
    height: 100%;
    width: 100%;
  }
  .detail-loading-icon{
    text-align: center;
    font-size: 32px;
    color: #1eb2ff;
    margin: auto;
  }
</style>
