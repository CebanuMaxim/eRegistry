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
