
<div class="wrap">
  <div class="wrap-background wrap-background-color"></div>
  <div class="wrap-background wrap-background-l"></div>
  <div class="wrap-background wrap-background-r"></div>
  <div class="wrap-background wrap-background-b"></div>
  <div class="wrap-background wrap-background-t"></div>
  <div class="wrap-background wrap-background-l-b"></div>
  <div class="wrap-header">
    <div class="wrap-header-drag"></div>
    <div class="wrap-router">
			<div class="wrap-router-icon" on:click={pop}>
				<Icon class="material-icons">navigate_before</Icon>
			</div>
			<!-- <div class="wrap-router-icon">
				<Icon class="material-icons">navigate_next</Icon>
			</div> -->
		</div>
    <div class="wrap-fn-btn-wrap">
      <i class="material-icons mr-1 hover-blue" on:click={()=>push('/')}>home</i>
      <i class="material-icons">minimize</i>
      <i class="material-icons">crop_square</i>
      <i class="material-icons">close</i>
    </div>
  </div>
  <div class="wrap-box">
    <slot />
  </div>
</div>
<script>
  import Button, {Icon} from '@smui/icon-button';
  import {push, pop} from "svelte-spa-router"
  // push('/')
</script>

<style>
.wrap{
	height: 100vh;
	padding: 49px 22px 38px 40px;
	box-sizing: border-box;
	display: flex;
}
.wrap-box{
	position: relative;
	z-index: 11;
	overflow: auto;
	flex: 1;
	margin: 15px;
}
.wrap-header{
  display: flex;
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	right: 0;
  height: 48px;
  align-items: stretch;
}
.wrap-router{
	position: absolute;
	height: 22px;
	bottom: 0;
	left: 40px;
	display: flex;
	font-size: 22px;
	line-height: 1;
}
.wrap-router-icon{
	cursor: pointer;
	opacity: 0;
	transition: .3s .1s;
}
.wrap-router-icon:hover{
	opacity: 1;
}
.wrap-fn-btn-wrap{
	margin-right: 25px;
	margin-top: 2px;
	margin-bottom: 15px;
  display: flex;
  align-items: flex-end;
}
.wrap-header-drag{
	-webkit-app-region: drag;
	margin-left: 20px;
	margin-top: 5px;
	flex: 1;
	height: 20px;
}
.wrap-fn-btn-wrap .material-icons{
  color: rgba(255, 255, 255, .3);
  cursor: pointer;
  transition: all .3s;
  transform-origin: center bottom;
}
.wrap-fn-btn-wrap .material-icons:hover{
  color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}
.wrap-fn-btn-wrap .hover-blue:hover{
  color: rgba(30, 176, 255, 1);
}
.wrap-background{
	position: absolute;
	background: center/100% 100% no-repeat;
}
.wrap-background-color{
	top: 16px;
	right: 20px;
	bottom: 18px;
	left: 24px;
	/* background-color: rgba(241, 243, 244, 1); */
	background-color: rgba(255, 255, 255, 1);
}
.wrap-background-l{
	z-index: 1;
	left: 0;
	width: 39px;
	top: 18px;
	bottom: 26px;
	background-image: url("./assets/img/backgroung-wrap-l.png");
}
.wrap-background-r{
	z-index: 1;
	right: 0;
	width: 21px;
	top: 18px;
	bottom: 24px;
	background-image: url("./assets/img/backgroung-wrap-r.png");
}
.wrap-background-t{
	z-index: 8;
	height: 48px;
	left: 12px;
	right: 0;
	top: 0;
	background-image: url("./assets/img/backgroung-wrap-t.png");
}
.wrap-background-b{
	z-index: 8;
	height: 37px;
	left: 38px;
	right: 0;
	bottom: 0;
	background-image: url("./assets/img/backgroung-wrap-b.png");
}
.wrap-background-l-b{
	z-index: 9;
	width: 39px;
	height: 37px;
	left: 0;
	bottom: 0;
	background-image: url("./assets/img/backgroung-wrap-l-b.png");
}
.wrap-header:-moz-drag-over{
	background-color: rgba(255, 255, 255, .02);
}
</style>