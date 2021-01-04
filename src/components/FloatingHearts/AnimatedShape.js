import React from 'react';
import {Animated, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  shapeWrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

class AnimatedShape extends React.Component {
  static defaultProps = {
    onComplete: () => {},
  };

  constructor(props) {
    super(props);

    this._rendered = false;
    this._xAnimation = null;
    this._yAnimation = null;
    this._scaleAnimation = null;
    this._rotateAnimation = null;
    this._opacityAnimation = null;

    let {targetX} = this.props;
    if (Number.isInteger(targetX?.max) && Number.isInteger(targetX?.min)) {
      targetX = Math.random() * (targetX.max - targetX.min) + targetX.min;
    } else if (Number.isInteger(targetX)) {
      targetX = targetX;
    } else {
      throw new Error(
        'AnimatedShape prop targetX must be an object of {min: <int>, max: <int>} or single integer',
      );
    }
    this._targetX = targetX;

    this.state = {
      position: new Animated.Value(0),
      shapeHeight: null,
      enabled: false,
      animationReady: false,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2000,
      useNativeDriver: true,
      toValue: this.props.height * -1,
    }).start(this.props.onComplete);
  }

  _getAnimationStyle() {
    if (!this.state.animationReady) {
      return {opacity: 0};
    }

    return {
      transform: [
        {translateY: this.state.position},
        {translateX: this._xAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation},
      ],
      opacity: this._opacityAnimation,
    };
  }

  _handleOnLayout = ({nativeEvent}) => {
    if (this._rendered) {
      return null;
    }

    this._rendered = true;

    const height = Math.ceil(this.props.height);
    const negativeHeight = height * -1;
    const shapeHeight = nativeEvent.layout.height;

    this._yAnimation = this.state.position.interpolate({
      inputRange: [negativeHeight, 0],
      outputRange: [height, 0],
    });

    this._opacityAnimation = this._yAnimation.interpolate({
      inputRange: [0, height - shapeHeight],
      outputRange: [1, 0],
    });

    this._scaleAnimation = this._yAnimation.interpolate({
      inputRange: [0, 15, 30, height],
      outputRange: [0, 1.2, 1, 1],
    });

    this._xAnimation = this._yAnimation.interpolate({
      inputRange: [0, height],
      outputRange: [0, this._targetX],
    });

    this._rotateAnimation = this._yAnimation.interpolate({
      inputRange: [0, height / 4, height / 3, height / 2, height],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg'],
    });

    setTimeout(() => this.setState({animationReady: true}), 16);
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.shapeWrapper,
          this._getAnimationStyle(),
          this.props.style,
        ]}
        onLayout={this._handleOnLayout}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimatedShape;
