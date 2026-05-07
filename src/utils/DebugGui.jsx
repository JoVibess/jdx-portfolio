"use client";

import GUI from "lil-gui";
import { useEffect } from "react";

import { DEFAULT_SCENE_SETTINGS } from "@/features/face-scene/constants";

export default function DebugGui({ onChange }) {
  useEffect(() => {
    const params = { ...DEFAULT_SCENE_SETTINGS };
    const gui = new GUI({ title: "Model Debug", width: 320 });
    gui.domElement.style.position = "fixed";
    gui.domElement.style.top = "16px";
    gui.domElement.style.right = "16px";
    gui.domElement.style.zIndex = "100";

    const sync = () => onChange({ ...params });
    const reset = () => {
      Object.assign(params, DEFAULT_SCENE_SETTINGS);
      gui
        .controllersRecursive()
        .forEach((controller) => controller.updateDisplay());
      sync();
    };

    gui.add(params, "showModel").name("Model ON/OFF").onChange(sync);
    gui.add(params, "showFps").name("Show FPS").onChange(sync);

    const modelPosition = gui.addFolder("Model position XY");
    modelPosition
      .add(params, "modelPositionX", -4, 4, 0.01)
      .name("Position X")
      .onChange(sync);
    modelPosition
      .add(params, "modelPositionY", -4, 4, 0.01)
      .name("Position Y")
      .onChange(sync);
    modelPosition
      .add(params, "modelPositionZ", -4, 4, 0.01)
      .name("Position Z")
      .onChange(sync);
    modelPosition.open();

    const modelOrientation = gui.addFolder("Model orientation");
    modelOrientation
      .add(params, "modelRotationX", -180, 180, 0.1)
      .name("Orientation X")
      .onChange(sync);
    modelOrientation
      .add(params, "modelRotationY", -180, 180, 0.1)
      .name("Orientation Y")
      .onChange(sync);
    modelOrientation
      .add(params, "modelRotationZ", -180, 180, 0.1)
      .name("Orientation Z")
      .onChange(sync);

    const lights = gui.addFolder("Lights");

    const ambient = lights.addFolder("Ambient");
    ambient.addColor(params, "ambientLightColor").name("Color").onChange(sync);
    ambient
      .add(params, "ambientLightIntensity", 0, 8, 0.05)
      .name("Intensity")
      .onChange(sync);

    const key = lights.addFolder("Key directional");
    key.addColor(params, "keyLightColor").name("Color").onChange(sync);
    key
      .add(params, "keyLightIntensity", 0, 16, 0.05)
      .name("Intensity")
      .onChange(sync);
    key.add(params, "keyLightX", -8, 8, 0.05).name("X").onChange(sync);
    key.add(params, "keyLightY", -8, 8, 0.05).name("Y").onChange(sync);
    key.add(params, "keyLightZ", -8, 8, 0.05).name("Z").onChange(sync);

    const vertical = lights.addFolder("Vertical directional");
    vertical.addColor(params, "verticalLightColor").name("Color").onChange(sync);
    vertical
      .add(params, "verticalLightIntensity", 0, 12, 0.05)
      .name("Intensity")
      .onChange(sync);
    vertical.add(params, "verticalLightX", -8, 8, 0.05).name("X").onChange(sync);
    vertical.add(params, "verticalLightY", -8, 8, 0.05).name("Y").onChange(sync);
    vertical.add(params, "verticalLightZ", -8, 8, 0.05).name("Z").onChange(sync);

    const fill = lights.addFolder("Fill directional");
    fill.addColor(params, "fillLightColor").name("Color").onChange(sync);
    fill
      .add(params, "fillLightIntensity", 0, 12, 0.05)
      .name("Intensity")
      .onChange(sync);
    fill.add(params, "fillLightX", -8, 8, 0.05).name("X").onChange(sync);
    fill.add(params, "fillLightY", -8, 8, 0.05).name("Y").onChange(sync);
    fill.add(params, "fillLightZ", -8, 8, 0.05).name("Z").onChange(sync);

    const point = lights.addFolder("Point");
    point.addColor(params, "pointLightColor").name("Color").onChange(sync);
    point
      .add(params, "pointLightIntensity", 0, 16, 0.05)
      .name("Intensity")
      .onChange(sync);
    point.add(params, "pointLightX", -8, 8, 0.05).name("X").onChange(sync);
    point.add(params, "pointLightY", -8, 8, 0.05).name("Y").onChange(sync);
    point.add(params, "pointLightZ", -8, 8, 0.05).name("Z").onChange(sync);

    const spot = lights.addFolder("Spot");
    spot.addColor(params, "spotLightColor").name("Color").onChange(sync);
    spot
      .add(params, "spotLightIntensity", 0, 24, 0.05)
      .name("Intensity")
      .onChange(sync);
    spot.add(params, "spotLightX", -8, 8, 0.05).name("X").onChange(sync);
    spot.add(params, "spotLightY", -8, 8, 0.05).name("Y").onChange(sync);
    spot.add(params, "spotLightZ", -8, 8, 0.05).name("Z").onChange(sync);
    spot
      .add(params, "spotLightAngle", 0.05, 1.2, 0.01)
      .name("Angle")
      .onChange(sync);
    spot
      .add(params, "spotLightPenumbra", 0, 1, 0.01)
      .name("Penumbra")
      .onChange(sync);

    lights.open();
    gui.add({ reset }, "reset").name("Reset values");

    return () => gui.destroy();
  }, [onChange]);

  return null;
}
