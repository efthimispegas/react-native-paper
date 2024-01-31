import * as React from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';

import { getSelectionControlIOSColor } from './utils';
import { useInternalTheme } from '../../core/theming';
import type { $RemoveChildren, ThemeProp } from '../../types';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';

export type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Status of checkbox.
   */
  status: 'checked' | 'unchecked' | 'indeterminate';
  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Custom color for checkbox.
   */
  color?: string;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
  /**
   * style overrides to be applied on chcekbox.
   */
  styleOverrides?: Record<string, any>;
};

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/docs/components/TouchableRipple
 */
const CheckboxIOS = ({
  status,
  disabled,
  onPress,
  theme: themeOverrides,
  styleOverrides,
  testID,
  ...rest
}: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';

  const { checkedColor, rippleColor } = getSelectionControlIOSColor({
    theme,
    disabled,
    customColor: rest.color,
  });

  const icon = indeterminate ? 'minus' : 'check';
  const opacity = indeterminate || checked ? 1 : 0;

  return (
    <TouchableRipple
      {...rest}
      borderless
      rippleColor={rippleColor}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked }}
      accessibilityLiveRegion="polite"
      style={[styles.container, styleOverrides]}
      testID={testID}
      theme={theme}
    >
      <View style={{ opacity, margin: 2 }}>
        <MaterialCommunityIcon
          allowFontScaling={false}
          name={icon}
          size={16}
          color={checkedColor}
          direction="ltr"
        />
      </View>
    </TouchableRipple>
  );
};

CheckboxIOS.displayName = 'Checkbox.IOS';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 4,
    borderWidth: 2,
  },
});

export default CheckboxIOS;

// @component-docs ignore-next-line
export { CheckboxIOS };
