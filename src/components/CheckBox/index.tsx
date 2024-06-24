import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, Image, View } from 'react-native';
import { colors } from '../../styles/colors';
import { CHECKBOX_SIZE } from '../../constants';
import type { CheckboxProps } from './checkbox.types';

const CheckBox = ({
  label,
  value,
  disabled,
  primaryColor,
  checkboxSize,
  checkboxStyle,
  checkboxLabelStyle,
  checkboxComponentStyles,
  checkboxComponent,
  checkboxControls,
  onChange,
}: CheckboxProps) => {
  const fillColor = {
    backgroundColor: disabled
      ? '#d3d3d3'
      : value
        ? checkboxControls?.checkboxStyle?.backgroundColor ||
          checkboxComponentStyles?.checkboxStyle?.backgroundColor ||
          checkboxStyle?.backgroundColor ||
          primaryColor ||
          'green'
        : 'white',
    borderColor: disabled
      ? colors.disabled
      : checkboxControls?.checkboxStyle?.borderColor ||
        checkboxComponentStyles?.checkboxStyle?.borderColor ||
        checkboxStyle?.borderColor ||
        styles.checkbox.borderColor,
  };

  const renderLabel = useCallback(() => {
    if (label && typeof label === 'string' && label !== '') {
      return (
        <Text
          style={[
            checkboxControls?.checkboxLabelStyle ||
              checkboxComponentStyles?.checkboxLabelStyle ||
              checkboxLabelStyle,
            styles.labelStyle,
          ]}
        >
          {label}
        </Text>
      );
    } else if (label && typeof label !== 'string') return label;

    return null;
  }, [label]);

  return (
    <Pressable
      onPress={onChange ? () => onChange(!value) : null}
      style={[styles.checkboxContainer]}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          checkboxControls?.checkboxStyle ||
            checkboxComponentStyles?.checkboxStyle ||
            checkboxStyle,
          fillColor,
        ]}
      >
        {checkboxControls?.checkboxComponent || checkboxComponent || (
          <Image
            source={require('../../asset/check.png')}
            style={[
              {
                height:
                  checkboxControls?.checkboxSize ||
                  checkboxComponentStyles?.checkboxSize ||
                  checkboxSize ||
                  CHECKBOX_SIZE,
                width:
                  checkboxControls?.checkboxSize ||
                  checkboxComponentStyles?.checkboxSize ||
                  checkboxSize ||
                  CHECKBOX_SIZE,
              },
            ]}
          />
        )}
      </View>

      {renderLabel()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  checkbox: {
    padding: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: 'black',
  },
  labelStyle: { marginLeft: 10 },
});

export default CheckBox;