import type { LhLanguageConst, LhSizeConst, LhTypesConst } from 'constants';

type Types = typeof LhTypesConst[keyof typeof LhTypesConst]
type Languages = typeof LhLanguageConst[keyof typeof LhLanguageConst]
type Sizes = typeof LhSizeConst[keyof typeof LhSizeConst]
export type LhTypes<T extends (string | undefined) = undefined> = T extends string ? (Types | T) : Types;
export type LhSizes<T extends (string | undefined) = undefined> = T extends string ? (Sizes | T) : Sizes;
export type LhLanguages<T extends string | undefined = undefined> = T extends string ? (Languages | T) : Languages;


export interface LhBaseProps<T extends (string | undefined) = undefined, S extends (string | undefined) = undefined, L extends (string | undefined) = undefined> {
    type?: T extends string ? LhTypes<T> : LhTypes;
    size?: S extends string ? LhSizes<S> : LhSizes;
    disabled?: boolean;
    loading?: boolean;
    plain?: boolean;
    block?: boolean;
    icon?: string;
    nativeType?: string;
    href?: string;
    target?: string;
    title?: string;
    alt?: string;
    lang?: L extends string ? LhLanguages<L> : LhLanguages;
    langPath?: string;
    // 老年人专用
    old?: boolean;
}