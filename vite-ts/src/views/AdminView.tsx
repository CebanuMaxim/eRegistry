import React, { useState, useEffect, FormEvent } from 'react'
import axios from '../api/axios'
import { Form, Button, Table } from 'react-bootstrap'
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
  // State variables with explicit types
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
  }, [])

  // Function to convert date from 'dd.mm.yyyy' to 'yyyy-mm-dd'
  const convertDate = (dateStr: string): string => {
    const [day, month, year] = dateStr.split('.')
    const dayPadded = day.padStart(2, '0')
    const monthPadded = month.padStart(2, '0')
    return `${year}-${monthPadded}-${dayPadded}`
  }

  // Updated generateData function to aggregate data per day
  const generateData = async (): Promise<ChartDataPoint[]> => {
    const response = await axios.get<Act[]>('/acts')
    // Object to hold aggregated data
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

    // Convert aggregated data to ChartDataPoint[]
    const data: ChartDataPoint[] = Object.entries(aggregatedData).map(
      ([date, value]) => ({
        date,
        value,
      })
    )

    // Sort data by date
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return data
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

  // Function to filter chart data based on selected time range
  const filterDataByRange = (
    data: ChartDataPoint[],
    range: TimeRangeValue
  ): ChartDataPoint[] => {
    const now = new Date()
    let filteredData: ChartDataPoint[] = []

    switch (range) {
      case 'week': {
        const weekAgo = new Date(now)
        weekAgo.setDate(now.getDate() - 7)
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= weekAgo && itemDate <= now
        })
        break
      }
      case 'month': {
        const monthAgo = new Date(now)
        monthAgo.setMonth(now.getMonth() - 1)
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= monthAgo && itemDate <= now
        })
        break
      }
      case '6months': {
        const sixMonthsAgo = new Date(now)
        sixMonthsAgo.setMonth(now.getMonth() - 6)
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= sixMonthsAgo && itemDate <= now
        })
        break
      }
      case 'year': {
        const yearAgo = new Date(now)
        yearAgo.setFullYear(now.getFullYear() - 1)
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= yearAgo && itemDate <= now
        })
        break
      }
      case 'all':
      default: {
        filteredData = data
        break
      }
    }
    return filteredData
  }

  const filteredChartData: ChartDataPoint[] = filterDataByRange(
    chartData,
    selectedRange
  )

  // Optional: Format X-axis labels
  const formatXAxis = (tickItem: string): string => {
    return new Date(tickItem).toLocaleDateString()
  }

  // Optional: Format Tooltip labels
  const formatTooltipLabel = (value: string): string => {
    return `Date: ${new Date(value).toLocaleDateString()}`
  }

  return (
    <>
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

      {/* Chart and time range selection */}
      <div>
        <h2>Notary Fees Over Time</h2>
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
      </div>

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
