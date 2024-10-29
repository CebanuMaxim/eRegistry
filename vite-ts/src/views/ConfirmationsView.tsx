import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Confirmation from '../components/Confirmation'
import { FilteredActsContext } from '../context/Context'
import { Document, PDFViewer, Font } from '@react-pdf/renderer'
import RobotoLight from '../fonts/Roboto-Light.ttf'
import RobotoRegular from '../fonts/Roboto-Regular.ttf'
import RobotoMedium from '../fonts/Roboto-Medium.ttf'

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

  const reduceProperty = () => {
    const newArray = []
    let counter = 1
    newArray[0] = filteredActs[0].notaryFee
    for (let i = 1; i < filteredActs.length; i++) {
      if (filteredActs[i].idnp === filteredActs[i - 1].idnp) {
        newArray[counter - 1] =
          Number(newArray[counter - 1]) + Number(filteredActs[i].notaryFee)
      } else {
        newArray[counter] = filteredActs[i].notaryFee
        counter++
      }
    }
    console.log(newArray)
  }
  reduceProperty()

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
