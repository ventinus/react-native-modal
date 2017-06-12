import {StyleSheet, Platform, Dimensions} from 'react-native'
import {deviceHeight} from './index'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  modalInner: {
    maxHeight: deviceHeight - Platform.select({ios: 22, android: 0}),
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cancelText: {
    color: '#666666',
    padding: 10
  },
  doneText: {
    color: '#46cf98',
    padding: 10
  }
})
