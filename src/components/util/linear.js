export default () => {
  const inverted = false;
  const screen_size = (1280, 720);
  const mask_size = (600, 600);
  const center = (640, 360);
  const rotate = 0.1;
  return {
    title: 'linear',
    description: 'linear',
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
      precision mediump float;
      bool inverted = ${inverted};
      vec2 screen_size = vec2(${screen_size});
      vec2 mask_size = vec2(${mask_size});
      vec2 center = vec2(${center});
      float rotate = ${rotate};
      uniform sampler2D u_image_a;
      varying vec2 v_texCoord;

      vec4 getToColor(vec2 uv) {
        return texture2D(u_image_a, uv);
      }

      float ar = screen_size.x / screen_size.y ;
      float cosa = cos(-rotate);
      float sina = sin(-rotate);
      mat2 iRotM = mat2(
        cosa, -sina,
        sina, cosa
      );

      float feather(float t1, float t2, float x)
      {
        return smoothstep(t1 + 1., t2, x);
      }

      float feather(vec2 t1, vec2 t2, vec2 x)
      {
        return feather(t1.x, t2.x, x.x) * feather(t1.y, t2.y, x.y);
      }

      ////=============
      /// begin mask
      ////==============

      float mask(vec2 pos)
      {
        return 1. - feather(center.y, center.y, pos.y);
      }

      ////=============
      /// end mask
      ////==============

      vec4 filter(vec2 uv)
      {
        vec2 pos = gl_FragCoord.xy;
        float m = mask(iRotM * (pos - center) + center);
        vec4 color = getToColor(uv);
        if(inverted){
          return vec4(color.rgb * (1.-m), color.a);
        }else{
          return vec4(color.rgb * m, color.a);
        }
      }

      vec4 transition(vec2 uv)
      {
        return filter(uv);
      }
      void main() {
        gl_FragColor = filter(v_texCoord);
    }`,
    properties: {
      inverted: { type: 'uniform', value: false },
      screen_size: { type: 'uniform', value: (1280, 720) },
      mask_size: { type: 'uniform', value: (100, 100) },
      center: { type: 'uniform', value: (640, 360) },
      rotate: { type: 'uniform', value: 0 },
    },
    inputs: ['u_image_a'],
  };
};