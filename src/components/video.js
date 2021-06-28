
export default {
  data() {
    return {
      zhen: 0,
      min: null,
      videoCtx: null,
      timeStr: "00:00",
    }
  },
  methods: {
    // time 秒数
    toTime(time) {
      if(time > 60) {
        if(time % 60 === 0) {
          let fz = time / 60
          if(fz < 10) {
            fz = "0" + fz + ":00"
          }
          return fz;
        } else {
          let mz = time % 60
          if(mz < 10) {
            mz = "0" + mz
          }
          let fz = Math.floor(time/60) + ":" + mz;
          return fz
        }
      } else {
        if(time > 9){
          return time.toString();
        } else {
          return "0" + time;
        }
      }
    },
    replaceTime(time) {
      let timeStr = ""
      let a = parseInt(time * 100);
      if(time === 0) {
        timeStr =  "00:00"
      }
      if(a <= 40) {
        timeStr = "00:0" + Math.floor(a/4)
      }
      else if(a < 100) {
        timeStr = "00:" + Math.floor(a/4)
      }
      else if(a < 1000) {
        let b = a.toString()
        if(b.substring(1,3)/4 < 10) {
          timeStr =  "0" + b.substring(0,1) + ":0" + Math.floor(b.substring(1,3)/4)
        } else  {
          timeStr =  "0" + b.substring(0,1) + ":" + Math.floor(b.substring(1,3)/4)
        }
      } else if (a < 10000) {
        let b = a.toString();
        let fen = b.substring(0,2);
        if(b.substring(2,4)/4 < 10) {
          timeStr = this.toTime(fen) + ":0" + Math.floor(b.substring(2,4)/4);
        } else {
          timeStr = this.toTime(fen) + ":" + Math.floor(b.substring(2,4)/4);
        }
      }
      else if(a < 100000 ){
        let b = a.toString();
        let fen = b.substring(0,3)
        if(b.substring(3,5)/4 < 10) {
          timeStr = this.toTime(fen) + ":0" + Math.floor(b.substring(3,5)/4);
        } else {
          timeStr = this.toTime(fen) + ":" + Math.floor(b.substring(3,5)/4);
        }
      } else {
        let b = a.toString();
        let fen = b.substring(0,4)
        if(b.substring(4,6)/4 < 10) {
          timeStr = this.toTime(fen) + ":0" + Math.floor(b.substring(4,6)/4);
        } else {
          timeStr = this.toTime(fen) + ":" + Math.floor(b.substring(4,6)/4);
        }
      }
      this.timeStr = timeStr
      this.zhen = Math.floor(a / 4)
    },
    time1Click() {
      if(this.time1 !== '') {
        let time1 = Math.floor(this.time1  * 1000)
        let time =  time1 % 40  === 0 ? Number(this.time1) + 0.00001 : Number(this.time1);
        this.videoCtx.currentTime = time
        this.replaceTime(this.videoCtx.currentTime)
      }
    },
    time2Click() {
      if(this.time2 !== '') {
        let time1 = Math.floor(this.time2  * 1000)
        let time =  time1 % 40  === 0 ? Number(this.time2) + 0.00001 : Number(this.time2)
        this.videoCtx.currentTime = time
        this.replaceTime(this.videoCtx.currentTime)
      }
    },
    visualisation() {
      clearInterval(this.min)
      this.videoCtx.pause();
      let current = parseFloat(this.videoCtx.currentTime.toFixed(2));
      this.time = current * 1000
      this.replaceTime(current)
    },
    chang_page() {
      if (event.keyCode == 37 || event.keyCode == 33) {
        console.log('左键')
        console.log(this.videoCtx.currentTime)
        let current = this.videoCtx.currentTime;
        if(current >= 0.04) {
          this.videoCtx.currentTime = parseFloat((current - 0.04).toFixed(2))  + 0.00001
          this.time = this.videoCtx.currentTime * 1000
          this.replaceTime(this.videoCtx.currentTime)
        }
      }
      if (event.keyCode == 39 || event.keyCode == 34) {
        console.log('右键')
        let current = Math.floor(this.videoCtx.currentTime * 1000);
        let c_time = (Math.floor(current / 40) * 40 + 40)  / 1000  + 0.00001;

        this.videoCtx.currentTime = c_time;
        this.time = this.videoCtx.currentTime * 1000;
        this.replaceTime(this.videoCtx.currentTime)
        // videoCtx.reset()
      }
    },
    shader(url) {
      var img = new Image();
      img.src = url;
      img.magFilter = 0x2601;
      img.minFilter = 0x2601;
      img.generateMipmaps = false;
      img.wrapS = 0x812F;
      img.wrapT = 0x812F;
    
      return {
        title: 'd',
        description: 'd',
        vertexShader: `
          attribute vec2 a_position;
          attribute vec2 a_texCoord;
          varying vec2 v_texCoord;
          void main() {
            gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);
            v_texCoord = a_texCoord;
          }
        `,
        fragmentShader: `
          precision lowp float;
          varying vec2 v_texCoord;
          uniform sampler2D u_image;
          uniform float opctity;
          uniform sampler2D displacementMap;
          #define MAXCOLOR 15.0
          #define COLORS 16.0
          #define WIDTH 256.0
          #define HEIGHT 16.0

          vec4 filter(vec4 px) {
            float cell = px.b * MAXCOLOR;
            float cell_l = floor(cell);
            float cell_h = ceil(cell);
            float half_px_x = 0.5 / WIDTH;
            float half_px_y = 0.5 / HEIGHT;
            float r_offset = half_px_x + px.r / COLORS * (MAXCOLOR / COLORS);
            float g_offset = half_px_y + px.g * (MAXCOLOR / COLORS);
            vec2 lut_pos_l = vec2(cell_l / COLORS + r_offset, g_offset);
            vec2 lut_pos_h = vec2(cell_h / COLORS + r_offset, g_offset);

            vec4 graded_color_l = texture2D(displacementMap, vec2(lut_pos_l.x, 1.-lut_pos_l.y));
            vec4 graded_color_h = texture2D(displacementMap, vec2(lut_pos_h.x, 1.-lut_pos_h.y));

            return mix(graded_color_l, graded_color_h, fract(cell));
          }

          void main() {
            vec4 px = texture2D(u_image, v_texCoord.xy);
            vec4 graded_color = filter(px);
            gl_FragColor = mix(px,graded_color,opctity);
            gl_FragColor.a = px.a;
            // gl_FragColor = texture2D(displacementMap, v_texCoord.xy);
          }
        `,
        properties: {
            opctity: { type: "uniform", value: 1. },
            displacementMap: { type: "uniform", value: img}
        },
        inputs: ["u_image"]
      }
    }
  }
}
