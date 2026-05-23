import { Box3, Vector3 } from "three";

import { MODEL_HEIGHT } from "../constants";

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function hashName(name) {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function normalizeModel(root) {
  root.position.set(0, 0, 0);
  root.rotation.set(0, 0, 0);
  root.scale.set(1, 1, 1);
  root.updateMatrixWorld(true);

  const box = new Box3().setFromObject(root);
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const scale = MODEL_HEIGHT / Math.max(size.x, size.y, size.z);
  const targetCenter = new Vector3(0, -0.08, 0);

  root.scale.setScalar(scale);
  root.updateMatrixWorld(true);

  const scaledBox = new Box3().setFromObject(root);
  const scaledCenter = scaledBox.getCenter(new Vector3());

  root.position.set(
    targetCenter.x - scaledCenter.x,
    targetCenter.y - scaledCenter.y,
    targetCenter.z - scaledCenter.z,
  );
  root.updateMatrixWorld(true);

  // Apply one final correction pass so the pivot remains centered even after remounts/navigation.
  const finalBox = new Box3().setFromObject(root);
  const finalCenter = finalBox.getCenter(new Vector3());

  root.position.add(targetCenter.sub(finalCenter));
  root.updateMatrixWorld(true);

  return { center, size, scale };
}
