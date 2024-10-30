import { Act } from '../types'
import { Page, Text, View } from '@react-pdf/renderer'
import { confirmationStyles as styles } from './Styles'

const Confirmation = (act: Act, typographyId: string, registryId: string) => {
  const totalFee = Number(act.stateFee) + Number(act.notaryFee)

  const indentation = (text: string) => (
    <Text style={{ color: 'white' }}>{text}</Text>
  )

  return (
    <Page key={act.actId} size='A5' orientation='landscape' style={styles.page}>
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
        C O N F I R M A R E {indentation('_')} n r . _____
      </Text>
      <View style={styles.content}>
        <View />
        <Text>
          {indentation('_____')}Prin prezenta se confirmă, că la data de{' '}
          <Text style={{ color: 'red' }}>{act.date}</Text>, pentru acordarea
          asistenței notariale cu nr. de înregistrare{' '}
          <Text style={styles.underline}>2-{act.actId}</Text> din registrul
          actelor notariale nr. {typographyId}/{registryId}, a fost achitată
          plata pentru asistență notarială{' '}
          <Text style={styles.underline}>{act.notaryFee}</Text> lei și taxa de
          stat {act.stateFee} lei, în total {totalFee} lei, achitați de cet.{' '}
          <Text style={styles.underline}>
            {act.lastname} {act.firstname}
          </Text>
          , numărul de identificare {act.idnp}.
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

export default Confirmation
