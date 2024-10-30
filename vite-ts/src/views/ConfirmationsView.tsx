import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Confirmation from '../components/Confirmation'
import { FilteredActsContext } from '../context/Context'
import { Document, PDFViewer, Font } from '@react-pdf/renderer'
import RobotoLight from '../fonts/Roboto-Light.ttf'
import RobotoRegular from '../fonts/Roboto-Regular.ttf'
import RobotoMedium from '../fonts/Roboto-Medium.ttf'
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

const Confirmations = () => {
  const { filteredActs } = useContext(FilteredActsContext)
  const { typographyId, registryId } = useParams()

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
        accumulateProperty('notaryFee', i)
        newArray[counter - 1].actId =
          String(array[i].actId) + ' - 2-' + String(newArray[counter - 1].actId)
      } else {
        newArray[counter] = { ...array[i] }
        counter++
      }
    }
    return newArray
  }
  const newFilteredActs = reduceObjectByProperty(filteredActs, 'idnp')

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        {newFilteredActs
          .slice()
          .reverse()
          .map((act) => {
            return Confirmation(act, typographyId ?? '', registryId ?? '')
          })}
      </Document>
    </PDFViewer>
  )
}

export default Confirmations
