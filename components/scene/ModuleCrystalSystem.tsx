import * as THREE from "three";
import { ModuleCrystalConfig, createFacetedCrystalGeometry } from "./ModuleCrystalConfigs";
import { MODULE_ARTIFACTS, ArtifactMaterials } from "./ModuleArtifacts";
import { createCrystalGrowthMaterial } from "./CrystalGrowthShader";

export interface ModuleCrystalObjects {
  group: THREE.Group;
  crystal: THREE.Mesh;
  artifact: THREE.Group;
  conduit: THREE.Mesh;
  crystalMaterial: THREE.ShaderMaterial;
  conduitMaterial: THREE.ShaderMaterial;
}

export function createModuleCrystalObjects(
  config: ModuleCrystalConfig,
  artifactMaterials: ArtifactMaterials
): ModuleCrystalObjects {
  const group = new THREE.Group();

  const crystalGeometry = createFacetedCrystalGeometry(config);
  const crystalMaterial = createCrystalGrowthMaterial({
    attenuationColor: config.material.attenuationColor,
    dispersion: config.material.dispersion,
    transmission: config.material.transmission,
    roughness: config.material.roughness,
    metalness: config.material.metalness,
    ior: config.material.ior,
    thickness: config.material.thickness,
    clearcoat: config.material.clearcoat,
    clearcoatRoughness: config.material.clearcoatRoughness,
    reflectivity: config.material.reflectivity,
    attenuationDistance: config.material.attenuationDistance,
    rimColor: config.lighting.rimColor,
    rimIntensity: config.lighting.rimIntensity,
    causticsIntensity: config.lighting.causticsIntensity,
    asymmetry: config.geometry.asymmetry,
  });

  const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
  crystal.castShadow = true;
  crystal.receiveShadow = true;
  group.add(crystal);

  const artifactDef = MODULE_ARTIFACTS[config.artifact.type];
  const artifact = artifactDef.build(artifactMaterials);
  artifact.scale.setScalar(config.artifact.scale);
  artifact.position.copy(config.artifact.position);
  artifact.rotation.copy(config.artifact.rotation);
  group.add(artifact);

  const conduitMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying float vProgress;
      void main() {
        vProgress = position.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uFlowPhase;
      uniform float uFlowSpeed;
      uniform vec3 uColor;
      varying float vProgress;
      void main() {
        float flow = sin(vProgress * 20.0 - uFlowPhase * 10.0) * 0.5 + 0.5;
        float intensity = smoothstep(0.4, 0.6, flow) * uFlowSpeed;
        gl_FragColor = vec4(uColor, intensity * 0.5);
      }
    `,
    uniforms: {
      uFlowPhase: { value: 0 },
      uFlowSpeed: { value: 1.0 },
      uColor: { value: config.lighting.rimColor.clone() },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const conduitGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.4, 0),
      new THREE.Vector3(0, -0.45, -1.2),
      new THREE.Vector3(0, -0.4, -2.4),
    ]),
    32, 0.016, 8, false
  );

  const conduit = new THREE.Mesh(conduitGeometry, conduitMaterial);
  group.add(conduit);

  return { group, crystal, artifact, conduit, crystalMaterial, conduitMaterial };
}

export function updateModuleCrystal(
  objects: ModuleCrystalObjects,
  config: ModuleCrystalConfig,
  growthProgress: number,
  transitionProgress: number,
  isActive: boolean,
  time: number,
  prefersReduced: boolean
) {
  const { crystalMaterial, conduitMaterial, artifact, conduit, group } = objects;

  crystalMaterial.uniforms.uTime.value = time;
  crystalMaterial.uniforms.uGrowthProgress.value = growthProgress;

  if (artifact && MODULE_ARTIFACTS[config.artifact.type].animation) {
    MODULE_ARTIFACTS[config.artifact.type].animation!(artifact, time, transitionProgress);
  }

  const idleY = prefersReduced ? 0 : time * 0.022;
  const breath = prefersReduced ? 0 : Math.sin(time * 0.55) * 0.025;

  const entryEase = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
  group.position.x = 0;
  group.position.y = THREE.MathUtils.lerp(-0.2, 0.55, entryEase) + breath;
  group.position.z = THREE.MathUtils.lerp(-1.8, 0, entryEase);
  group.rotation.y = THREE.MathUtils.lerp(0.44, 0, entryEase) + idleY;
  group.scale.setScalar(THREE.MathUtils.lerp(0.88, 1.0, entryEase));

  if (conduit) {
    const flowPhase = (time * 0.5 + transitionProgress * 10) % 1.0;
    conduitMaterial.uniforms.uFlowPhase.value = flowPhase;
    conduitMaterial.uniforms.uFlowSpeed.value = isActive ? 1.5 : 0.3;
    conduitMaterial.uniforms.uColor.value.copy(config.lighting.rimColor);
  }
}