import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'
import RobotoLight from '../fonts/Roboto-Light.ttf'
import RobotoRegular from '../fonts/Roboto-Regular.ttf'
import RobotoMedium from '../fonts/Roboto-Medium.ttf'
import { reportStyles } from '../components/Styles'
import { FilteredActsContext } from '../context/Context'
import { Act } from '../types'
import axios from 'axios'

Font.register({
  family: 'RobotoLight',
  src: RobotoLight,
})
Font.register({
  family: 'RobotoRegular',
  src: RobotoRegular,
})
Font.register({
  family: 'RobotoMedium',
  src: RobotoMedium,
})

const Reports = () => {
  // const [acts, setActs] = useState([])
  // const par = useParams()

  // useEffect(() => {
  //   const getActs = async () => {
  //     try {
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getActs()
  // })

  const { filteredActs } = useContext(FilteredActsContext)

  type GroupedData = {
    [date: string]: {
      totalStateFee: number
      totalNotaryFee: number
      legalizedActs: number
      authenticatedActs: number
      totalActs: number
      otherActs: number
    }
  }

  const groupedData = filteredActs.reduce<GroupedData>((result, act: Act) => {
    const date = act.date

    if (!result[date]) {
      result[date] = {
        totalStateFee: 0,
        totalNotaryFee: 0,
        legalizedActs: 0,
        authenticatedActs: 0,
        totalActs: 0,
        otherActs: 0,
      }
    }

    const stateFee = Number(act.stateFee) || 0
    const notaryFee = Number(act.notaryFee) || 0

    result[date].totalStateFee += stateFee
    result[date].totalNotaryFee += notaryFee
    result[date].totalActs++

    if (act.actName === 'Act legalizat') {
      result[date].legalizedActs++
    } else if (act.actName === 'Act autentificat') {
      result[date].authenticatedActs++
    } else if (act.actName === 'Alte acte') {
      result[date].otherActs++
    }

    return result
  }, {})

  type TotalData = {
    stateFee: number
    notaryFee: number
    totalFee: number
    legalizedActs: number
    authenticatedActs: number
    otherActs: number
    allActs: number
  }

  const totalData = filteredActs.reduce<TotalData>(
    (acc, act) => {
      acc.stateFee += Number(act.stateFee)
      acc.notaryFee += Number(act.notaryFee)
      acc.totalFee += Number(act.stateFee) + Number(act.notaryFee)

      if (act.actName === 'Act legalizat') {
        acc.legalizedActs++
      } else if (act.actName === 'Act autentificat') {
        acc.authenticatedActs++
      } else if (act.actName === 'Alte acte') {
        acc.otherActs++
      }
      acc.allActs++

      return acc
    },
    {
      stateFee: 0,
      notaryFee: 0,
      totalFee: 0,
      legalizedActs: 0,
      authenticatedActs: 0,
      otherActs: 0,
      allActs: 0,
    }
  )

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        <Page size='A4' style={reportStyles.page}>
          <View style={reportStyles.table}>
            <View style={reportStyles.tableRow}>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Data</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Acțiuni</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Autentificări</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Legalizări</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Altele</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Taxa de stat</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Taxa notarială</Text>
              </View>
            </View>

            {Object.entries(groupedData)
              .reverse()
              .map((row, i) => {
                const [date, data] = row
                return (
                  <View key={i} style={reportStyles.tableRow}>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>{date}</Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.totalActs}
                      </Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.authenticatedActs}
                      </Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.legalizedActs}
                      </Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.otherActs}
                      </Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.totalStateFee}
                      </Text>
                    </View>
                    <View style={reportStyles.tableCol}>
                      <Text style={reportStyles.tableCell}>
                        {data.totalNotaryFee}
                      </Text>
                    </View>
                  </View>
                )
              })}
            <View style={reportStyles.lastTableRow}>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>Totaluri</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>{totalData.allActs}</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>
                  {totalData.authenticatedActs}
                </Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>
                  {totalData.legalizedActs}
                </Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>
                  {totalData.otherActs}
                </Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>{totalData.stateFee}</Text>
              </View>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>
                  {totalData.notaryFee}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Reports
