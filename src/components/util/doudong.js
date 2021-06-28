export default () => {
	return {
		title: 'doudong',
		description: 'doudong',
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
            // void main() {
            //     float pr = smoothstep(-0.5, 0.0, v_texCoord.x - m * (1.0 + 0.5));
            //     float s = step(pr, fract(10.0 * v_texCoord.x));
            //     vec4 color = mix(getFromColor(v_texCoord), getToColor(v_texCoord), s);
            //     gl_FragColor = vec4(color);
            // }
            void main() {
            	vec2 block = floor(v_texCoord / 16.);
            	vec2 uv_noise = block / 64.;
            	uv_noise += floor(vec2(1200.0, 3500.0) * m) / 64.;
            	vec2 dist = m > 0.0 ? (fract(uv_noise) - 0.5) * 0.3 *(1.0 - m) : vec2(0.0);
            	vec2 red = v_texCoord + dist * .2;
                vec2 green = v_texCoord + dist * .3;
                vec2 blue = v_texCoord + dist * .5;
                gl_FragColor = vec4(
                		mix(getFromColor(red), getToColor(red), m).r,
                		mix(getFromColor(green), getToColor(green), m).g,
                		mix(getFromColor(blue), getToColor(blue), m).b,
                		m < 0.5 ? getFromColor(v_texCoord).a : getToColor(v_texCoord).a);
            }
		`,
		properties: {
            m: { type: 'uniform', value: 1.0 },
        },
        inputs: ['u_image_a', 'u_image_b']
	}
}