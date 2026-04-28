import { DoubleSide, MeshPhysicalMaterial } from "three";

import { DEFAULT_GLASS_SETTINGS } from "../constants";

export function createGlassMaterial() {
  return new MeshPhysicalMaterial({
    color: DEFAULT_GLASS_SETTINGS.color,
    transparent: false,
    opacity: DEFAULT_GLASS_SETTINGS.opacity,
    transmission: DEFAULT_GLASS_SETTINGS.transmission,
    thickness: DEFAULT_GLASS_SETTINGS.thickness,
    roughness: DEFAULT_GLASS_SETTINGS.roughness,
    metalness: 0,
    ior: DEFAULT_GLASS_SETTINGS.ior,
    attenuationColor: DEFAULT_GLASS_SETTINGS.attenuationColor,
    attenuationDistance: DEFAULT_GLASS_SETTINGS.attenuationDistance,
    envMapIntensity: DEFAULT_GLASS_SETTINGS.envMapIntensity,
    clearcoat: DEFAULT_GLASS_SETTINGS.clearcoat,
    clearcoatRoughness: DEFAULT_GLASS_SETTINGS.clearcoatRoughness,
    specularIntensity: DEFAULT_GLASS_SETTINGS.specularIntensity,
    specularColor: "#ffffff",
    side: DoubleSide,
    depthWrite: false,
  });
}

export function applyGlassSettings(material, settings) {
  material.color.set(settings.color);
  material.transparent = settings.opacity < 1;
  material.opacity = settings.opacity;
  material.transmission = settings.transmission;
  material.thickness = settings.thickness;
  material.roughness = settings.roughness;
  material.ior = settings.ior;
  material.attenuationColor.set(settings.attenuationColor);
  material.attenuationDistance = settings.attenuationDistance;
  material.envMapIntensity = settings.envMapIntensity;
  material.clearcoat = settings.clearcoat;
  material.clearcoatRoughness = settings.clearcoatRoughness;
  material.specularIntensity = settings.specularIntensity;
  material.depthWrite = false;
  material.needsUpdate = true;
}
