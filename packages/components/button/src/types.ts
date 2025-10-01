import { LhSizeConst, LhTypesConst } from "types/components/const";



export interface LhButtonProps {

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