import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Gallery } from './showcase/Gallery'
import { SampleFrame } from './showcase/SampleFrame'
import { getSample } from './samples/registry'

function SampleRoute() {
  const { id } = useParams<{ id: string }>()
  const sample = getSample(id)
  if (!sample) return <Navigate to="/" replace />
  return <SampleFrame sample={sample} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/sample/:id" element={<SampleRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
