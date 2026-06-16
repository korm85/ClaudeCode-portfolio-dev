'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'

// ─── Shared scroll state — read by CameraRig every frame ──────────────────────
const scrollState = { progress: 0 }

// ─── Career phases ────────────────────────────────────────────────────────────
interface Phase {
  num: string; title: string; role: string; period: string; company: string
  copy: string; accent: string; range: [number, number]
  metrics?: string[]; clients?: string[]
}
const PHASES: Phase[] = [
  {
    num: '01', title: 'Foundation',
    role: 'Mechanical Engineer', period: '2008 – 2012', company: 'Ben-Gurion University',
    copy: 'Mechanical engineer by training. Built to understand systems under stress — before software had to pass the same tests.',
    accent: '#4488ff', range: [0, 0.17],
  },
  {
    num: '02', title: 'The Craftsman',
    role: 'QA Engineer', period: '2012 – 2017', company: 'Cimatron · 3D Systems',
    copy: 'Five years finding every failure mode before software could ship. QA thinking became the permanent foundation of every product decision that followed.',
    accent: '#aa66ff', range: [0.17, 0.35],
  },
  {
    num: '03', title: 'The Leader',
    role: 'QA Team Lead', period: '2017 – 2022', company: '3D Systems',
    copy: 'Led the quality discipline that made production releases trustworthy at scale. Systematic, edge-case-first thinking — extended to a team and a process.',
    accent: '#22cc55', range: [0.35, 0.56],
  },
  {
    num: '04', title: 'The Builder',
    role: 'Product Manager, Simulation', period: '2022 – 2025', company: 'Oqton',
    copy: 'Shipped three physics-based simulation modules over three years. 80% fewer dimensional errors. Under 150 microns accuracy. First-time-right manufacturing — realized.',
    accent: '#ff7722', range: [0.56, 0.77],
    metrics: ['80% fewer errors', '<150μm accuracy', '99%+ dimensional precision'],
  },
  {
    num: '05', title: 'The Visionary',
    role: 'Senior PM, AI Platform', period: '2025 – Present', company: 'Oqton',
    copy: 'AMVero: AI anomaly detection for high-stakes manufacturing. Five enterprise contracts in five months. 98% faster engineering review. 18% scrap reduction.',
    accent: '#00ffaa', range: [0.77, 1.0],
    metrics: ['5 contracts / 5 months', '98% faster review', '18% scrap reduction', '136 hrs/printer/year'],
    clients: ['Baker Hughes', 'Thales', 'Elos Medtech', '3D Systems', 'Beehive'],
  },
]

// ─── Camera keyframes [progress, cameraY, radius, lookAtY] ───────────────────
const KF = [
  [0.00,  2.0, 11.0, 0.5],
  [0.17,  4.5,  9.0, 3.5],
  [0.35,  8.0,  8.5, 7.0],
  [0.56, 11.5,  8.0, 10.5],
  [0.77, 16.0,  7.0, 14.5],
  [0.90, 20.0, 12.0,  7.5],
  [1.00, 20.0, 12.0,  7.5],
]
function smooth(t: number) { return t * t * (3 - 2 * t) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function sampleKF(p: number) {
  for (let i = 0; i < KF.length - 1; i++) {
    if (p >= KF[i][0] && p <= KF[i + 1][0]) {
      const s = smooth((p - KF[i][0]) / (KF[i + 1][0] - KF[i][0]))
      return { y: lerp(KF[i][1], KF[i+1][1], s), r: lerp(KF[i][2], KF[i+1][2], s), look: lerp(KF[i][3], KF[i+1][3], s) }
    }
  }
  return { y: KF[0][1], r: KF[0][2], look: KF[0][3] }
}

// ─── CameraRig ────────────────────────────────────────────────────────────────
function CameraRig() {
  const angle = useRef(0)
  useFrame((state) => {
    const kf = sampleKF(scrollState.progress)
    angle.current += 0.0035
    const tx = Math.cos(angle.current) * kf.r
    const tz = Math.sin(angle.current) * kf.r
    state.camera.position.x += (tx - state.camera.position.x) * 0.05
    state.camera.position.z += (tz - state.camera.position.z) * 0.05
    state.camera.position.y += (kf.y - state.camera.position.y) * 0.05
    state.camera.lookAt(0, kf.look, 0)
  })
  return null
}

// ─── Build Platform ───────────────────────────────────────────────────────────
function BuildPlatform() {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[9, 9, 0.22, 64]} />
        <meshStandardMaterial color="#18181f" metalness={0.96} roughness={0.12} />
      </mesh>
      <gridHelper args={[18, 18, 0x0a1a2e, 0x0a1a2e]} position={[0, 0.12, 0]} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
        <torusGeometry args={[9.0, 0.04, 8, 100]} />
        <meshBasicMaterial color="#0066ff" />
      </mesh>
    </group>
  )
}

// ─── Build axis glow ──────────────────────────────────────────────────────────
function BuildAxis() {
  return (
    <mesh position={[0, 8.5, 0]}>
      <cylinderGeometry args={[0.018, 0.018, 19, 8]} />
      <meshBasicMaterial color="#3355ff" transparent opacity={0.3} />
    </mesh>
  )
}

// ─── Phase 0: Foundation — rotating blueprints ────────────────────────────────
function Phase0() {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.006 })
  return (
    <group ref={ref} position={[0, 0.5, 0]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, (i * Math.PI) / 6]}>
          <planeGeometry args={[2.8 - i * 0.28, 2.0 - i * 0.18]} />
          <meshBasicMaterial
            color="#1133cc" transparent opacity={0.06 + i * 0.03}
            side={THREE.DoubleSide} wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 3.2, 8]} />
        <meshBasicMaterial color="#4488ff" />
      </mesh>
    </group>
  )
}

// ─── Phase 1: Craftsman — metal powder + QA scan beam ────────────────────────
function Phase1() {
  const geom = useMemo(() => {
    const count = 3000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = Math.random() * 5
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8
      pos[i * 3 + 2] = Math.sin(theta) * r
      const defect = Math.random() < 0.07
      col[i * 3] = defect ? 1.0 : 0.70; col[i * 3 + 1] = defect ? 0.05 : 0.70; col[i * 3 + 2] = defect ? 0.05 : 0.88
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [])

  const powderRef = useRef<THREE.Points>(null)
  const scanRef = useRef<THREE.Mesh>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    t.current += dt
    if (powderRef.current) powderRef.current.rotation.y += 0.003
    if (scanRef.current) scanRef.current.position.z = ((t.current * 0.55 % 1) - 0.5) * 10
  })
  return (
    <group position={[0, 3.5, 0]}>
      <points ref={powderRef} geometry={geom}>
        <pointsMaterial size={0.06} vertexColors sizeAttenuation />
      </points>
      <mesh ref={scanRef}>
        <boxGeometry args={[10, 0.025, 0.06]} />
        <meshBasicMaterial color="#ff2222" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// ─── Phase 2: Leader — node network ──────────────────────────────────────────
function Phase2() {
  const { nodePos, edgeGeom } = useMemo(() => {
    const nodePos: THREE.Vector3[] = []
    for (let i = 0; i < 22; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.6 + Math.random() * 4.5
      nodePos.push(new THREE.Vector3(Math.cos(theta) * r, (Math.random() - 0.5) * 2.8, Math.sin(theta) * r))
    }
    const edgePts: number[] = []
    for (let i = 0; i < nodePos.length; i++) {
      for (let j = i + 1; j < nodePos.length; j++) {
        if (nodePos[i].distanceTo(nodePos[j]) < 3.5) {
          const a = nodePos[i], b = nodePos[j]
          edgePts.push(a.x, a.y, a.z, b.x, b.y, b.z)
        }
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePts), 3))
    return { nodePos, edgeGeom: g }
  }, [])

  const ref = useRef<THREE.Group>(null)
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0035 })
  return (
    <group ref={ref} position={[0, 7, 0]}>
      {nodePos.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.11, 10, 10]} />
          <meshStandardMaterial color="#22cc55" emissive="#22cc55" emissiveIntensity={0.7} />
        </mesh>
      ))}
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial color="#22cc55" transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

// ─── Phase 3: Builder — thermal simulation mesh ───────────────────────────────
function Phase3() {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(4.0, 2.8, 18, 12)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position as THREE.BufferAttribute
    const col = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const heat = Math.max(0, 1 - (Math.abs(x) / 2 + Math.abs(z) / 1.4) / 1.8)
      col[i * 3] = 0.1 + heat * 0.9; col[i * 3 + 1] = heat * 0.25; col[i * 3 + 2] = 0.15 + (1 - heat) * 0.6
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [])

  const meshRef = useRef<THREE.Mesh>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    t.current += dt
    if (!meshRef.current) return
    const v = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < v.count; i++) {
      const x = v.getX(i), z = v.getZ(i)
      const heat = Math.max(0, 1 - (Math.abs(x) / 2 + Math.abs(z) / 1.4) / 1.8)
      v.setY(i, Math.sin(t.current * 1.8 + x * 2.5 + z) * heat * 0.08)
    }
    v.needsUpdate = true
  })

  const metricPts: [number, number, number][] = [[-3, 1.4, 0], [3, 1.0, 0.6], [0, 2.2, -2], [-1.8, 1.8, 2]]
  return (
    <group position={[0, 10.5, 0]}>
      <mesh ref={meshRef} geometry={geom}>
        <meshStandardMaterial vertexColors metalness={0.65} roughness={0.3} />
      </mesh>
      {metricPts.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.2, 14, 14]} />
          <meshStandardMaterial color="#ff7700" emissive="#ff7700" emissiveIntensity={3.0} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Phase 4: Visionary — final part + 5 enterprise clients ──────────────────
function Phase4() {
  const clientRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null, null])
  const ringRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null])
  const angles = useRef(Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2))
  const t = useRef(0)

  useFrame((_, dt) => {
    t.current += dt
    angles.current = angles.current.map((a, i) => {
      const na = a + 0.009
      const c = clientRefs.current[i]
      if (c) { c.position.x = Math.cos(na) * 3.8; c.position.z = Math.sin(na) * 3.8; c.position.y = 0.4 + Math.sin(na * 2) * 0.3 }
      return na
    })
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return
      const frac = (t.current * 0.38 + i * 0.25) % 1
      const r = frac * 5.8 + 0.3
      ring.scale.set(r, r, r);
      (ring.material as THREE.MeshBasicMaterial).opacity = 0.85 * (1 - frac)
    })
  })

  return (
    <group position={[0, 14.5, 0]}>
      <mesh>
        <boxGeometry args={[2.4, 1.7, 1.7]} />
        <meshStandardMaterial color="#bbbbc8" metalness={1.0} roughness={0.03} emissive="#003322" emissiveIntensity={0.5} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} ref={el => { clientRefs.current[i] = el }}
            position={[Math.cos(a) * 3.8, 0.4, Math.sin(a) * 3.8]}>
            <sphereGeometry args={[0.26, 14, 14]} />
            <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={3.2} />
          </mesh>
        )
      })}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} ref={el => { ringRefs.current[i] = el }} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.38, 64]} />
          <meshBasicMaterial color="#00ffaa" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Ambient float particles ─────────────────────────────────────────────────
function AmbientParticles() {
  const geom = useMemo(() => {
    const count = 700
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = Math.random() * 22 - 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0005 })
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial size={0.04} color="#2a3855" sizeAttenuation />
    </points>
  )
}

// ─── Lights ───────────────────────────────────────────────────────────────────
function Lights() {
  const cursorRef = useRef<THREE.PointLight>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    t.current += dt
    if (cursorRef.current) {
      cursorRef.current.position.y = (t.current * 0.65) % 19
      cursorRef.current.position.x = Math.sin(t.current * 0.5) * 2.5
    }
  })
  return (
    <>
      <ambientLight intensity={0.45} color="#080812" />
      <directionalLight position={[-5, 12, -5]} intensity={0.4} color="#334466" />
      <pointLight position={[0, 1.5, 0]} intensity={2.5} color="#4488ff" distance={15} />
      <pointLight position={[2, 11, 1]} intensity={3.5} color="#ff6800" distance={12} />
      <pointLight position={[-2, 15, 2]} intensity={5.5} color="#00ffaa" distance={15} />
      <pointLight ref={cursorRef} intensity={2.2} color="#ffffff" distance={6} />
    </>
  )
}

// ─── 3D Scene ─────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <Lights />
      <BuildPlatform />
      <BuildAxis />
      <Phase0 />
      <Phase1 />
      <Phase2 />
      <Phase3 />
      <Phase4 />
      <AmbientParticles />
      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.12} radius={0.55} mipmapBlur />
      </EffectComposer>
    </>
  )
}

// ─── Overlay (fixed text panel) ───────────────────────────────────────────────
function Overlay() {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const prevIdx = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      setProgress(p)
      let idx = 0
      for (let i = PHASES.length - 1; i >= 0; i--) { if (p >= PHASES[i].range[0]) { idx = i; break } }
      if (idx !== prevIdx.current) {
        setVisible(false)
        const timer = setTimeout(() => { setPhaseIdx(idx); setVisible(true); prevIdx.current = idx }, 220)
        return () => clearTimeout(timer)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phase = PHASES[phaseIdx]
  const panelStyle: React.CSSProperties = {
    position: 'fixed', left: '40px', top: '50%', transform: 'translateY(-50%)',
    maxWidth: '320px', zIndex: 20, pointerEvents: 'none',
    opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease',
  }

  return (
    <>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '22px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 30, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: '#3a3530', letterSpacing: '0.15em' }}>MK</span>
        <Link href="/" style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: '#6b6560', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', pointerEvents: 'all', border: '1px solid #2a2520', padding: '8px 18px', transition: 'color 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f0ebe0'; (e.target as HTMLElement).style.borderColor = '#4a4540' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6b6560'; (e.target as HTMLElement).style.borderColor = '#2a2520' }}>
          Back to site
        </Link>
      </div>

      {/* Phase panel */}
      <div style={panelStyle}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: phase.accent, marginBottom: '14px' }}>
          {phase.num} — {phase.role}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.9rem, 3vw, 2.8rem)', fontWeight: 600, lineHeight: 1.05, color: '#f0ebe0', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          {phase.title}
        </h2>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: '#555050', letterSpacing: '0.1em', marginBottom: '18px' }}>
          {phase.period} · {phase.company}
        </div>
        <p style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', fontSize: '13.5px', lineHeight: 1.7, color: '#8a8580', margin: '0 0 20px', maxWidth: '290px' }}>
          {phase.copy}
        </p>
        {phase.metrics && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {phase.metrics.map(m => (
              <span key={m} style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', letterSpacing: '0.08em', color: phase.accent, padding: '5px 10px', border: `1px solid ${phase.accent}35`, background: `${phase.accent}0d` }}>
                {m}
              </span>
            ))}
          </div>
        )}
        {phase.clients && (
          <div style={{ marginTop: '18px' }}>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', color: '#4a4540', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Enterprise clients
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {phase.clients.map(c => (
                <span key={c} style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: `${phase.accent}99`, letterSpacing: '0.06em' }}>{c}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phase progress indicator */}
      <div style={{ position: 'fixed', right: '36px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', pointerEvents: 'none' }}>
        {PHASES.map((ph, i) => (
          <div key={i} style={{ width: '2px', height: i === phaseIdx ? '30px' : '14px', backgroundColor: i === phaseIdx ? ph.accent : '#252525', transition: 'all 0.4s ease', borderRadius: '1px' }} />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#333', opacity: progress < 0.04 ? 1 : 0, transition: 'opacity 0.6s', pointerEvents: 'none' }}>
        Scroll to begin
      </div>

      {/* Title card at 0 */}
      <div style={{ position: 'fixed', right: '40px', bottom: '80px', zIndex: 20, textAlign: 'right', pointerEvents: 'none', opacity: progress > 0.85 ? 1 : 0, transition: 'opacity 0.6s' }}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: '#00ffaa', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>Layer by layer</div>
        <div style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.1rem', color: '#f0ebe055', letterSpacing: '-0.01em' }}>14 years. 5 phases. One story.</div>
      </div>
    </>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function JourneyCanvas() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollState.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#060709', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#252520', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.25em' }}>INITIALIZING BUILD...</span>
    </div>
  )

  return (
    <>
      {/* Scroll spacer — makes body tall enough to scroll */}
      <div style={{ height: '700vh' }} aria-hidden="true" />

      {/* Fixed 3D canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [11, 2, 0], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.4
          }}
        >
          <color attach="background" args={['#060709']} />
          <fog attach="fog" args={['#060709', 28, 65]} />
          <Scene />
        </Canvas>
      </div>

      {/* Text overlay */}
      <Overlay />
    </>
  )
}
