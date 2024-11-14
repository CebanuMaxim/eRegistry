import { useContext } from 'react'
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
  const { filteredActs } = useContext(FilteredActsContext)

  type Result = {
    [date: string]: {
      totalStateFee: number
      totalNotaryFee: number
      legalizedActs: number
      authenticatedActs: number
      totalActs: number
      otherActs: number
    }
  }

  const groupedData = filteredActs.reduce<Result>((result, act) => {
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

    result[date].totalStateFee += Number(act.stateFee)
    result[date].totalNotaryFee += Number(act.notaryFee)
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

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        <Page size='A4' style={reportStyles.page}>
          <View style={reportStyles.table}>
            <View style={reportStyles.tableRow}>
              <View style={reportStyles.tableCol}>
                <Text style={reportStyles.tableCell}>iulie 24</Text>
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
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Reports
