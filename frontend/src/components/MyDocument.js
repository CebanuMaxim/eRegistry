import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'
import { styles } from './Styles'
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

const underline = (text) => (
  <Text style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}>
    {text}
  </Text>
)
const indentation = (text) => <Text style={{ color: 'white' }}>{text}</Text>

const confirmation = (act, i, typographyId, registryId) => {
  const totalFee = act.stateFee + act.notaryFee

  return (
    <Page key={i} size='A5' orientation='landscape' style={styles.page}>
      <View style={styles.header}>
        <Text>LAZU AURELIA Notar, Cod fiscal 16146019</Text>
        <Text>
          MD 2069 mun. Chișinău str. Ion Creangă nr. 6/2 of. 9-10,
          tel.022-27-01-89
        </Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.seal}>
        <Text>Aprobat de notarul Lazu Aurelia</Text>
        <Text>prin Ordinul nr. 1 din 11.01.2019</Text>
        <Text>conform art. 11 (4) (7) (8) Legii Contabilității</Text>
        <Text>și raportării financiare nr. 287 din 15.12.2017</Text>
      </View>
      <Text style={styles.title}>
        C O N F I R M A R E {indentation('_')} n r . 1
      </Text>
      <View style={styles.content}>
        <View style={styles.indentation} />
        <Text>
          {indentation('_____')}Prin prezenta se confirmă, că la data de{' '}
          {act.date}, pentru acordarea asistenței notariale cu nr. de
          înregistrare {act.number} din registrul actelor notariale nr.{' '}
          {typographyId}/{registryId}, a fost achitată plata pentru asistență
          notarială {act.notaryFee} lei și taxa de stat {act.stateFee} lei, în
          total {totalFee} lei, achitați de cet. {act.lastname} {act.firstname},
          numărul de identificare 0980710426302.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text>
          Notar {indentation('______________________________________')}Lazu
          Aurelia
        </Text>
      </View>
    </Page>
  )
}

// Create Document Component
const MyDocument = () => {
  const [acts, setActs] = useState([])
  const { id } = useParams()
  const [typographyId, setTypographyId] = useState()
  const [registryId, setRegistryId] = useState()

  useEffect(() => {
    async function getActs() {
      try {
        const res = await axios.get(`/registries/${id}`)
        setTypographyId(res.data.typographyId)
        setRegistryId(res.data.registryId)
        if (!res.data.acts) {
          return
        }
        setActs(
          res.data.acts
            .sort(function (a, b) {
              return a.actId - b.actId
            })
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }

    getActs()
  }, [])

  return (
    <PDFViewer style={{ width: '100%', height: window.innerHeight }}>
      <Document>
        {acts.map((act, i) => {
          return confirmation(act, i, typographyId, registryId)
        })}
      </Document>
    </PDFViewer>
  )
}

export default MyDocument
