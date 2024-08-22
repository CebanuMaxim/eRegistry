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

  console.log(
    filteredActs.reduce((acc, val) => {
      return 'val.notaryFee'
    })
  )

  // const groupedByDate = filteredActs.reduce((acc, obj) => {
  //   const date = obj.date
  //   if (!acc[date]) {
  //     acc[date] = []
  //   }
  //   acc[date].push(obj)
  //   return acc
  // }, {})

  // for (const date in groupedByDate) {
  //   groupedByDate[date].forEach((obj) => {
  //     console.log(`Date: ${obj.date}`)
  //   })
  // }

  const tableData = [
    {
      data: 1,
      actions: 441,
      authentications: 18,
      legalisations: 0,
      others: 0,
      stateFee: 90,
      notaryFee: 7360,
    },
  ]

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
            {tableData.map((row, i) => (
              <View key={i} style={reportStyles.tableRow}>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>{row.data}</Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>{row.actions}</Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>
                    {row.authentications}
                  </Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>
                    {row.legalisations}
                  </Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>{row.others}</Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>{row.stateFee}</Text>
                </View>
                <View style={reportStyles.tableCol}>
                  <Text style={reportStyles.tableCell}>{row.notaryFee}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Reports
