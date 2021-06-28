<template>
	<div class="wrap">
    <div>
		  <canvas id="canvas" width="1280" height="720" style="width: 852px; height: 480px"></canvas>
      <canvas id="visualisation-canvas" width="880" height="20"></canvas>
	    <div class="time"><span>{{timeStr}}</span> / {{end}}</div>
    </div>
    <div>
      <button class="pure-button" id="play-button">播放</button>
      <button class="pure-button" id="pause-button">暂停</button>
      <button class="train" id="btn-train">one</button>
      Graph
      <canvas id="graph-canvas" width="480" height="200"></canvas>
    </div>
	</div>
</template>
<style>
.wrap {
  display: flex;
      text-align: left;
}
.play-btn{
  height: 100px;
}
.play-btn button{
  width: 68px;
  cursor: pointer;
  height: 38px;
}
</style>

<script>
  import video from '../components/video'
  import circle from '../components/util/circle'
  import linear from '../components/util/linear'
  import mirror from '../components/util/mirror'
  import rectang from '../components/util/rectang'
  export default {
    name: 'VideoMask',
    extends: video,
    data() {
      return {
        time: 0,
        total: 30000,
        end: "30:00",
        time1: '',
        time2: '',
        videoNode1: null,
        videoNode2: null,
        isA: true,
        transitionNodes: []
      }
    },
    methods: {
      start() {
        this.min = setInterval(() => {
          this.time = parseFloat(this.videoCtx.currentTime.toFixed(2)) * 1000;
          let showTime = this.time/1000;
          this.replaceTime(this.time/1000);
          //console.log(this.videoCtx.currentTime);
        
          this.toTrain(this.videoCtx.currentTime);
      
          if(this.time >= this.total) {
            clearInterval(this.min)
          }
        }, 40)
      },
      toTrain(time) {
          const arr = this.transitionNodes;
          const processingNodes = arr.filter(current => {
            let start = current._transitions.m[0].start;
            // let end = current._transitions.m[0].end;
            return parseInt(time + 0.1) == start 
          });
          const processingNodes1 = arr.filter(current => {
            // let start = current._transitions.m[0].start;
            let end = current._transitions.m[0].end;
            return time - 0.1 == end 
          });
          for(let i = 0; i < processingNodes.length;i++) {
            const processingNode = processingNodes[i];
            processingNode.arr[0].disconnect();
            // processingNode.arr[1].disconnect();
            processingNode.arr[0].connect(processingNode);
            //processingNode.arr[1].connect(processingNode);
          }
          for(let i = 0; i < processingNodes1.length;i++) {
            const processingNode = processingNodes[i];
            processingNode.arr[0].disconnect();
            //processingNode.arr[1].disconnect(processingNode);
            processingNode.arr[0].connect(this.videoCtx.destination);
            // processingNode.arr[1].connect(this.videoCtx.destination);
          }   
      },
    },
    mounted() {
      var canvas = document.getElementById("canvas");
      this.videoCtx = new VideoContext(canvas);

      var videoNode1 = this.videoCtx.video("http://xingtest.oss-cn-beijing.aliyuncs.com/2_1.mp4");
      videoNode1.start(0);
      videoNode1.stop(23);
      videoNode1.connect(this.videoCtx.destination)
  
      var transitionNode = this.videoCtx.transition(circle());
      transitionNode.transition(2,4,0.0,1.0, 'm');
      transitionNode.connect(this.videoCtx.destination);
      
			transitionNode.arr = [];
      transitionNode.arr.push(videoNode1)

      this.transitionNodes.push(transitionNode)    

      InitVisualisations(this.videoCtx, "graph-canvas", "visualisation-canvas");

      var playButton = document.getElementById("play-button");
      var pauseButton = document.getElementById("pause-button");
			var btnTrain = document.getElementById("btn-train");
      this.videoCtx.currentTime = 0.00001;
      this.videoCtx.playbackRate = 1;

      // 开始播放
      playButton.onclick = () => {
        this.start();
        this.videoCtx.play();
      };

      //暂停播放
      pauseButton.onclick = () => {
        this.videoCtx.pause();
        clearInterval(this.min)
      };
      
			btnTrain.onclick = () => {
				var transitionNode1 = this.videoCtx.transition(linear());

				videoNode2.disconnect(transitionNode)
				videoNode3.disconnect(this.videoCtx.destination)

				videoNode2.connect(transitionNode1);
				videoNode3.connect(transitionNode1);
				transitionNode1.connect(this.videoCtx.destination);
				transitionNode1.transition(18,20, 0.0, 1.0, 'm');
			}

      document.onkeydown = this.chang_page;
    }
  }
</script>

this.transitionNodes.inx = this.transitions.length - 1;
