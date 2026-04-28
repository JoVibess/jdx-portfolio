"use client";

import { useFrame, useThree } from "@react-three/fiber";
import GUI from "lil-gui";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  Texture,
  Vector2,
  Vector3,
} from "three";

const LIQUID_GRADIENT_SETTINGS = {
  depth: -3.4,
  textureSize: 64,
  touchMaxAge: 64,
  touchRadius: 0.25,
  touchForceMultiplier: 20000,
  touchMaxForce: 2,
  touchSpeed: 1,
  distortionStrength: 0.8,
  rippleStrength: 0.04,
  waveStrength: 0.03,
  speed: 1.5,
  intensity: 1.8,
  grainIntensity: 0.08,
  gradientSize: 0.45,
  gradientCount: 12,
  color1Weight: 0.5,
  color2Weight: 1.8,
  backgroundColor: "#0a0e27",
  color1: "#f15a22",
  color2: "#0a0e27",
  color3: "#f15a22",
  color4: "#0a0e27",
  color5: "#f15a22",
  color6: "#0a0e27",
};

function colorToVector(hex) {
  const color = new Color(hex);
  return new Vector3(color.r, color.g, color.b);
}

class TouchTexture {
  constructor(settings) {
    this.settings = settings;
    this.size = settings.textureSize;
    this.width = this.size;
    this.height = this.size;
    this.maxAge = settings.touchMaxAge;
    this.radius = settings.touchRadius * this.size;
    this.speed = settings.touchSpeed / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.clear();
    this.texture = new Texture(this.canvas);
  }

  update() {
    this.clear();

    for (let index = this.trail.length - 1; index >= 0; index -= 1) {
      const point = this.trail[index];
      const force = point.force * this.speed * (1 - point.age / this.maxAge);
      point.x += point.vx * force;
      point.y += point.vy * force;
      point.age += 1;

      if (point.age > this.maxAge) {
        this.trail.splice(index, 1);
      } else {
        this.drawPoint(point);
      }
    }

    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  addTouch(point) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;

    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;

      if (dx === 0 && dy === 0) {
        return;
      }

      const distanceSquared = dx * dx + dy * dy;
      const distance = Math.sqrt(distanceSquared);
      vx = dx / distance;
      vy = dy / distance;
      force = Math.min(
        distanceSquared * this.settings.touchForceMultiplier,
        this.settings.touchMaxForce,
      );
    }

    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point) {
    const position = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;

    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }

    intensity *= point.force;

    const radius = this.radius;
    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
    this.ctx.arc(position.x - offset, position.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  dispose() {
    this.texture.dispose();
  }
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform vec3 uColor6;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform sampler2D uTouchTexture;
  uniform float uGrainIntensity;
  uniform vec3 uDarkNavy;
  uniform float uGradientSize;
  uniform float uGradientCount;
  uniform float uColor1Weight;
  uniform float uColor2Weight;
  uniform float uDistortionStrength;
  uniform float uRippleStrength;
  uniform float uWaveStrength;

  varying vec2 vUv;

  float grain(vec2 uv, float time) {
    vec2 grainUv = uv * uResolution * 0.5;
    float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
    return grainValue * 2.0 - 1.0;
  }

  vec3 getGradientColor(vec2 uv, float time) {
    float gradientRadius = uGradientSize;

    vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
    vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
    vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
    vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
    vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
    vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
    vec2 center7 = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
    vec2 center8 = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
    vec2 center9 = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
    vec2 center10 = vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
    vec2 center11 = vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
    vec2 center12 = vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);

    float influence1 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center1));
    float influence2 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center2));
    float influence3 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center3));
    float influence4 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center4));
    float influence5 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center5));
    float influence6 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center6));
    float influence7 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center7));
    float influence8 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center8));
    float influence9 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center9));
    float influence10 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center10));
    float influence11 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center11));
    float influence12 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center12));

    vec2 rotatedUv1 = uv - 0.5;
    float angle1 = time * uSpeed * 0.15;
    rotatedUv1 = vec2(rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1), rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1));
    rotatedUv1 += 0.5;

    vec2 rotatedUv2 = uv - 0.5;
    float angle2 = -time * uSpeed * 0.12;
    rotatedUv2 = vec2(rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2), rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2));
    rotatedUv2 += 0.5;

    float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv1 - 0.5));
    float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv2 - 0.5));

    vec3 color = vec3(0.0);
    color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
    color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
    color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
    color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
    color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
    color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;

    if (uGradientCount > 6.0) {
      color += uColor1 * influence7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
      color += uColor2 * influence8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
      color += uColor3 * influence9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
      color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
    }

    if (uGradientCount > 10.0) {
      color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
      color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
    }

    color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
    color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;
    color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;

    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, 1.35);
    color = pow(color, vec3(0.92));

    float brightness = length(color);
    color = mix(uDarkNavy, color, max(brightness * 1.2, 0.15));

    float maxBrightness = 1.0;
    brightness = length(color);
    if (brightness > maxBrightness) {
      color = color * (maxBrightness / brightness);
    }

    return color;
  }

  void main() {
    vec2 uv = vUv;
    vec4 touchTex = texture2D(uTouchTexture, uv);
    float vx = -(touchTex.r * 2.0 - 1.0);
    float vy = -(touchTex.g * 2.0 - 1.0);
    float intensity = touchTex.b;

    uv.x += vx * uDistortionStrength * intensity;
    uv.y += vy * uDistortionStrength * intensity;

    vec2 center = vec2(0.5);
    float dist = length(uv - center);
    float ripple = sin(dist * 20.0 - uTime * 3.0) * uRippleStrength * intensity;
    float wave = sin(dist * 15.0 - uTime * 2.0) * uWaveStrength * intensity;
    uv += vec2(ripple + wave);

    vec3 color = getGradientColor(uv, uTime);
    color += grain(uv, uTime) * uGrainIntensity;
    color.r += sin(uTime * 0.5) * 0.02;
    color.g += cos(uTime * 0.7) * 0.02;
    color.b += sin(uTime * 0.6) * 0.02;

    float brightness = length(color);
    color = mix(uDarkNavy, color, max(brightness * 1.2, 0.15));
    color = clamp(color, vec3(0.0), vec3(1.0));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LiquidGradientBackground() {
  const mesh = useRef(null);
  const material = useRef(null);
  const { camera, gl, size, viewport } = useThree();
  const [settings, setSettings] = useState(LIQUID_GRADIENT_SETTINGS);
  const {
    textureSize,
    touchForceMultiplier,
    touchMaxAge,
    touchMaxForce,
    touchRadius,
    touchSpeed,
  } = settings;
  const touchTexture = useMemo(
    () => new TouchTexture({
      textureSize,
      touchForceMultiplier,
      touchMaxAge,
      touchMaxForce,
      touchRadius,
      touchSpeed,
    }),
    [
      textureSize,
      touchForceMultiplier,
      touchMaxAge,
      touchMaxForce,
      touchRadius,
      touchSpeed,
    ],
  );
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) },
      uColor1: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color1) },
      uColor2: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color2) },
      uColor3: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color3) },
      uColor4: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color4) },
      uColor5: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color5) },
      uColor6: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.color6) },
      uSpeed: { value: LIQUID_GRADIENT_SETTINGS.speed },
      uIntensity: { value: LIQUID_GRADIENT_SETTINGS.intensity },
      uTouchTexture: { value: touchTexture.texture },
      uGrainIntensity: { value: LIQUID_GRADIENT_SETTINGS.grainIntensity },
      uDarkNavy: { value: colorToVector(LIQUID_GRADIENT_SETTINGS.backgroundColor) },
      uGradientSize: { value: LIQUID_GRADIENT_SETTINGS.gradientSize },
      uGradientCount: { value: LIQUID_GRADIENT_SETTINGS.gradientCount },
      uColor1Weight: { value: LIQUID_GRADIENT_SETTINGS.color1Weight },
      uColor2Weight: { value: LIQUID_GRADIENT_SETTINGS.color2Weight },
      uDistortionStrength: { value: LIQUID_GRADIENT_SETTINGS.distortionStrength },
      uRippleStrength: { value: LIQUID_GRADIENT_SETTINGS.rippleStrength },
      uWaveStrength: { value: LIQUID_GRADIENT_SETTINGS.waveStrength },
    };
  }, [size.height, size.width, touchTexture.texture]);

  useEffect(() => {
    const params = { ...LIQUID_GRADIENT_SETTINGS };
    const gui = new GUI({ title: "Liquid Gradient", width: 320 });
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "16px";
    gui.domElement.style.left = "16px";
    gui.domElement.style.zIndex = "100";

    const sync = () => setSettings({ ...params });
    const reset = () => {
      Object.assign(params, LIQUID_GRADIENT_SETTINGS);
      gui.controllersRecursive().forEach((controller) => controller.updateDisplay());
      sync();
    };

    const colors = gui.addFolder("Colors");
    colors.addColor(params, "backgroundColor").name("Base").onChange(sync);
    colors.addColor(params, "color1").name("Color 1").onChange(sync);
    colors.addColor(params, "color2").name("Color 2").onChange(sync);
    colors.addColor(params, "color3").name("Color 3").onChange(sync);
    colors.addColor(params, "color4").name("Color 4").onChange(sync);
    colors.addColor(params, "color5").name("Color 5").onChange(sync);
    colors.addColor(params, "color6").name("Color 6").onChange(sync);
    colors.open();

    const gradient = gui.addFolder("Gradient");
    gradient.add(params, "depth", -8, -0.5, 0.05).name("Depth").onChange(sync);
    gradient.add(params, "speed", 0, 4, 0.01).name("Speed").onChange(sync);
    gradient.add(params, "intensity", 0, 3, 0.01).name("Intensity").onChange(sync);
    gradient.add(params, "grainIntensity", 0, 0.3, 0.005).name("Grain").onChange(sync);
    gradient.add(params, "gradientSize", 0.1, 2, 0.01).name("Size").onChange(sync);
    gradient.add(params, "gradientCount", 1, 12, 1).name("Count").onChange(sync);
    gradient.add(params, "color1Weight", 0, 3, 0.01).name("Warm weight").onChange(sync);
    gradient.add(params, "color2Weight", 0, 3, 0.01).name("Cool weight").onChange(sync);

    const touch = gui.addFolder("Touch");
    touch.add(params, "touchMaxAge", 1, 180, 1).name("Max age").onChange(sync);
    touch.add(params, "touchRadius", 0.01, 0.7, 0.01).name("Radius").onChange(sync);
    touch.add(params, "touchForceMultiplier", 0, 60000, 100).name("Force").onChange(sync);
    touch.add(params, "touchMaxForce", 0, 6, 0.05).name("Max force").onChange(sync);
    touch.add(params, "touchSpeed", 0.1, 4, 0.01).name("Trail speed").onChange(sync);
    touch.add(params, "distortionStrength", 0, 2, 0.01).name("Distortion").onChange(sync);
    touch.add(params, "rippleStrength", 0, 0.2, 0.005).name("Ripple").onChange(sync);
    touch.add(params, "waveStrength", 0, 0.2, 0.005).name("Wave").onChange(sync);

    gui.add({ reset }, "reset").name("Reset values");

    return () => gui.destroy();
  }, []);

  useEffect(() => {
    if (!material.current) {
      return;
    }

    material.current.uniforms.uColor1.value.copy(colorToVector(settings.color1));
    material.current.uniforms.uColor2.value.copy(colorToVector(settings.color2));
    material.current.uniforms.uColor3.value.copy(colorToVector(settings.color3));
    material.current.uniforms.uColor4.value.copy(colorToVector(settings.color4));
    material.current.uniforms.uColor5.value.copy(colorToVector(settings.color5));
    material.current.uniforms.uColor6.value.copy(colorToVector(settings.color6));
    material.current.uniforms.uDarkNavy.value.copy(colorToVector(settings.backgroundColor));
    material.current.uniforms.uTouchTexture.value = touchTexture.texture;
    material.current.uniforms.uSpeed.value = settings.speed;
    material.current.uniforms.uIntensity.value = settings.intensity;
    material.current.uniforms.uGrainIntensity.value = settings.grainIntensity;
    material.current.uniforms.uGradientSize.value = settings.gradientSize;
    material.current.uniforms.uGradientCount.value = settings.gradientCount;
    material.current.uniforms.uColor1Weight.value = settings.color1Weight;
    material.current.uniforms.uColor2Weight.value = settings.color2Weight;
    material.current.uniforms.uDistortionStrength.value = settings.distortionStrength;
    material.current.uniforms.uRippleStrength.value = settings.rippleStrength;
    material.current.uniforms.uWaveStrength.value = settings.waveStrength;
  }, [settings, touchTexture]);

  useEffect(() => {
    return () => {
      touchTexture.dispose();
    };
  }, [touchTexture]);

  useEffect(() => {
    if (material.current) {
      material.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size.height, size.width]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      touchTexture.addTouch({
        x: (event.clientX - bounds.left) / bounds.width,
        y: 1 - (event.clientY - bounds.top) / bounds.height,
      });
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl.domElement, touchTexture]);

  useFrame((_, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value += Math.min(delta, 0.1);
    }
    touchTexture.update();

    const view = viewport.getCurrentViewport(camera, [0, 0, settings.depth]);
    if (mesh.current) {
      mesh.current.scale.set(view.width, view.height, 1);
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, settings.depth]}
      renderOrder={-10}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
