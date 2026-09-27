"use client";

/**
 * Pencahayaan sinematik dan fisik (DESIGN §9.6): ambient lembut, satu arah
 * utama, rim biru terkendali, dan satu titik biru di inti. Tanpa neon,
 * bloom, atau berkas cahaya.
 */
export default function Lighting() {
  return (
    <group>
      <ambientLight intensity={0.72} color="#cbc8c2" />
      <directionalLight position={[7, 11, 6]} intensity={2.1} color="#eceae5" />
      <directionalLight position={[-8, 4.5, -7]} intensity={0.85} color="#9db0ff" />
      <directionalLight position={[0, -3, 4]} intensity={0.18} color="#7f8ba8" />
      <pointLight position={[6, 2.4, 5]} intensity={7} distance={24} color="#9a968e" />
    </group>
  );
}
