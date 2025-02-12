import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import * as d3 from 'd3'
import { Accordion } from 'react-bootstrap'

interface ChartDataPoint {
  date: string
  value: number
}

interface Props {
  data: ChartDataPoint[]
}

const NormalDistributionChart: React.FC<Props> = ({ data }) => {
  if (data.length === 0) return <p>No data available</p>

  // Вычисляем среднее и стандартное отклонение
  const values = data.map((d) => d.value)
  const mean = d3.mean(values) || 0
  const stdDev = d3.deviation(values) || 1

  // Генерируем точки для нормального распределения
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const step = (maxVal - minVal) / 50
  const normalData = d3.range(minVal, maxVal, step).map((x) => ({
    x,
    y:
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2)),
  }))

  return (
    <Accordion.Item eventKey='1'>
      <Accordion.Header>Normal Distribution of Notary Fees</Accordion.Header>
      <Accordion.Body>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='x' type='number' domain={[minVal, maxVal]} />
            <YAxis />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='y'
              data={normalData}
              stroke='#ff7300'
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default NormalDistributionChart
