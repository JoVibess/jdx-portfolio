"use client";

import ReactDOM from "react-dom";

import { DRACO_PATH, FACE_MODEL_URL } from "../constants";

export default function FaceScenePreload() {
  ReactDOM.preload(FACE_MODEL_URL, {
    as: "fetch",
    crossOrigin: "anonymous",
    type: "model/gltf-binary",
  });
  ReactDOM.preload(`${DRACO_PATH}draco_decoder.wasm`, {
    as: "fetch",
    crossOrigin: "anonymous",
    type: "application/wasm",
  });
  ReactDOM.preload(`${DRACO_PATH}draco_wasm_wrapper.js`, { as: "script" });
  ReactDOM.preload(`${DRACO_PATH}draco_decoder.js`, { as: "script" });

  return null;
}
