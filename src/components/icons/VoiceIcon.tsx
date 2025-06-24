import React from 'react'
import Svg, { Path } from 'react-native-svg'

import { IconProps } from '.'

export function VoiceIcon(props: IconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17 7V11M17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V11C7 12.3261 7.52678 13.5979 8.46447 14.5355C9.40215 15.4732 10.6739 16 12 16C13.3261 16 14.5979 15.4732 15.5355 14.5355C16.4732 13.5979 17 12.3261 17 11M17 7H14M17 11H14M20 11C20 13.1217 19.1571 15.1566 17.6569 16.6569C16.1566 18.1571 14.1217 19 12 19M12 19C9.87827 19 7.84344 18.1571 6.34315 16.6569C4.84285 15.1566 4 13.1217 4 11M12 19V22M12 22H15M12 22H9"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
