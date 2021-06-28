export default () => {
	return {
		title: 'up',
		description: 'up',
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

            void main () {
            	vec2 p = v_texCoord + m * sign(vec2(0, -1));
                vec2 f = fract(p);
                float s = step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0);
                vec4 color = mix(getToColor(f), getFromColor(f), s);
                gl_FragColor = vec4(color);
            }

		`,
		properties: {
            m: { type: 'uniform', value: 1.0 },
        },
        inputs: ['u_image_a', 'u_image_b']
	}
}