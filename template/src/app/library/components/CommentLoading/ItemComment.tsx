import {sharedTiming, useInterpolate} from '@animated';
import React, {memo, useEffect, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';

import {Spacer} from '../Spacer/Spacer';

import {
  DELAY_MS,
  DURATION,
  MAX_HEIGHT_ITEM,
  MAX_WIDTH_ITEM,
  MIN_HEIGHT_ITEM,
  MIN_WIDTH_ITEM,
  SIZE_AVATAR,
} from './constants';
import {ItemCommentProps} from './type';

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    flexDirection: 'row',
  },
});

const ItemCommentComponent = ({index, overlayColor}: ItemCommentProps) => {
  // state
  const widthComment = useMemo<number>(
    () => MIN_WIDTH_ITEM + Math.random() * (MAX_WIDTH_ITEM - MIN_WIDTH_ITEM),
    [],
  );

  const heightComment = useMemo<number>(
    () => MIN_HEIGHT_ITEM + Math.random() * (MAX_HEIGHT_ITEM - MIN_HEIGHT_ITEM),
    [],
  );
  const progress = useSharedValue(0);
  const translateY = useInterpolate(progress, [0, 1], [MAX_HEIGHT_ITEM, 0]);
  const opacity = useInterpolate(progress, [0, 1], [0, 1]);

  // reanimated style
  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  // style
  const bubble = useMemo<ViewStyle>(
    () => ({
      width: widthComment,
      height: heightComment,
      borderRadius: 15,
      backgroundColor: overlayColor,
    }),
    [heightComment, overlayColor, widthComment],
  );

  const avatar = useMemo<ViewStyle>(
    () => ({
      width: SIZE_AVATAR,
      height: SIZE_AVATAR,
      borderRadius: SIZE_AVATAR / 2,
      backgroundColor: overlayColor,
    }),
    [overlayColor],
  );

  // effect
  useEffect(() => {
    progress.value = withDelay(
      index * DELAY_MS,
      sharedTiming(1, {duration: DURATION}),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <Animated.View style={[wrapStyle]}>
      <View style={[styles.row]}>
        <View style={[avatar]} />
        <Spacer width={10} />
        <View style={[bubble]} />
      </View>
    </Animated.View>
  );
};

export const ItemComment = memo(ItemCommentComponent, isEqual);
