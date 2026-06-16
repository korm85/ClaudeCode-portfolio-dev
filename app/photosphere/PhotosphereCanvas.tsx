'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const DEG = Math.PI / 180
const SPHERE_R = 8
const CELL_W = 2.0
const CELL_H = 1.6
const GRID_COLS = 10
const GRID_ROWS = 10
const CONTENT_ROW = 4 // row index where content frames live

// Equal-spacing column azimuths: Δaz = CELL_W/R radians
const COL_AZ = Array.from({ length: GRID_COLS }, (_, k) =>
  (k - (GRID_COLS - 1) / 2) * (CELL_W / SPHERE_R) * (180 / Math.PI)
)
// ≈ [-64.3, -50.0, -35.7, -21.4, -7.2, 7.2, 21.4, 35.7, 50.0, 64.3] degrees

const ROW_Y = Array.from({ length: GRID_ROWS }, (_, r) =>
  (r - (GRID_ROWS - 1) / 2) * CELL_H
)
// ≈ [-7.2, -5.6, -4.0, -2.4, -0.8, 0.8, 2.4, 4.0, 5.6, 7.2]

// Rig spring state (module-level for stale-closure-free useFrame)
const view = {
  targetAz: Math.PI, az: Math.PI, velAz: 0,
  targetEl: 0, el: 0, velEl: 0,
  dragging: false, lastInteraction: 0,
}

// Camera dolly state
const camAnim = {
  pos: new THREE.Vector3(0, 0, 0.01),
  lookTgt: new THREE.Vector3(0, 0, -8),
}
const _wp = new THREE.Vector3()
const _origin = new THREE.Vector3(0, 0, 0.01)
const _defaultLook = new THREE.Vector3(0, 0, -8)

const bridge = {
  raycaster: null as THREE.Raycaster | null,
  camera: null as THREE.Camera | null,
  meshes: [] as Array<THREE.Mesh | null>,
}

// Content frames: cols 2–6, all at CONTENT_ROW
const FRAMES = [
  {
    id: 'about', col: 2,
    img: '/profile.jpeg', ar: 1,
    tag: 'Who I am',
    title: 'Michael Korenevsky',
    lead: '14 years building enterprise software for high-stakes industries.',
    body: 'Started as a software engineer, moved into PM to own the full product lifecycle — from customer discovery to engineering handoff to market launch. Now focused on AI-powered tools for manufacturing and construction.',
  },
  {
    id: 'simulation', col: 3,
    img: '/simulation-heatmap.png', ar: 1934 / 1152,
    tag: 'Physics simulation',
    title: 'Powder bed fusion, predicted',
    lead: 'Built the PM function at Oqton for physics-based AM simulation — zero to shipped.',
    body: 'Simulation predicts thermal gradients and distortion before printing, eliminating costly trial runs. Shipped across 3 enterprise customers. Led requirements, roadmap, and launch from scratch.',
  },
  {
    id: 'amvero', col: 4,
    img: '/amvero-product.png', ar: 2500 / 1934,
    tag: 'AI inspection',
    title: 'AMVero — automated defect detection',
    lead: '98% detection rate. 73% faster inspection. 4 enterprise customers.',
    body: 'Brought AI anomaly detection to production quality control. Model trained on real defect data; deployed in live manufacturing environments at scale.',
  },
  {
    id: 'ai', col: 5,
    img: '/amvero-comparison.png', ar: 1819 / 1448,
    tag: 'AI practice',
    title: 'How I work with AI',
    lead: 'Systematic approach to integrating AI into product workflows.',
    body: 'Use AI for spec generation, prototype iteration, and roadmap prioritization. Every case study on this site was built with AI-assisted PM process.',
  },
  {
    id: 'next', col: 6,
    img: '/amvero-roi.png', ar: 1200 / 750,
    tag: "What's next",
    title: 'Senior PM · AI · Enterprise',
    lead: 'Open to senior PM roles in AI-native or deep-tech companies.',
    body: 'I build products that work in the physical world — where mistakes are expensive and precision matters. korm85@gmail.com',
  },
]

type FrameConfig = typeof FRAMES[0]

function cylPos(azDeg: number, y: number, r = SPHERE_R): THREE.Vector3 {
  const az = azDeg * DEG
  return new THREE.Vector3(r * Math.sin(az), y, r * Math.cos(az))
}

function faceOriginQuat(pos: THREE.Vector3): THREE.Quaternion {
  const dummy = new THREE.Object3D()
  dummy.position.copy(pos)
  dummy.lookAt(0, 0, 0)
  return dummy.quaternion.clone()
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

// 10×10 decorative grid — InstancedMesh for performance
function DecorativeGrid() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const count = GRID_COLS * GRID_ROWS

  useEffect(() => {
    const m = ref.current
    if (!m) return
    const dummy = new THREE.Object3D()
    let idx = 0
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const pos = cylPos(COL_AZ[col], ROW_Y[row])
        dummy.position.copy(pos)
        dummy.lookAt(0, 0, 0)
        dummy.updateMatrix()
        m.setMatrixAt(idx, dummy.matrix)
        idx++
      }
    }
    m.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[CELL_W, CELL_H]} />
      <meshBasicMaterial color="#0d1828" side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

function ContentFrame({ f, idx, selRef }: { f: FrameConfig; idx: number; selRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const tex = useAsyncTexture(f.img)
  const [pos] = useState(() => cylPos(COL_AZ[f.col], ROW_Y[CONTENT_ROW], SPHERE_R - 0.08))
  const [quat] = useState(() => faceOriginQuat(pos))
  const w = CELL_H * f.ar
  const h = CELL_H

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
    const targetScale = isSel ? 1.08 : 1
    const targetOpacity = anySelected && !isSel ? 0.25 : 1
    const t = 1 - Math.pow(0.04, dt * 60)
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, targetScale, t))
    ;(m.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
      (m.material as THREE.MeshBasicMaterial).opacity, targetOpacity, t
    )
  })

  return (
    <mesh ref={meshRef} position={pos} quaternion={quat}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={tex ?? undefined}
        color={tex ? '#ffffff' : '#1a2235'}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ContentBorder({ f, idx, selRef }: { f: FrameConfig; idx: number; selRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null)
  const [pos] = useState(() => cylPos(COL_AZ[f.col], ROW_Y[CONTENT_ROW], SPHERE_R))
  const [quat] = useState(() => faceOriginQuat(pos))
  const w = CELL_H * f.ar + 0.1
  const h = CELL_H + 0.1

  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const mat = m.material as THREE.MeshBasicMaterial
    const sel = selRef.current
    const targetOpacity = sel === idx ? 1 : 0.08
    const targetColor = sel === idx ? new THREE.Color('#16a34a') : new THREE.Color('#4a5568')
    const t = 1 - Math.pow(0.04, dt * 60)
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, t)
    mat.color.lerp(targetColor, t)
  })

  return (
    <mesh ref={ref} position={pos} quaternion={quat}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial color="#4a5568" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null)
  useEffect(() => {
    if (!ref.current) return
    const mats = Array.isArray(ref.current.material)
      ? (ref.current.material as THREE.LineBasicMaterial[])
      : [ref.current.material as THREE.LineBasicMaterial]
    mats.forEach(m => { m.transparent = true; m.opacity = 0.3 })
  }, [])
  return <gridHelper ref={ref} args={[120, 40, '#16a34a', '#0d1e2a']} position={[0, -3, 0]} />
}

function Bridge() {
  const { raycaster, camera } = useThree()
  useEffect(() => {
    bridge.raycaster = raycaster
    bridge.camera = camera
  }, [raycaster, camera])
  return null
}

function Rig({ selRef }: { selRef: React.MutableRefObject<number> }) {
  const rig = useRef<THREE.Group>(null)

  useFrame((state, dt) => {
    // Auto-rotate when idle and nothing selected
    const sel = selRef.current
    const idle = !view.dragging && sel < 0 && performance.now() - view.lastInteraction > 2500
    if (idle) view.targetAz += 0.1 * dt

    // Spring physics for rig rotation
    const stiffness = 0.08, damping = 0.72
    view.velAz = view.velAz * damping + (view.targetAz - view.az) * stiffness
    view.az += view.velAz
    view.velEl = view.velEl * damping + (view.targetEl - view.el) * stiffness
    view.el += view.velEl
    view.el = Math.max(-20 * DEG, Math.min(20 * DEG, view.el))
    view.targetEl = Math.max(-20 * DEG, Math.min(20 * DEG, view.targetEl))

    if (rig.current) {
      rig.current.rotation.y = view.az
      rig.current.rotation.x = view.el
    }

    // Camera dolly — smoothly approach selected frame
    const lerpF = 1 - Math.pow(0.95, dt * 60)

    if (sel >= 0 && bridge.meshes[sel]) {
      bridge.meshes[sel]!.getWorldPosition(_wp)
      camAnim.pos.lerp(_wp.clone().multiplyScalar(0.72), lerpF)
      camAnim.lookTgt.lerp(_wp, lerpF)
    } else {
      camAnim.pos.lerp(_origin, lerpF)
      camAnim.lookTgt.lerp(_defaultLook, lerpF)
    }

    state.camera.position.copy(camAnim.pos)
    state.camera.lookAt(camAnim.lookTgt)
  })

  return (
    <group ref={rig}>
      {/* Gallery cylinder — fills gaps with dark wall */}
      <mesh renderOrder={-5}>
        <cylinderGeometry args={[SPHERE_R + 0.5, SPHERE_R + 0.5, 200, 48, 1, true]} />
        <meshBasicMaterial color="#0a0d14" side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* 10×10 decorative arc wall */}
      <DecorativeGrid />

      {/* Content frames (in front of decorative grid) */}
      {FRAMES.map((f, i) => (
        <group key={f.id}>
          <ContentBorder f={f} idx={i} selRef={selRef} />
          <ContentFrame f={f} idx={i} selRef={selRef} />
        </group>
      ))}
    </group>
  )
}

function Scene({ selRef }: { selRef: React.MutableRefObject<number> }) {
  return (
    <>
      <Rig selRef={selRef} />
      <GridFloor />
      <Bridge />
      <ambientLight intensity={1.1} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur />
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
    camAnim.pos.set(0, 0, 0.01)
    camAnim.lookTgt.set(0, 0, -8)
    // Do NOT reset bridge.meshes here — ContentFrame children populate it
    // in their useEffects, which run before this parent effect.
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

    // Significant drag while selected → deselect and allow pan
    if (moved >= 8 && selRef.current >= 0) {
      setSyncedSel(-1)
      return
    }

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
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(179, 171, 155, 0.4)',
          }}>
            drag to explore · tap to focus
          </span>
        </div>
      )}

      {/* Content panel — slides up on selection */}
      <div
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 20,
          transform: selFrame ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: selFrame ? 'auto' : 'none',
        }}
      >
        <div style={{
          background: 'rgba(8, 8, 14, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(22, 163, 74, 0.4)',
          padding: '20px 24px 40px',
          maxHeight: '44vh',
          overflowY: 'auto',
        }}>
          {selFrame && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains-mono, monospace)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#16a34a',
                    marginBottom: 5,
                  }}>
                    {selFrame.tag}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-fraunces, Georgia, serif)',
                    fontSize: 20,
                    fontWeight: 400,
                    color: '#f0ebe0',
                    lineHeight: 1.25,
                  }}>
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
              <p style={{
                fontFamily: 'var(--font-hanken, system-ui, sans-serif)',
                fontSize: 15,
                color: '#b3ab9b',
                lineHeight: 1.65,
                margin: '0 0 10px',
              }}>
                {selFrame.lead}
              </p>
              <p style={{
                fontFamily: 'var(--font-hanken, system-ui, sans-serif)',
                fontSize: 13,
                color: '#75705f',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {selFrame.body}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
