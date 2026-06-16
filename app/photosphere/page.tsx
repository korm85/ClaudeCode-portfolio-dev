import type { Metadata } from 'next'
import PhotosphereCanvas from './PhotosphereCanvas'

export const metadata: Metadata = {
  title: 'Career Gallery | Michael Korenevsky',
  description: 'An interactive 3D gallery through 14 years of building enterprise products.',
}

export default function PhotospherePage() {
  return <PhotosphereCanvas />
}
