import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import AnimatedShape from './AnimatedShape';
import Icon from '../Icon';
import Color from 'color';
import colors from '../../constants/colors';

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class FloatingHearts extends React.Component {
  static defaultProps = {
    size: {max: 20, min: 40},
    color: [
      Color.rgb(colors.RED).alpha(1).toString(),
      // Color.rgb(colors.orange).alpha(0.9).toString(),
      // Color.rgb(colors.khaki).alpha(0.9).toString(),
      // Color.rgb(colors.lightseagreen).alpha(0.9).toString(),
      // Color.rgb(colors.dodgerblue).alpha(0.9).toString(),
      // Color.rgb(colors.dimgray).alpha(0.9).toString(),
    ],
    originX: 0,
    targetX: {max: 0, min: 0},
    onComplete: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      hearts: [], // { id, left }
      height: null,
    };
  }

  _handleOnLayout = ({nativeEvent}) => {
    const height = nativeEvent.layout.height;
    this.setState({height});
  };

  _createHeart(id) {
    let left = this.props.originX;
    if (Number.isInteger(left)) {
      left = left;
    } else if (Number.isInteger(left?.max) && Number.isInteger(left?.min)) {
      left = getRandomNumber(left.min, left.max);
    } else {
      throw new Error(
        'FloatingHearts prop originX must be an object of {min: <int>, max: <int>} or single integer',
      );
    }

    return {
      id,
      left,
    };
  }

  _removeHeart(id) {
    this.setState(
      (prevState) => ({
        hearts: prevState.hearts.filter((heart) => heart.id !== id),
      }),
      () => {
        if (!this.state.hearts.length) {
          this.props.onComplete();
        }
      },
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const oldCount = prevProps.count;
    const newCount = this.props.count;
    const numHearts = newCount - oldCount;

    if (numHearts <= 0) {
      return;
    }

    const newHearts = [];
    for (let i = 0; i < numHearts; i++) {
      newHearts.push(this._createHeart(oldCount + i));
    }

    this.setState((prevState) => ({
      hearts: [...prevState.hearts, ...newHearts],
    }));
  }

  render() {
    const {height, hearts} = this.state;
    const {
      originX,
      color,
      size,
      renderCustomShape,
      targetX,
      style,
    } = this.props;
    const isReady = height !== null;

    const heartProps = {
      color,
      size,
    };

    return (
      <View
        style={[styles.container, style]}
        onLayout={this._handleOnLayout}
        pointerEvents="none">
        {isReady &&
          hearts.map(({id, left}) => (
            <AnimatedShape
              key={id}
              height={height}
              style={{...(originX && {left})}}
              targetX={targetX}
              onComplete={this._removeHeart.bind(this, id)}>
              {renderCustomShape ? (
                renderCustomShape(id)
              ) : (
                <HeartShape {...heartProps} />
              )}
            </AnimatedShape>
          ))}
      </View>
    );
  }
}

const HeartShape = ({color = 'red', size = 30}) => {
  const memoisedColor = React.useMemo(
    () => {
      if (Array.isArray(color)) {
        return color[Math.floor(Math.random() * color.length)];
      }
      if (typeof color === 'string' || color instanceof String) {
        return color;
      }
      throw new Error(
        `HeartShape color prop must be either an array of color strings or single color string`,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const memoisedSize = React.useMemo(
    () => {
      if (Number.isInteger(size?.max) && Number.isInteger(size?.min)) {
        return Math.random() * (size.max - size.min) + size.min;
      }
      if (Number.isInteger(size)) {
        return size;
      }
      throw new Error(
        `HeartShape size prop must be either an object of {min: <int>, max: <int>} or single integer`,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <Icon name="heart" color={memoisedColor} size={memoisedSize} />;
};

export default FloatingHearts;
