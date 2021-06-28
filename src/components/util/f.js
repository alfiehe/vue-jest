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
            void main() {
                float pr = smoothstep(-0.5, 0.0, v_texCoord.x - m * (1.0 + 0.5));
                float s = step(pr, fract(10.0 * v_texCoord.x));
                vec4 color = mix(getFromColor(v_texCoord), getToColor(v_texCoord), s);
                gl_FragColor = vec4(color);
            }
        `,
        properties: {
            m: { type: 'uniform', value: 1.0 },
        },
        inputs: ['u_image_a', 'u_image_b']
    }
}