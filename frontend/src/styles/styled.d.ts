import { ColorTypes, FontSizeTypes, FontWeightTypes } from './theme';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes;
    fontSize: FontSizeTypes;
    fontWeight: FontWeightTypes;
  }
}
