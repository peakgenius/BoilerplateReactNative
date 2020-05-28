import { FlatListProps, TextStyle, ViewStyle, StyleProp } from "react-native";


export interface SelectOption {
    /**
     * (Required)Text to display
     */
    text: string;

    /**
     * Item to pass to function when click one item
     * @default undefined
     */
    itemCallback?: any;
}


export interface SelectProps extends FlatListProps<SelectOption> {
    /**
     * Call back when click one item
     * @default undefined
     */
    onPress?: (item: SelectOption, index: number) => void;

    /**
     * List option of drop down
     */
    data: SelectOption[];

    /**
     * Default item select mapping with text property of data
     * @default undefined
     */
    defaultSelect?: string;

    /**
     * Overwrite render drop down item
     * @default undefined
     */
    renderItem?: any;

    /**
     * Backdrop color when modal show
     * @default undefined
     */
    backDropColor?: string;

    /**
     * Children right of option
     * @default undefined
     */
    rightChildren?: React.ReactNode;

    /**
     * Overwrite text item
     * @default undefined
     */
    customItem?: (item: SelectOption, index: number) => React.ReactNode;

    /**
     * Overwrite text item style 
     * @default undefined
     */
    textItemStyle?: StyleProp<TextStyle>;

    /**
     * enable to padding bottom inset on iphone
     * @default undefined
     */
    useBottomInset?: boolean;
}
export interface SelectItemProps {

    /**
     * Data item
     */
    item: SelectOption;

    /**
     * Index of item
     */
    index: number;

    /**
     * On item press
     */
    onPress: (item: SelectOption, index: number) => void;

    /**
     * Overwrite text item
     */
    customItem?: (item: SelectOption, index: number) => React.ReactNode;

    /**
     * Overwrite item text style
     * @default undefined
     */
    textItemStyle?: StyleProp<TextStyle>;
}