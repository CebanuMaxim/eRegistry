import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'

const LightweightChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null) // Store chart instance in useRef

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart only if it doesn't exist
    if (!chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: 600,
        height: 300,
      })

      const lineSeries = chartRef.current.addLineSeries()
      lineSeries.setData([
        { time: '2024-01-01', value: 100 },
        { time: '2024-01-02', value: 110 },
        { time: '2024-01-03', value: 105 },
      ])
    }

    return () => {
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [])

  return (
    <div ref={chartContainerRef} style={{ width: '600px', height: '300px' }} />
  )
}

export default LightweightChart
