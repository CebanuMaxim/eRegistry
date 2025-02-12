import React, { useState, useEffect, FormEvent } from 'react'
import axios from '../api/axios'
import { Form, Button, Table, Accordion } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import { User, Act } from '../types'

// Import Recharts components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Reports from '../components/Reports'
import useSession from '../hooks/useSession'
import NormalDistributionChart from '../components/NormalDistributionChart'

// Вставьте в JSX

// Define interfaces and types
interface ChartDataPoint {
  date: string // Format: 'yyyy-mm-dd'
  value: number
}

type TimeRangeValue = 'week' | 'month' | '6months' | 'year' | 'all'

interface TimeRangeOption {
  label: string
  value: TimeRangeValue
}

const Admin: React.FC = () => {
  useSession('AdminView')

  const [acts, setActs] = useState<Act[]>([])
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])

  // State for chart data and selected time range
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>('month')

  // Time range options
  const timeRanges: TimeRangeOption[] = [
    { label: '1 Week', value: 'week' },
    { label: '1 Month', value: 'month' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: 'year' },
    { label: 'All Time', value: 'all' },
  ]

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get<User[]>('/users')
        setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getUsers()

    const fetchData = async () => {
      try {
        const data = await generateData()

        setChartData(data)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Function to convert date from 'dd.mm.yyyy' to 'yyyy-mm-dd'
  const convertDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split('.')
    const dayPadded = day.padStart(2, '0')
    const monthPadded = month.padStart(2, '0')
    return `${year}-${monthPadded}-${dayPadded}`
  }

  // Custom function to format dates to 'yyyy-mm-dd' without time zone issues
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  // Updated generateData function to aggregate data per day
  const generateData = async (): Promise<ChartDataPoint[]> => {
    const response = await axios.get<Act[]>('/acts')

    setActs(response.data)

    // Object to hold aggregated data per day
    const aggregatedData: { [date: string]: number } = {}

    response.data.forEach((act: Act) => {
      const date = convertDate(act.date)
      const value = Number(act.notaryFee)

      if (isNaN(value)) {
        console.warn(
          `Invalid notaryFee value for act ID ${act._id}:`,
          act.notaryFee
        )
        return
      }

      // Aggregate values per date
      if (aggregatedData[date]) {
        aggregatedData[date] += value
      } else {
        aggregatedData[date] = value
      }
    })

    // Get the date range from the data
    let dates = Object.keys(aggregatedData)

    if (dates.length === 0) return []

    // Sort the dates
    dates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    const startDate = new Date(dates[0])
    const endDate = new Date(dates[dates.length - 1])
    endDate.setDate(endDate.getDate() + 1)

    // Fill in missing dates with zero values
    const data: ChartDataPoint[] = fillMissingDays(
      startDate,
      endDate,
      aggregatedData
    )

    return data
  }

  // Function to fill missing days in the data
  const fillMissingDays = (
    startDate: Date,
    endDate: Date,
    aggregatedData: { [date: string]: number }
  ): ChartDataPoint[] => {
    const data: ChartDataPoint[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateStr = formatDate(currentDate)

      data.push({
        date: dateStr,
        value: aggregatedData[dateStr] || 0,
      })

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return data
  }

  // Function to get the start date of the week (Monday)
  const getStartOfWeek = (date: Date): string => {
    const newDate = new Date(date)
    const day = newDate.getDay()

    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1)
    newDate.setDate(diff)
    newDate.setHours(0, 0, 0, 0)
    return formatDate(newDate)
  }

  // Function to group data by week
  const groupDataByWeek = (data: ChartDataPoint[]): ChartDataPoint[] => {
    const aggregatedData: { [weekStartDate: string]: number } = {}

    data.forEach((item) => {
      const date = new Date(item.date)
      const weekStartDate = getStartOfWeek(date)
      if (aggregatedData[weekStartDate]) {
        aggregatedData[weekStartDate] += item.value
      } else {
        aggregatedData[weekStartDate] = item.value
      }
    })

    // Convert aggregated data to ChartDataPoint[]
    const result: ChartDataPoint[] = Object.entries(aggregatedData).map(
      ([date, value]) => ({
        date,
        value,
      })
    )

    // Sort the result by date
    result.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    return result
  }

  // Function to get the start of the month
  const getStartOfMonth = (date: Date): string => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1)
    return formatDate(newDate)
  }

  // Function to group data by month
  const groupDataByMonth = (data: ChartDataPoint[]): ChartDataPoint[] => {
    const aggregatedData: { [monthStartDate: string]: number } = {}

    data.forEach((item) => {
      const date = new Date(item.date)
      const monthStartDate = getStartOfMonth(date)
      if (aggregatedData[monthStartDate]) {
        aggregatedData[monthStartDate] += item.value
      } else {
        aggregatedData[monthStartDate] = item.value
      }
    })

    // Convert aggregated data to ChartDataPoint[]
    const result: ChartDataPoint[] = Object.entries(aggregatedData).map(
      ([date, value]) => ({
        date,
        value,
      })
    )

    // Sort the result by date
    result.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    return result
  }

  // Function to fill missing weeks in the data
  const fillMissingWeeks = (
    startDate: Date,
    endDate: Date,
    data: ChartDataPoint[]
  ): ChartDataPoint[] => {
    const weekMap: { [weekStartDate: string]: number } = {}
    data.forEach((item) => {
      weekMap[item.date] = item.value
    })

    const result: ChartDataPoint[] = []
    const currentDate = new Date(getStartOfWeek(startDate))

    while (currentDate <= endDate) {
      const weekStartDateStr = formatDate(currentDate)
      const value = weekMap[weekStartDateStr] || 0
      result.push({ date: weekStartDateStr, value })
      currentDate.setDate(currentDate.getDate() + 7)
    }
    return result
  }

  // Updated filterDataByRange function
  const filterDataByRange = (
    data: ChartDataPoint[],
    range: TimeRangeValue
  ): ChartDataPoint[] => {
    const now = new Date()
    let startDate: Date

    switch (range) {
      case 'week': {
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      }
      case 'month': {
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      }
      case '6months': {
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 6)
        break
      }
      case 'year': {
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        break
      }
      case 'all':
      default: {
        if (data.length > 0) {
          startDate = new Date(data[0].date)
        } else {
          startDate = new Date()
        }
        break
      }
    }

    // Filter data within date range
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date)

      // Subtract one day from the startDate
      const adjustedStartDate = new Date(startDate)
      adjustedStartDate.setDate(adjustedStartDate.getDate() - 1)

      return itemDate >= adjustedStartDate && itemDate <= now
    })

    // Determine whether to aggregate per week or per day
    let aggregatedData: ChartDataPoint[]

    if (range === 'all') {
      // Aggregate per month for 'all' range
      aggregatedData = groupDataByMonth(filteredData)
    } else if (range === '6months' || range === 'year') {
      // Aggregate per week for '6months' or 'year'
      const groupedData = groupDataByWeek(filteredData)
      aggregatedData = fillMissingWeeks(startDate, now, groupedData)
    } else {
      // Aggregate per day (data is already per day)
      aggregatedData = fillMissingDays(
        startDate,
        now,
        aggregatedDataToMap(filteredData)
      )
    }

    return aggregatedData
  }

  // Helper function to convert ChartDataPoint[] to aggregatedData map
  const aggregatedDataToMap = (
    data: ChartDataPoint[]
  ): { [date: string]: number } => {
    const map: { [date: string]: number } = {}

    data.forEach((item) => {
      map[item.date] = item.value
    })

    return map
  }

  // Conditional rendering to ensure data is loaded
  if (chartData.length === 0) {
    return <p>Loading chart data...</p>
  }

  const filteredChartData: ChartDataPoint[] = filterDataByRange(
    chartData,
    selectedRange
  )

  // Optional: Format X-axis labels
  const formatXAxis = (tickItem: string): string => {
    const date = new Date(tickItem)
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    })
  }

  // Optional: Format Tooltip labels
  const formatTooltipLabel = (value: string): string => {
    const date = new Date(value)

    if (selectedRange === '6months' || selectedRange === 'year') {
      // Show date range for the week
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 6)
      return `Week: ${date.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    } else if (selectedRange === 'all') {
      // Show the month for the 'all' case
      return `Month: ${date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })}`
    } else {
      // Default to showing the exact date
      return `Date: ${date.toLocaleDateString()}`
    }
  }

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      await axios.post('/users', {
        username,
        password,
        isAdmin,
      })
      // Optionally, re-fetch users or update the users state
      const response = await axios.get<User[]>('/users')
      setUsers(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUser = async (id: string) => {
    const deletePrompt = prompt('Delete user? y/n')

    if (deletePrompt === 'y') {
      try {
        await axios.delete(`/users/${id}`)
        setUsers(users.filter((user: User) => user._id !== id))
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <Reports acts={acts} />
      {/* Chart and time range selection */}
      <div style={{ marginBottom: '20px' }}>
        {timeRanges.map((range: TimeRangeOption) => (
          <button
            key={range.value}
            onClick={() => setSelectedRange(range.value)}
            style={{
              marginRight: '5px',
              padding: '10px',
              backgroundColor:
                selectedRange === range.value ? '#8884d8' : '#eee',
              color: selectedRange === range.value ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {range.label}
          </button>
        ))}
      </div>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Notary Fees Over Time</Accordion.Header>

          <Accordion.Body>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={filteredChartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip labelFormatter={formatTooltipLabel} />
                <Legend />
                <Bar dataKey='value' name='Total Notary Fees' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </Accordion.Body>
        </Accordion.Item>
        <NormalDistributionChart data={filteredChartData} />
      </Accordion>

      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Is Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            return (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{String(user.isAdmin)}</td>
                <td>
                  <Button
                    onClick={() => deleteUser(user._id)}
                    variant='link'
                    size='sm'
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <FormContainer>
        <h2>Register New User</h2>
        <Form onSubmit={createUser}>
          <Form.Group className='my-3' controlId='username'>
            <Form.Control
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='confirmPassword'>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
          </Form.Group>

          <div>
            <Button type='submit' variant='secondary'>
              Register
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default Admin
