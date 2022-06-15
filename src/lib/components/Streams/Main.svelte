<script lang="ts">
  import {activeStream} from './store';
  
  function actionFunc(el:HTMLVideoElement) {
    activeStream.subscribe((stream)=>{
      console.log(`active stream updated: ${stream}`)
      el.srcObject = stream;
    })
  };
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video use:actionFunc autoplay></video>