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
import { Act } from '../types'

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

  const reduceObjectByProperty = (array: Act[], id: string) => {
    const newArray: Act[] = []
    let counter = 1
    newArray[0] = { ...array[0] }

    // Helper function to accumulate property values for duplicate idnp's
    const accumulateProperty = (prop: string, i: number) => {
      newArray[counter - 1][prop] =
        Number(newArray[counter - 1][prop]) + Number(array[i][prop])
    }

    // Reduce array to new array, accumulating properties for duplicate idnp's
    for (let i = 1; i < array.length; i++) {
      if (array[i][id] === array[i - 1][id]) {
        accumulateProperty('stateFee', i)
        accumulateProperty('stateFee', i)
        accumulateProperty('notaryFee', i)
      } else {
        newArray[counter] = { ...array[i] }
        counter++
      }
    }
    return newArray
  }
  const newFilteredActs = reduceObjectByProperty(filteredActs, 'date')
  newFilteredActs.reverse()
  const totalActions = 12

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
            {newFilteredActs.map((row, i) => {
              return (
                <View key={i} style={reportStyles.tableRow}>
                  <View style={reportStyles.tableCol}>
                    <Text style={reportStyles.tableCell}>{row.date}</Text>
                  </View>
                  <View style={reportStyles.tableCol}>
                    <Text style={reportStyles.tableCell}>{totalActions}</Text>
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
              )
            })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Reports
