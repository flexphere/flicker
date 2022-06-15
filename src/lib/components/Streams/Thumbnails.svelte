<script lang="ts">
  import {activeStream, streams} from './store'

  function ContentLoaded(el:HTMLVideoElement) {
    const stream = $streams.find(s => s.id == el.getAttribute("data-id"))
    if (stream) {
      el.srcObject = stream;
    }
  }

  async function addStream() {
    const stream = await navigator.mediaDevices.getDisplayMedia({audio:false,video:true});
    if (stream) {
      console.log(stream.getTracks()[0].getConstraints())
      streams.set([...$streams, stream]);
      activeStream.set(stream);
    }
  }

  function activate(stream:MediaStream) {
    activeStream.set(stream);
  }
</script>

<div>
  {#each $streams as stream}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video use:ContentLoaded on:click={()=>{activate(stream)}} data-id="{stream.id}" autoplay></video>
  {/each}

  <button on:click={addStream}>add</button>
</div>