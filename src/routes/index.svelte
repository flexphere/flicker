<script lang="ts">

  async function getMedia(audio: boolean, video:boolean) {
    let captureStream:MediaStream;
  
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({audio,video});
    } catch(err) {
      throw err;
    }
  
    return captureStream;
  }


  let medias:HTMLVideoElement[] = [];
  
  async function addMedia() {
    getMedia(false, true).then(stream => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      medias.push(video);
    });
  }


  (async()=>{
    const video1 = document.getElementById('videoElement1');
    console.log(video1)
    const video2 = document.getElementById('videoElement2');
    console.log(video2)
    const stream = await getMedia({audio:false,video:true});
    console.log(stream)
    video1.srcObject = stream;
  
    const stream2 = await startCapture({audio:true,video:true});
    console.log(stream2)
    video2.srcObject = stream2;
  
  })();
  </script>
  

  <button on:click={addMedia}>add Media</button>
  
  {{medias}}

  {#each medias as media}

  {/each}
  
  <video id="videoElement1" controls autoplay></video>
  <video id="videoElement2" controls autoplay></video>