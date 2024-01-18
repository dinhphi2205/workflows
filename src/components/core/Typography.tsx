import React from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';

const TypoStyle = {
  Title: {
    fontSize: 24,
    lineHeight: 28,
  },
  SubTitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  Body: {
    fontSize: 16,
    lineHeight: 20,
  },
  Caption: {
    fontSize: 14,
    lineHeight: 22,
  },
  Small: {
    fontSize: 12,
    lineHeight: 18,
  },
  Tiny: {
    fontSize: 10,
    lineHeight: 16,
  },
};
interface Props extends TextProps {
  type: keyof typeof TypoStyle;
}
export const Text = ({type, style, ...rest}: Props) => {
  const customStyle = TypoStyle[type] as TextStyle;
  return <RNText style={[customStyle, style]} {...rest} />;
};
