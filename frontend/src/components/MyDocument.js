import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const MyDocument = () => (
  <PDFViewer>
    <Document>
      <Page orientation='landscape' style={styles.page}>
        <View style={styles.section}>
          <Text>
            LAZU AURELIA Notar, Cod fiscal 16146019 MD 2069, mun. Chișinău, str.
            Ion Creangă, nr. 6/2, of. 9-10, tel.022-27-01-89
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
)

export default MyDocument
