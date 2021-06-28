export default () => {
  return {
      title: 'f',
      description: 'f',
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
          uniform sampler2D u_image_a;
          uniform sampler2D u_image_b;
          uniform float m;
          varying vec2 v_texCoord;

          vec4 getFromColor(vec2 uv) {
            return texture2D(u_image_a, uv);
          }
          vec4 getToColor(vec2 uv) {
            return texture2D(u_image_b, uv);
          }
          const float ar = 2.3703;
          const float c_size = .5;
          vec4 filter(vec2 uv)
            {
                float p = mix(c_size, 1., m);
                uv = (uv - 0.5) / p + 0.5;
                if(uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.)
                    discard;
                else
                    return getToColor(uv);
            }
          void main() {
              gl_FragColor = filter(v_texCoord);
          }
      `,
      properties: {
          m: { type: 'uniform', value: 1.0 },
      },
      inputs: ['u_image_a']
  }
}