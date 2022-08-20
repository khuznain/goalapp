import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg viewBox='0 0 640 512' width={24} height={24} {...props}>
    <Path d='M480 0c17.7 0 32 14.33 32 32h112c8.8 0 16 7.16 16 16v128c0 8.8-7.2 16-16 16H512v320h-64V32c0-17.67 14.3-32 32-32zm-64 512H416.8 352c-17.7 0-32-14.3-32-32v-96c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.67 0-32-14.3-32-32V288H31.1c-12.49 0-24.469-8.3-29.115-20.9-4.646-12.6-.98-26.7 9.185-35.4l224.03-192c12-10.27 29.6-10.27 41.6 0L416 159v353z' />
  </Svg>
);

export default SvgComponent;
