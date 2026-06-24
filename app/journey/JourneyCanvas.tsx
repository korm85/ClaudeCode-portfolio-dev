'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'

// ─── Shared scroll state ───────────────────────────────────────────────────────
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
    copy: 'Mechanical engineer by training. Built to understand systems under stress before software had to pass the same tests.',
    accent: '#6b9fd4', range: [0, 0.17],
  },
  {
    num: '02', title: 'The Craftsman',
    role: 'QA Engineer', period: '2012 – 2017', company: 'Cimatron · 3D Systems',
    copy: 'Five years finding every failure mode before software could ship. QA thinking became the permanent foundation of every product decision.',
    accent: '#9975c0', range: [0.17, 0.35],
  },
  {
    num: '03', title: 'The Leader',
    role: 'QA Team Lead', period: '2017 – 2022', company: '3D Systems',
    copy: 'Led the quality discipline that made production releases trustworthy at scale. Systematic, edge-case-first thinking — applied to a team.',
    accent: '#5a9e70', range: [0.35, 0.56],
  },
  {
    num: '04', title: 'The Builder',
    role: 'Product Manager, Simulation', period: '2022 – 2025', company: 'Oqton',
    copy: 'Shipped three physics-based simulation modules. 80% fewer dimensional errors. Under 150 microns accuracy. First-time-right manufacturing.',
    accent: '#c87a30', range: [0.56, 0.77],
    metrics: ['80% fewer errors', '<150μm accuracy', '99%+ precision'],
  },
  {
    num: '05', title: 'The Visionary',
    role: 'Senior PM, AI Platform', period: '2025 – Present', company: 'Oqton',
    copy: 'AMVero: AI anomaly detection for high-stakes manufacturing. Five enterprise contracts in five months. 98% faster engineering review.',
    accent: '#3db88a', range: [0.77, 1.0],
    metrics: ['5 contracts / 5 months', '98% faster review', '18% scrap reduction'],
    clients: ['Baker Hughes', 'Thales', 'Elos Medtech', '3D Systems', 'Beehive'],
  },
]

// ─── Camera keyframes [progress, cameraY, orbitRadius, lookAtY] ───────────────
const KF = [
  [0.00,  2.0, 10.5, 0.5],
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

// ─── Texture loader hook ───────────────────────────────────────────────────────
function useAsyncTexture(url: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    let cancelled = false
    new THREE.TextureLoader().loadAsync(url).then(t => {
      if (cancelled) return
      t.colorSpace = THREE.SRGBColorSpace
      t.needsUpdate = true
      setTex(t)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [url])
  return tex
}

// ─── CameraRig ────────────────────────────────────────────────────────────────
function CameraRig() {
  const angle = useRef(0)
  useFrame((state) => {
    const kf = sampleKF(scrollState.progress)
    angle.current += 0.003
    state.camera.position.x += (Math.cos(angle.current) * kf.r - state.camera.position.x) * 0.045
    state.camera.position.z += (Math.sin(angle.current) * kf.r - state.camera.position.z) * 0.045
    state.camera.position.y += (kf.y - state.camera.position.y) * 0.045
    state.camera.lookAt(0, kf.look, 0)
  })
  return null
}

// ─── Floating image card with billboard option ────────────────────────────────
interface CardProps {
  url: string
  position: [number, number, number]
  w: number; h: number
  accent: string
  billboard?: boolean
  tiltY?: number
}
function ImageCard({ url, position, w, h, accent, billboard = false, tiltY = 0 }: CardProps) {
  const texture = useAsyncTexture(url)
  const ref = useRef<THREE.Group>(null)
  const baseY = position[1]
  const phase = useRef(Math.random() * Math.PI * 2)

  useFrame((state, dt) => {
    phase.current += dt * 0.35
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(phase.current) * 0.06
    if (billboard) {
      const dx = state.camera.position.x - ref.current.position.x
      const dz = state.camera.position.z - ref.current.position.z
      ref.current.rotation.y = Math.atan2(dx, dz)
    }
  })

  if (!texture) return null

  return (
    <group ref={ref} position={position} rotation={[0, tiltY, 0]}>
      {/* soft glow border */}
      <mesh position={[0, 0, -0.025]}>
        <planeGeometry args={[w + 0.2, h + 0.2]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} />
      </mesh>
      {/* image */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={texture} metalness={0.0} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Build Platform ───────────────────────────────────────────────────────────
function BuildPlatform() {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[9, 9, 0.22, 64]} />
        <meshStandardMaterial color="#111118" metalness={0.95} roughness={0.18} />
      </mesh>
      <gridHelper args={[18, 18, 0x0c1225, 0x0c1225]} position={[0, 0.12, 0]} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
        <torusGeometry args={[9.0, 0.035, 8, 100]} />
        <meshBasicMaterial color="#1d3a88" />
      </mesh>
    </group>
  )
}

// ─── Build axis ───────────────────────────────────────────────────────────────
function BuildAxis() {
  return (
    <mesh position={[0, 8.5, 0]}>
      <cylinderGeometry args={[0.014, 0.014, 19, 8]} />
      <meshBasicMaterial color="#1e2e88" transparent opacity={0.22} />
    </mesh>
  )
}

// ─── Phase 0: Foundation — profile photo, always faces camera ────────────────
function Phase0() {
  return (
    <group position={[0, 0.5, 0]}>
      <ImageCard
        url="/profile.jpeg"
        position={[0, 0, 0]}
        w={2.2} h={2.2}
        accent="#6b9fd4"
        billboard
      />
      {/* ring accent below */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <ringGeometry args={[1.3, 1.36, 64]} />
        <meshBasicMaterial color="#1d3a88" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

// ─── Phase 1: Craftsman — soft powder particles + scan beam ──────────────────
function Phase1() {
  const geom = useMemo(() => {
    const count = 1800
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.4 + Math.random() * 4.2
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8
      pos[i * 3 + 2] = Math.sin(theta) * r
      const isDefect = Math.random() < 0.07
      col[i * 3]     = isDefect ? 0.75 : 0.52
      col[i * 3 + 1] = isDefect ? 0.07 : 0.52
      col[i * 3 + 2] = isDefect ? 0.07 : 0.72
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
    if (powderRef.current) powderRef.current.rotation.y += 0.0018
    if (scanRef.current) scanRef.current.position.z = ((t.current * 0.38 % 1) - 0.5) * 9
  })

  return (
    <group position={[0, 3.5, 0]}>
      <points ref={powderRef} geometry={geom}>
        <pointsMaterial size={0.05} vertexColors sizeAttenuation />
      </points>
      <mesh ref={scanRef}>
        <boxGeometry args={[9, 0.016, 0.04]} />
        <meshBasicMaterial color="#bb2222" transparent opacity={0.38} />
      </mesh>
    </group>
  )
}

// ─── Phase 2: Leader — hub + node network ────────────────────────────────────
function Phase2() {
  const { nodePos, edgeGeom } = useMemo(() => {
    const np: THREE.Vector3[] = []
    // Organized ring placement
    for (let i = 0; i < 14; i++) {
      const theta = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
      const r = 1.6 + Math.random() * 2.2
      np.push(new THREE.Vector3(Math.cos(theta) * r, (Math.random() - 0.5) * 2, Math.sin(theta) * r))
    }
    np.push(new THREE.Vector3(0, 0, 0)) // center hub

    const edgePts: number[] = []
    const hub = np[np.length - 1]
    np.slice(0, -1).forEach(n => {
      edgePts.push(hub.x, hub.y, hub.z, n.x, n.y, n.z)
    })
    for (let i = 0; i < np.length - 1; i++) {
      for (let j = i + 1; j < np.length - 1; j++) {
        if (np[i].distanceTo(np[j]) < 2.8)
          edgePts.push(np[i].x, np[i].y, np[i].z, np[j].x, np[j].y, np[j].z)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePts), 3))
    return { nodePos: np, edgeGeom: g }
  }, [])

  const ref = useRef<THREE.Group>(null)
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0025 })

  return (
    <group ref={ref} position={[0, 7, 0]}>
      {nodePos.map((pos, i) => {
        const isHub = i === nodePos.length - 1
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[isHub ? 0.2 : 0.085, 10, 10]} />
            <meshStandardMaterial color="#5a9e70" emissive="#5a9e70" emissiveIntensity={isHub ? 0.9 : 0.45} />
          </mesh>
        )
      })}
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial color="#5a9e70" transparent opacity={0.16} />
      </lineSegments>
    </group>
  )
}

// ─── Phase 3: Builder — real simulation images ────────────────────────────────
function Phase3() {
  // simulation-heatmap.png: 1934×1152 → 16:9.6 → use 3.2 × 1.9
  // simulation-product.png: check dimensions — use 2.8 × 2.1
  return (
    <group position={[0, 10.5, 0]}>
      <ImageCard
        url="/simulation-heatmap.png"
        position={[-1.9, 0.2, 0.6]}
        w={3.2} h={1.9}
        accent="#c87a30"
        tiltY={0.22}
      />
      <ImageCard
        url="/simulation-product.png"
        position={[2.0, -0.3, -0.4]}
        w={2.8} h={2.1}
        accent="#c87a30"
        tiltY={-0.18}
      />
    </group>
  )
}

// ─── Phase 4: Visionary — AMVero images + orbiting clients ───────────────────
function Phase4() {
  const clientRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null, null])
  const ringRefs = useRef<(THREE.Mesh | null)[]>([null, null, null])
  const angles = useRef(Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2))
  const t = useRef(0)

  useFrame((_, dt) => {
    t.current += dt
    angles.current = angles.current.map((a, i) => {
      const na = a + 0.007
      const c = clientRefs.current[i]
      if (c) {
        c.position.x = Math.cos(na) * 3.6
        c.position.z = Math.sin(na) * 3.6
        c.position.y = 0.4 + Math.sin(na * 2) * 0.22
      }
      return na
    })
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return
      const frac = (t.current * 0.28 + i * 0.33) % 1
      const r = frac * 4.8 + 0.3
      ring.scale.set(r, r, r)
      ;(ring.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - frac)
    })
  })

  return (
    <group position={[0, 14.5, 0]}>
      {/* amvero-product.png: 2500×1934 → ~1.29:1 → use 3.0 × 2.3 */}
      <ImageCard
        url="/amvero-product.png"
        position={[-1.8, 0.2, 0.6]}
        w={3.0} h={2.3}
        accent="#3db88a"
        tiltY={0.2}
      />
      {/* amvero-comparison.png: 1819×1448 → ~1.26:1 → use 2.6 × 2.1 */}
      <ImageCard
        url="/amvero-comparison.png"
        position={[2.0, -0.2, -0.4]}
        w={2.6} h={2.1}
        accent="#3db88a"
        tiltY={-0.2}
      />
      {/* 5 enterprise client nodes */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} ref={el => { clientRefs.current[i] = el }}
            position={[Math.cos(a) * 3.6, 0.4, Math.sin(a) * 3.6]}>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial color="#3db88a" emissive="#3db88a" emissiveIntensity={1.8} />
          </mesh>
        )
      })}
      {/* AI scan rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={i} ref={el => { ringRefs.current[i] = el }} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.35, 64]} />
          <meshBasicMaterial color="#3db88a" transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Ambient depth particles ──────────────────────────────────────────────────
function AmbientParticles() {
  const geom = useMemo(() => {
    const count = 450
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
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0003 })
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial size={0.03} color="#141830" sizeAttenuation />
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
      cursorRef.current.position.y = (t.current * 0.5) % 19
      cursorRef.current.position.x = Math.sin(t.current * 0.4) * 1.8
    }
  })
  return (
    <>
      <ambientLight intensity={0.7} color="#0c0c1a" />
      <directionalLight position={[-5, 12, -5]} intensity={0.45} color="#22305a" />
      <pointLight position={[0, 1.5, 0]} intensity={1.6} color="#2255bb" distance={14} />
      <pointLight position={[2, 11, 1]} intensity={2.0} color="#aa5500" distance={12} />
      <pointLight position={[-2, 15, 2]} intensity={3.0} color="#1da87a" distance={15} />
      <pointLight ref={cursorRef} intensity={1.3} color="#ffffff" distance={5} />
    </>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
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
        <Bloom intensity={0.75} luminanceThreshold={0.28} radius={0.45} mipmapBlur />
      </EffectComposer>
    </>
  )
}

// ─── Mobile-first overlay (bottom panel) ──────────────────────────────────────
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
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (p >= PHASES[i].range[0]) { idx = i; break }
      }
      if (idx !== prevIdx.current) {
        setVisible(false)
        const timer = setTimeout(() => {
          setPhaseIdx(idx)
          setVisible(true)
          prevIdx.current = idx
        }, 180)
        return () => clearTimeout(timer)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phase = PHASES[phaseIdx]

  return (
    <>
      {/* Top nav */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        padding: '18px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 30, pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: '#222028', letterSpacing: '0.1em' }}>MK</span>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: '#4a4555',
            letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
            pointerEvents: 'all', border: '1px solid #1e1c28',
            padding: '9px 16px', display: 'block',
          }}
        >
          ← Back
        </Link>
      </div>

      {/* Bottom panel */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
        background: 'linear-gradient(to top, rgba(8,8,14,0.97) 55%, rgba(8,8,14,0.7) 80%, transparent)',
        padding: '36px 22px 40px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>

          {/* Phase progress dots */}
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center', marginBottom: '18px' }}>
            {PHASES.map((ph, i) => (
              <div key={i} style={{
                width: i === phaseIdx ? '22px' : '6px',
                height: '3px',
                backgroundColor: i === phaseIdx ? ph.accent : '#22202a',
                transition: 'all 0.35s ease',
                borderRadius: '1.5px',
              }} />
            ))}
          </div>

          {/* Eyebrow */}
          <div style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '10px',
            letterSpacing: '0.26em', textTransform: 'uppercase',
            color: phase.accent, marginBottom: '7px',
          }}>
            {phase.num} — {phase.role}
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.75rem, 5.5vw, 2.3rem)',
            fontWeight: 600, lineHeight: 1.0,
            color: '#eae4dc', margin: '0 0 6px',
            letterSpacing: '-0.025em',
          }}>
            {phase.title}
          </h2>

          {/* Period + company */}
          <div style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '10px',
            color: '#403d4a', letterSpacing: '0.1em', marginBottom: '12px',
          }}>
            {phase.period} · {phase.company}
          </div>

          {/* Copy */}
          <p style={{
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
            fontSize: '14px', lineHeight: 1.62,
            color: '#6e6878', margin: '0 0 14px',
          }}>
            {phase.copy}
          </p>

          {/* Metrics */}
          {phase.metrics && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {phase.metrics.map(m => (
                <span key={m} style={{
                  fontFamily: 'var(--font-mono, monospace)', fontSize: '9px',
                  letterSpacing: '0.07em', color: phase.accent,
                  padding: '4px 10px',
                  border: `1px solid ${phase.accent}28`,
                  background: `${phase.accent}0a`,
                }}>
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Client names (phase 4 only) */}
          {phase.clients && (
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {phase.clients.map(c => (
                <span key={c} style={{
                  fontFamily: 'var(--font-mono, monospace)', fontSize: '9px',
                  color: `${phase.accent}70`, letterSpacing: '0.06em',
                }}>
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll / swipe hint */}
      <div style={{
        position: 'fixed', bottom: '270px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, fontFamily: 'var(--font-mono, monospace)', fontSize: '10px',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#282530',
        opacity: progress < 0.03 ? 1 : 0,
        transition: 'opacity 1s',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        Swipe up to begin
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
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#08080e' }} />
  )

  return (
    <>
      {/* Tall spacer — enables touch & mouse scroll */}
      <div style={{ height: '700vh' }} aria-hidden="true" />

      {/* Fixed 3D canvas — pointer-events none so scrolling always works */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas
          camera={{ position: [10.5, 2, 0], fov: 52 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.15
          }}
        >
          <color attach="background" args={['#08080e']} />
          <fog attach="fog" args={['#08080e', 30, 72]} />
          <Scene />
        </Canvas>
      </div>

      {/* UI overlay */}
      <Overlay />
    </>
  )
}
