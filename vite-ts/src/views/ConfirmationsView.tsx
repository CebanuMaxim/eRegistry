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

  type Item = {
    id: number
    name: string
    value: number
  }

  const sumDuplicatesByProperty = <T extends Record<string, any>>(
    array: T[],
    keyToCheck: keyof T,
    keyToSum: keyof T
  ): T[] => {
    const counts: Record<string, T> = {}

    array.forEach((item) => {
      const id = item[keyToCheck] as string
      if (!counts[id]) {
        counts[id] = { ...item }
      } else {
        // Ensure the value to sum is a number
        counts[id][keyToSum] =
          (counts[id][keyToSum] as number) + (item[keyToSum] as number)
      }
    })

    return Object.values(counts)
  }
  console.log(sumDuplicatesByProperty(array, 'id', 'value'))

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        {filteredActs
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
