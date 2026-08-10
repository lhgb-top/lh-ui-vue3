import { LhSizeConst, LhTypesConst } from "constants";

export interface LhButtonProps {
  type?: LhButtonType;
  /** 尺寸，可选。若不传则从 ConfigProvider 继承 */
  size?: LhButtonSize;
  loading?: boolean;
  disabled?: boolean;
  plain?: boolean;
  block?: boolean;
  round?: boolean;
  circle?: boolean;
  icon?: string;
  nativeType?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
}

export const LhButtonTypeConst = {
  ...LhTypesConst,
  default: 'default',
  primary: 'primary',
} as const;

export const LhButtonSizeConst = {
  ...LhSizeConst,
} as const;

export type LhButtonType = typeof LhButtonTypeConst[keyof typeof LhButtonTypeConst];
export type LhButtonSize = typeof LhButtonSizeConst[keyof typeof LhButtonSizeConst];
