import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import SlideItem from './Slideitem';

const Slider = ({ Images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };



  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={Images}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}

        viewabilityConfig={viewabilityConfig}
      />
     
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});