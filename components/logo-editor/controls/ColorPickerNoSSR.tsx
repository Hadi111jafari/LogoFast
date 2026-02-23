import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';

const ColorPicker = dynamic(
  () => import('react-best-gradient-color-picker'),
  { ssr: false }
);

// Forward all props
type ColorPickerProps = ComponentProps<typeof ColorPicker>;

export default function ColorPickerNoSSR({
  disableDarkMode = true,
  style,
  ...props
}: ColorPickerProps) {
  return (
    <ColorPicker
      {...props}
      disableDarkMode={disableDarkMode}
      style={{
        body: {
          background: 'rgb(255, 255, 255)',
        },
        ...style,
      }}
    />
  );
}
