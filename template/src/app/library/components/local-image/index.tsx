import React from "react";
import { View } from "react-native";

import { Image, ImageStyle } from "expo-image";

import { images } from "@assets/image";

import { styles } from "./styles";
import { LocalImageProps } from "./type";

export const LocalImage = ({
  source,
  containerStyle,
  style: styleOverride,
  resizeMode = "cover",
}: LocalImageProps) => {
  // render
  return (
    <View style={containerStyle}>
      <Image
        style={[styles.img, styleOverride as ImageStyle]}
        resizeMode={resizeMode}
        source={images[source ?? "default"]}
      />
    </View>
  );
};
