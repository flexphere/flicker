<script lang="ts">
  import {activeStream, streams} from './store';
  
  function actionFunc(el:HTMLVideoElement) {
    activeStream.subscribe((stream)=>{
      console.log(`active stream updated: ${stream}`)
      el.srcObject = stream;
    })
  };
</script>

<div>
{#if $streams.length && $activeStream}
<!-- svelte-ignore a11y-media-has-caption -->
<video use:actionFunc autoplay></video>
{/if}
</div>

<style>
  div {
    height: 100%;
    background: url('/logo.png') no-repeat center center;
  }
  video {
    width: 100%;
    height: 100%;
  }
</style>