import { StyleSheet } from '@react-pdf/renderer'

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

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    fontFamily: 'RobotoLight',
    fontSize: 12,
    padding: 30,
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
    textAlign: 'justify',
  },
  boldText: {
    fontFamily: 'RobotoMedium',
  },
  footer: {
    fontFamily: 'RobotoMedium',
    marginTop: 70,
  },
})
