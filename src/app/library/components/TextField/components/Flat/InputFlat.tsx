/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import {StyleSheet, TextInput, LayoutChangeEvent} from "react-native";
import Animated, {interpolateNode} from "react-native-reanimated";
import {useTimingTransition} from "@animated";
import {useTranslation} from "react-i18next";
import {enhance, onCheckType} from "@common";
import {Block} from "@library/components/Block/Block";

import {InputFlatProps} from "./InputFlat.props";

const VERTICAL_PADDING = 5;
const UN_ACTIVE_COLOR = "rgb(159,152,146)";
const ACTIVE_COLOR = "rgb(0,87,231)";
const ERROR_COLOR = "rgb(214,45,32)";

const styles = StyleSheet.create({
  container: {
    paddingVertical: VERTICAL_PADDING,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "gray",
    width: "100%",
    justifyContent: "center",
    position: "relative",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 0,
    marginTop: 10,
  },
  text: {
    position: "absolute",
    alignSelf: "flex-start",
    zIndex: 2,
  },
  wrapLabel: {
    position: "absolute",
    left: 0,
  },
});

export const InputFlat = forwardRef<any, InputFlatProps>((props, ref) => {
  const [t] = useTranslation();
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    placeholderColor,
    onTextChange,
    onSetValueHookForm,
    trigger,
    nameTrigger,
    inputStyle = {},
    name = "",
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    disabled = false,
    error = undefined,
    rightChildren = undefined,
    containerStyle = {},
    ...rest
  } = props;
  const [sizeContainer, setSizeContainer] = useState({height: 0});
  const [sizeText, setSizeText] = useState({height: 0});
  const [focused, setFocused] = useState(false);
  const [restored, setRestored] = useState(false);
  const [value, setValue] = useState("");

  const progress = useTimingTransition(focused || value.length > 0, {
    duration: 150,
  });

  const top = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [
      sizeContainer.height / 2 - sizeText.height / 2 - VERTICAL_PADDING / 4,
      0,
    ],
  });

  const fontLabel = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [14, 12],
  });

  const labelColor = useCallback(() => {
    if (disabled) {
      return disabledLabelColor;
    }
    if (error) {
      return errorLabelColor;
    }
    if (focused) {
      return activeTintLabelColor;
    }
    return unActiveTintLabelColor;
  }, [
    disabled,
    error,
    focused,
    unActiveTintLabelColor,
    disabledLabelColor,
    errorLabelColor,
    activeTintLabelColor,
  ]);

  const borderColor = useCallback(() => {
    if (disabled) {
      return disabledBorderColor;
    }
    if (error) {
      return errorBorderColor;
    }
    if (focused) {
      return activeTintBorderColor;
    }
    return unActiveTintBorderColor;
  }, [
    disabled,
    error,
    focused,
    unActiveTintBorderColor,
    disabledBorderColor,
    errorBorderColor,
    activeTintBorderColor,
  ]);

  const _onLayoutContainer = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeContainer({...sizeContainer, height: e.nativeEvent.layout.height});
    },
    [sizeContainer],
  );

  const onLayoutText = useCallback(
    (e: LayoutChangeEvent) => {
      setSizeText({...sizeText, height: e.nativeEvent.layout.height});
    },
    [sizeText],
  );

  const _onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const _onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const _onChangeText = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    if (onTextChange && onCheckType(onTextChange, "function")) {
      onTextChange(name, value);
    }
    if (onSetValueHookForm && onCheckType(onSetValueHookForm, "function")) {
      onSetValueHookForm(name, value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    if (
      trigger &&
      onCheckType(trigger, "function") &&
      nameTrigger &&
      onCheckType(nameTrigger, "string")
    ) {
      trigger(nameTrigger);
    }
  }, [name, nameTrigger, onSetValueHookForm, onTextChange, trigger, value]);

  useEffect(() => {
    if (typeof defaultValue === "string" && !restored) {
      setValue(defaultValue);
      setRestored(true);
    }
  }, [defaultValue, restored]);
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t],
  );
  const placeHolder = useMemo(
    () => (placeholderTx && t(placeholderTx)) || placeholder || "",
    [placeholder, placeholderTx, t],
  );
  const inputSty = useMemo(() => enhance([styles.input, inputStyle]), [
    inputStyle,
  ]);
  const containerSty = useMemo(
    () => enhance([styles.container, containerStyle]),
    [containerStyle],
  );

  return (
    <Animated.View
      onLayout={_onLayoutContainer}
      style={[containerSty, {borderColor: borderColor()}]}>
      <Block direction={"row"}>
        <TextInput
          defaultValue={defaultValue ?? ""}
          autoCorrect={false}
          placeholder={focused === true ? placeHolder : ""}
          placeholderTextColor={placeholderColor ?? undefined}
          underlineColorAndroid={"transparent"}
          clearButtonMode={"always"}
          editable={!disabled}
          onChangeText={_onChangeText}
          onFocus={_onFocus}
          onBlur={_onBlur}
          style={inputSty}
          ref={ref}
          {...rest}
        />
        {rightChildren}
      </Block>
      {labelText && (
        <Animated.View pointerEvents={"none"} style={[styles.wrapLabel, {top}]}>
          <Animated.Text
            onLayout={onLayoutText}
            style={[styles.text, {color: labelColor(), fontSize: fontLabel}]}>
            {labelText ?? ""}
          </Animated.Text>
        </Animated.View>
      )}
    </Animated.View>
  );
});
