import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Confirmation from '../components/Confirmation'
import { FilteredActsContext } from '../context/Context'
import { Document, PDFViewer, Font } from '@react-pdf/renderer'
import RobotoLight from '../fonts/Roboto-Light.ttf'
import RobotoRegular from '../fonts/Roboto-Regular.ttf'
import RobotoMedium from '../fonts/Roboto-Medium.ttf'
import { Act } from '../types'

// Register fonts for react-pdf
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

// This updated function groups acts (by the provided property, e.g. 'idnp')
// and accumulates the fees. For acts with the same idnp, it sets the actId to a range.
// For example, if the first act in the group has actId = 1 and a later one has actId = 3,
// the resulting actId will be "1-3".
const reduceObjectByProperty = (array: Act[], id: string): Act[] => {
  if (array.length === 0) return []

  const newArray: Act[] = []
  let groupIndex = 0

  // Begin the first group.
  // Save the starting actId for the range.
  let startActId = array[0].actId
  newArray[groupIndex] = { ...array[0] }

  for (let i = 1; i < array.length; i++) {
    // If the current act has the same group id (e.g. same 'idnp')
    if (array[i][id] === array[i - 1][id]) {
      // Accumulate numeric properties.
      newArray[groupIndex].stateFee =
        Number(newArray[groupIndex].stateFee) + Number(array[i].stateFee)
      newArray[groupIndex].notaryFee =
        Number(newArray[groupIndex].notaryFee) + Number(array[i].notaryFee)

      // Instead of concatenating in a hard-coded way, update the actId to be a range.
      // We keep the startActId unchanged, and update the range using the current act's actId.
      newArray[groupIndex].actId = `${startActId}-${array[i].actId}`
    } else {
      // Start a new group when the grouping property differs.
      groupIndex++
      startActId = array[i].actId
      newArray[groupIndex] = { ...array[i] }
    }
  }

  return newArray
}

const Confirmations = () => {
  const { filteredActs } = useContext(FilteredActsContext)
  const { typographyId, registryId } = useParams()
  // console.log(
  //   +filteredActs[0].actId < +filteredActs[filteredActs.length - 1].actId
  // )

  // Convert `actId` to number if it's stored as string.
  const firstId = +filteredActs[0].actId
  const lastId = +filteredActs[filteredActs.length - 1].actId

  // If first is bigger than last, the array is descending → reverse it.
  if (firstId > lastId) {
    filteredActs.reverse()
  }

  // Using the updated reduction function
  const newFilteredActs = reduceObjectByProperty(filteredActs, 'idnp')

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        {newFilteredActs
          .slice()
          // .reverse()
          .map((act) => {
            return Confirmation(act, typographyId ?? '', registryId ?? '')
          })}
      </Document>
    </PDFViewer>
  )
}

export default Confirmations
