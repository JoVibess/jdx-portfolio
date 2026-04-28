"use client";

import GUI from "lil-gui";
import { useEffect } from "react";

import { DEFAULT_GLASS_SETTINGS } from "../constants";

export default function DebugGui({ onChange }) {
  useEffect(() => {
    const params = { ...DEFAULT_GLASS_SETTINGS };
    const gui = new GUI({ title: "Glass Debug", width: 320 });
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "16px";
    gui.domElement.style.right = "16px";
    gui.domElement.style.zIndex = "100";

    const sync = () => onChange({ ...params });
    const reset = () => {
      Object.assign(params, DEFAULT_GLASS_SETTINGS);
      gui.controllersRecursive().forEach((controller) => controller.updateDisplay());
      sync();
    };

    gui.add(params, "showModel").name("Model ON/OFF").onChange(sync);

    const glass = gui.addFolder("Glass");
    glass.addColor(params, "color").name("Color").onChange(sync);
    glass.add(params, "transmission", 0, 1, 0.01).name("Transmission").onChange(sync);
    glass.add(params, "opacity", 0.05, 1, 0.01).name("Opacity").onChange(sync);
    glass.add(params, "thickness", 0, 3, 0.01).name("Thickness").onChange(sync);
    glass.add(params, "roughness", 0, 0.7, 0.005).name("Roughness").onChange(sync);
    glass.add(params, "ior", 1, 2.5, 0.01).name("IOR").onChange(sync);
    glass.addColor(params, "attenuationColor").name("Attenuation").onChange(sync);
    glass.add(params, "attenuationDistance", 0.05, 80, 0.05).name("Attenuation dist").onChange(sync);
    glass.add(params, "envMapIntensity", 0, 8, 0.05).name("Env intensity").onChange(sync);
    glass.add(params, "clearcoat", 0, 1, 0.01).name("Clearcoat").onChange(sync);
    glass.add(params, "clearcoatRoughness", 0, 0.5, 0.005).name("Clearcoat rough").onChange(sync);
    glass.add(params, "specularIntensity", 0, 2, 0.01).name("Specular").onChange(sync);
    glass.open();

    const lights = gui.addFolder("Lights");
    lights.add(params, "ambientLight", 0, 6, 0.05).name("Ambient").onChange(sync);
    lights.add(params, "keyLight", 0, 12, 0.05).name("Key").onChange(sync);
    lights.add(params, "fillLight", 0, 8, 0.05).name("Fill").onChange(sync);
    lights.add(params, "pointLight", 0, 10, 0.05).name("Point").onChange(sync);
    lights.add(params, "spotLight", 0, 18, 0.05).name("Spot").onChange(sync);

    gui.add({ reset }, "reset").name("Reset values");

    return () => gui.destroy();
  }, [onChange]);

  return null;
}
