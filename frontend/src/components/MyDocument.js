import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'
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

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    fontFamily: 'RobotoLight',
    fontSize: 12,
    padding: 30,
    border: '1px solid black',
  },
  header: {
    textAlign: 'center',
    fontFamily: 'RobotoMedium',
  },
  verticalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 3,
    marginBottom: 3,
  },
  seal: {
    textAlign: 'right',
    fontSize: 8,
  },
  title: {
    fontFamily: 'RobotoMedium',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    textIndent: 15,
    lineHeight: 1.7,
  },
  boldText: {
    fontFamily: 'RobotoMedium',
  },
  footer: {
    fontFamily: 'RobotoMedium',
    marginTop: 70,
  },
})
const underline = (text) => (
  <Text style={{ textDecoration: 'underline', textDecorationColor: 'gray' }}>
    {text}
  </Text>
)
const indentation = (text) => <Text style={{ color: 'white' }}>{text}</Text>

const confirmations = [1, 2]

const confirmation = (nr, i) => {
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
        C O N F I R M A R E {indentation('_')} n r . {nr}
      </Text>
      <View style={styles.content}>
        <View style={styles.indentation} />
        <Text>
          {indentation('_____')}Prin prezenta se confirmă, că la data de
          25.03.2023, pentru acordarea asistenței notariale cu nr. de
          înregistrare {underline('2-1978')} din registrul actelor notariale nr.
          0002152/4734, a fost achitată plata pentru asistență notarială{' '}
          {underline('355 lei')} și taxa de stat 10 lei, în total 360 lei,
          achitați de cet. {underline('Boliuh Serghei')}, numărul de
          identificare 0980710426302.
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
const MyDocument = () => (
  <PDFViewer style={{ width: window.innerWidth, height: window.innerHeight }}>
    <Document>
      {confirmations.map((nr, i) => {
        return confirmation(nr, i)
      })}
    </Document>
  </PDFViewer>
)

export default MyDocument
