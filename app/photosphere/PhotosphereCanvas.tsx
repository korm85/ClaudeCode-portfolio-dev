'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const DEG = Math.PI / 180
const SPHERE_R = 7
const FRAME_H = 1.4 // uniform height for all frames → seamless horizontal strip

// Module-level mutable state — no stale closures in useFrame
const view = {
  targetAz: Math.PI, az: Math.PI, velAz: 0,
  targetEl: 0, el: 0, velEl: 0,
  dragging: false, lastInteraction: 0,
}

const bridge = {
  raycaster: null as THREE.Raycaster | null,
  camera: null as THREE.Camera | null,
  meshes: [] as Array<THREE.Mesh | null>,
}

// ar = width/height pixel ratio for correct aspect without distortion
// az positions calculated so adjacent frames touch edge-to-edge at R=7
// Δaz ≈ (W_left/2 + W_right/2) / R  where W = FRAME_H * ar
const FRAMES = [
  {
    id: 'about',
    az: -32, el: 0,
    img: '/profile.jpeg',
    ar: 1,          // 1024×1024 ≈ square
    tag: 'Who I am',
    title: 'Michael Korenevsky',
    lead: '14 years building enterprise software for high-stakes industries.',
    body: 'Started as a software engineer, moved into PM to own the full product lifecycle — from customer discovery to engineering handoff to market launch. Now focused on AI-powered tools for manufacturing and construction.',
  },
  {
    id: 'simulation',
    az: -17, el: 0,
    img: '/simulation-heatmap.png',
    ar: 1934 / 1152, // 1.679
    tag: 'Physics simulation',
    title: 'Powder bed fusion, predicted',
    lead: 'Built the PM function at Oqton for physics-based AM simulation — zero to shipped.',
    body: 'Simulation predicts thermal gradients and distortion before printing, eliminating costly trial runs. Shipped across 3 enterprise customers. Led requirements, roadmap, and launch from scratch.',
  },
  {
    id: 'amvero',
    az: 0, el: 0,
    img: '/amvero-product.png',
    ar: 2500 / 1934, // 1.293
    tag: 'AI inspection',
    title: 'AMVero — automated defect detection',
    lead: '98% detection rate. 73% faster inspection. 4 enterprise customers.',
    body: 'Brought AI anomaly detection to production quality control. Model trained on real defect data; deployed in live manufacturing environments at scale.',
  },
  {
    id: 'ai',
    az: 15, el: 0,
    img: '/amvero-comparison.png',
    ar: 1819 / 1448, // 1.256
    tag: 'AI practice',
    title: 'How I work with AI',
    lead: 'Systematic approach to integrating AI into product workflows.',
    body: 'Use AI for spec generation, prototype iteration, and roadmap prioritization. Every case study on this site was built with AI-assisted PM process.',
  },
  {
    id: 'next',
    az: 34, el: 0,
    img: '/simulation-product.png',
    ar: 2500 / 1197, // 2.089 — wide panoramic
    tag: "What's next",
    title: 'Senior PM · AI · Enterprise',
    lead: 'Open to senior PM roles in AI-native or deep-tech companies.',
    body: 'I build products that work in the physical world — where mistakes are expensive and precision matters. korm85@gmail.com',
  },
]

type FrameConfig = typeof FRAMES[0]

function spherePos(azDeg: number, elDeg: number): THREE.Vector3 {
  const az = azDeg * DEG
  const el = elDeg * DEG
  return new THREE.Vector3(
    SPHERE_R * Math.cos(el) * Math.sin(az),
    SPHERE_R * Math.sin(el),
    SPHERE_R * Math.cos(el) * Math.cos(az),
  )
}

function useAsyncTexture(url: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    let dead = false
    new THREE.TextureLoader().loadAsync(url)
      .then(t => {
        if (dead) return
        t.colorSpace = THREE.SRGBColorSpace
        t.needsUpdate = true
        setTex(t)
      })
      .catch(() => {})
    return () => { dead = true }
  }, [url])
  return tex
}

function FrameMesh({
  f, idx, selRef,
}: { f: FrameConfig; idx: number; selRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const tex = useAsyncTexture(f.img)

  const [localPos] = useState(() => spherePos(f.az, f.el))
  const [quat] = useState(() => {
    const dummy = new THREE.Object3D()
    dummy.position.copy(localPos)
    dummy.lookAt(0, 0, 0)
    return dummy.quaternion.clone()
  })

  const w = FRAME_H * f.ar
  const h = FRAME_H

  useEffect(() => {
    bridge.meshes[idx] = meshRef.current
    return () => { bridge.meshes[idx] = null }
  }, [idx])

  useFrame((_, dt) => {
    const m = meshRef.current
    if (!m) return
    const sel = selRef.current
    const isSel = sel === idx
    const anySelected = sel >= 0
    const targetScale = isSel ? 1.12 : 1
    const targetOpacity = anySelected && !isSel ? 0.18 : 1
    const t = 1 - Math.pow(0.04, dt * 60)
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, targetScale, t))
    const mat = m.material as THREE.MeshBasicMaterial
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, t)
  })

  return (
    <mesh ref={meshRef} position={localPos} quaternion={quat}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={tex ?? undefined}
        color={tex ? '#ffffff' : '#111827'}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function GlowBorder({
  f, idx, selRef,
}: { f: FrameConfig; idx: number; selRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)
  const [localPos] = useState(() => spherePos(f.az, f.el))
  const [quat] = useState(() => {
    const dummy = new THREE.Object3D()
    dummy.position.copy(localPos)
    dummy.lookAt(0, 0, 0)
    return dummy.quaternion.clone()
  })
  const w = FRAME_H * f.ar + 0.1
  const h = FRAME_H + 0.1

  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const mat = m.material as THREE.MeshBasicMaterial
    const target = selRef.current === idx ? 1 : 0
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, target, 1 - Math.pow(0.04, dt * 60))
  })

  return (
    <mesh ref={ref} position={localPos} quaternion={quat} renderOrder={-1}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        color="#16a34a"
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Bridge() {
  const { raycaster, camera } = useThree()
  useEffect(() => {
    bridge.raycaster = raycaster
    bridge.camera = camera
  }, [raycaster, camera])
  return null
}

function Stars() {
  const [geo] = useState(() => {
    const g = new THREE.BufferGeometry()
    const n = 400
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const th = Math.random() * 2 * Math.PI
      const ph = Math.acos(2 * Math.random() - 1)
      const r = 20 + Math.random() * 8
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = r * Math.cos(ph)
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  })
  return (
    <points geometry={geo}>
      <pointsMaterial color="#6677aa" size={0.05} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

function Rig({ selRef }: { selRef: React.MutableRefObject<number> }) {
  const rig = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    const idle = !view.dragging && performance.now() - view.lastInteraction > 2500
    if (idle) view.targetAz += 0.12 * dt

    const stiffness = 0.08, damping = 0.72
    view.velAz = view.velAz * damping + (view.targetAz - view.az) * stiffness
    view.az += view.velAz
    view.velEl = view.velEl * damping + (view.targetEl - view.el) * stiffness
    view.el += view.velEl
    view.el = Math.max(-22 * DEG, Math.min(22 * DEG, view.el))
    view.targetEl = Math.max(-22 * DEG, Math.min(22 * DEG, view.targetEl))

    if (rig.current) {
      rig.current.rotation.y = view.az
      rig.current.rotation.x = view.el
    }
  })

  return (
    <group ref={rig}>
      <Stars />
      {FRAMES.map((f, i) => (
        <group key={f.id}>
          <GlowBorder f={f} idx={i} selRef={selRef} />
          <FrameMesh f={f} idx={i} selRef={selRef} />
        </group>
      ))}
    </group>
  )
}

function Scene({ selRef }: { selRef: React.MutableRefObject<number> }) {
  return (
    <>
      <Rig selRef={selRef} />
      <Bridge />
      <ambientLight intensity={1.2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function PhotosphereCanvas() {
  const [mounted, setMounted] = useState(false)
  const [sel, setSel] = useState(-1)
  const [hint, setHint] = useState(true)
  const selRef = useRef(-1)
  const drag = useRef({ on: false, x: 0, y: 0, moved: 0 })

  const setSyncedSel = useCallback((n: number) => {
    setSel(n)
    selRef.current = n
  }, [])

  useEffect(() => {
    view.targetAz = Math.PI
    view.az = Math.PI
    view.velAz = 0
    view.targetEl = 0
    view.el = 0
    view.velEl = 0
    view.dragging = false
    view.lastInteraction = performance.now()
    bridge.meshes = new Array(FRAMES.length).fill(null)
    setMounted(true)
  }, [])

  const onDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    view.dragging = true
    view.lastInteraction = performance.now()
    drag.current = { on: true, x: e.clientX, y: e.clientY, moved: 0 }
    setHint(false)
  }, [])

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.on) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    drag.current.moved += Math.hypot(dx, dy)
    drag.current.x = e.clientX
    drag.current.y = e.clientY
    view.targetAz -= dx * 0.007
    view.targetEl += dy * 0.004
    view.lastInteraction = performance.now()
  }, [])

  const onUp = useCallback((e: React.PointerEvent) => {
    view.dragging = false
    const { on, moved } = drag.current
    drag.current.on = false
    if (!on) return

    if (moved < 8 && bridge.raycaster && bridge.camera) {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      )
      bridge.raycaster.setFromCamera(ndc, bridge.camera)
      const targets = bridge.meshes.filter((m): m is THREE.Mesh => m !== null)
      const hits = bridge.raycaster.intersectObjects(targets, false)
      if (hits.length > 0) {
        const hitIdx = bridge.meshes.indexOf(hits[0].object as THREE.Mesh)
        if (hitIdx >= 0) {
          setSyncedSel(selRef.current === hitIdx ? -1 : hitIdx)
        }
      }
    }
  }, [setSyncedSel])

  if (!mounted) {
    return <div style={{ position: 'fixed', inset: 0, background: '#08080e' }} />
  }

  const selFrame = sel >= 0 ? FRAMES[sel] : null

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#08080e' }}>
      {/* Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 0, 0.01], fov: 80 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#08080e']} />
          <Scene selRef={selRef} />
        </Canvas>
      </div>

      {/* Pointer capture surface */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          touchAction: 'none',
          cursor: 'grab',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />

      {/* First-visit hint */}
      {hint && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(179, 171, 155, 0.4)',
            }}
          >
            drag to explore · tap to focus
          </span>
        </div>
      )}

      {/* Content panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          transform: selFrame ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: selFrame ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(8, 8, 14, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(22, 163, 74, 0.35)',
            padding: '20px 24px 40px',
            maxHeight: '44vh',
            overflowY: 'auto',
          }}
        >
          {selFrame && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono, monospace)',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#16a34a',
                      marginBottom: 5,
                    }}
                  >
                    {selFrame.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-fraunces, Georgia, serif)',
                      fontSize: 20,
                      fontWeight: 400,
                      color: '#f0ebe0',
                      lineHeight: 1.25,
                    }}
                  >
                    {selFrame.title}
                  </div>
                </div>
                <button
                  onClick={() => setSyncedSel(-1)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#75705f',
                    borderRadius: 3,
                    padding: '5px 10px',
                    fontSize: 14,
                    lineHeight: 1,
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    flexShrink: 0,
                    marginLeft: 16,
                    marginTop: 4,
                  }}
                >
                  ×
                </button>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-hanken, system-ui, sans-serif)',
                  fontSize: 15,
                  color: '#b3ab9b',
                  lineHeight: 1.65,
                  margin: '0 0 10px',
                }}
              >
                {selFrame.lead}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-hanken, system-ui, sans-serif)',
                  fontSize: 13,
                  color: '#75705f',
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {selFrame.body}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
