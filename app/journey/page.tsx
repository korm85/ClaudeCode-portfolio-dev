import type { Metadata } from 'next'
import JourneyCanvas from './JourneyCanvas'

export const metadata: Metadata = {
  title: 'Career Journey | Michael Korenevsky',
  description: 'An interactive 3D journey through 14 years of building enterprise software products.',
}

export default function JourneyPage() {
  return <JourneyCanvas />
}
