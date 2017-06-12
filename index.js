import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

export const deviceHeight = Dimensions.get('window').height

const POSITION_OPTIONS = ['bottom', 'center', 'middle', 'top']

export default class Modal extends Component {
  static propTypes = {
    onDone: PropTypes.func,
    onMiddlePress: PropTypes.func,
    position: PropTypes.oneOf(POSITION_OPTIONS),
    showUnderlay: PropTypes.bool,
    renderButtons: PropTypes.bool,
    showDone: PropTypes.bool,
    horizontalInset: PropTypes.number,
    navBarHeight: PropTypes.number,
    verticalOffset: PropTypes.number,
    cancelText: PropTypes.string,
    doneText: PropTypes.string,
    middleText: PropTypes.string,
    modalStyles: PropTypes.object,
  }

  static defaultProps = {
    onDone: () => {},
    onMiddlePress: () => {},
    position: 'bottom',
    showUnderlay: true,
    renderButtons: true,
    showDone: true,
    horizontalInset: 0,
    navBarHeight: 0,
    verticalOffset: 0,
    cancelText: 'Cancel',
    doneText: 'Done',
    modalStyles: {}
  }

  constructor (props) {
    super (props)

    this.state = {
      offset: new Animated.Value(0),
      underlayOpacity: new Animated.Value(0),
      contentHeight: null
    }

    this._underlayColor = this.props.showUnderlay ? '#000000' : 'rgba(0,0,0,0)'
    this._duration = 300
  }

  render () {
    const {underlayOpacity, offset} = this.state

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: offset}],
            height: deviceHeight + this.state.contentHeight
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={this._closeModal}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: this._underlayColor,
              opacity: this.state.underlayOpacity,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={[styles.modalInner, { backgroundColor: '#ffffff' }, this.props.modalStyles]} onLayout={this._onContentLayout}>
          {this.props.renderButtons &&
            <View style={styles.btnsWrapper}>
              <TouchableOpacity onPress={this._closeModal}>
                <Text style={styles.cancelText}>{this.props.cancelText}</Text>
              </TouchableOpacity>
              {this.props.middleText &&
                <TouchableOpacity onPress={this._handleMiddleBtn}>
                  <Text style={styles.doneText}>{this.props.middleText}</Text>
                </TouchableOpacity>
              }
              {this.props.showDone &&
                <TouchableOpacity onPress={this._handleDone}>
                  <Text style={styles.doneText}>{this.props.doneText}</Text>
                </TouchableOpacity>
              }
            </View>
          }
          { this.props.children }
        </View>
      </Animated.View>
    )
  }

  _onContentLayout = (e) => {
    if (!!this.state.contentHeight) return

    this.setState({contentHeight: e.nativeEvent.layout.height}, this._reveal)
  }

  _reveal = () => this._toggleVisibility(-this.state.contentHeight, 0.5)

  _toggleVisibility = (offsetVal, opacityVal, callback = () => {}) => {
    Animated.parallel([
      Animated.timing(this.state.offset, {
        duration: this._duration,
        toValue: offsetVal
      }),
      Animated.timing(this.state.underlayOpacity, {
        duration: this._duration,
        toValue: opacityVal
      })
    ]).start(callback)
  }


  _closeModal = () => this._toggleVisibility(0, 0, Actions.pop)

  _handleDone = () => {
    this.props.onDone()
    this._closeModal()
  }

  _handleMiddleBtn = () => {
    this.props.onMiddlePress()
    this._closeModal()
  }
}
