import { StyleSheet } from '@react-pdf/renderer'

export const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid lightgray',
}

export const actItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid lightgray',
}

export const errorStyle = {
  color: 'red',
  fontSize: '0.8rem',
  marginTop: '0.25rem',
}

export const searchItemStyle = {
  width: '110px',
  display: 'flex',
  alignItems: 'center',
}

export const confirmationStyles = StyleSheet.create({
  page: {
    display: 'flex',
    fontFamily: 'RobotoLight',
    fontSize: 12,
    padding: 30,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'RobotoMedium',
    paddingTop: 10,
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
    textAlign: 'justify',
  },
  boldText: {
    fontFamily: 'RobotoMedium',
  },
  underline: {
    textDecoration: 'underline',
    textDecorationColor: 'gray',
  },
  footer: {
    fontFamily: 'RobotoMedium',
    marginTop: 70,
  },
})

export const reportStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 10,
    fontFamily: 'RobotoLight',
    fontSize: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'flex',
    width: '100%',
    height: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  lastTableRow: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  tableCol: {
    width: '90px',
  },
  tableCell: {
    margin: 'auto',
    padding: 5,
  },
})
