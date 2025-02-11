/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react' {
  // Базовые типы React
  export type ElementType = keyof JSX.IntrinsicElements | ((props: any) => ReactElement | null);
  export type ElementRef<T extends ElementType> = T extends new (...args: any) => any 
    ? InstanceType<T> 
    : T extends (...args: any) => any 
    ? ReturnType<T> extends { current: infer R } 
      ? R 
      : never 
    : T extends keyof JSX.IntrinsicElements 
    ? JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<React.HTMLAttributes<infer R>, any> 
      ? R 
      : never 
    : never;

  export type ComponentProps<T extends ElementType> = T extends new (props: infer P) => any 
    ? P 
    : T extends (...args: any) => any 
    ? Parameters<T>[0] 
    : T extends keyof JSX.IntrinsicElements 
    ? JSX.IntrinsicElements[T] 
    : never;

  export type ComponentPropsWithoutRef<T extends ElementType> = 
    T extends React.ComponentType<infer P> 
      ? P 
      : ComponentProps<T>;

  export type ComponentPropsWithRef<T extends ElementType> = 
    T extends React.ComponentType<infer P> 
      ? P & { ref?: React.Ref<ElementRef<T>> } 
      : ComponentProps<T>;

  export interface ForwardRefRenderFunction<T, P = {}> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
    displayName?: string;
  }

  export function forwardRef<T, P = {}>(
    render: ForwardRefRenderFunction<T, P>
  ): React.ForwardRefExoticComponent<P & { ref?: React.Ref<T> }>;

  export interface ForwardRefExoticComponent<P> extends React.FC<P> {
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  export type Ref<T> = React.RefCallback<T> | React.RefObject<T> | null;

  export type RefCallback<T> = (instance: T | null) => void;

  export interface RefObject<T> {
    readonly current: T | null;
  }

  export type ReactNode = 
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactNodeArray;

  export type ReactElement = {
    type: any;
    props: any;
    key: string | null;
  };

  export type ReactNodeArray = ReactNode[];

  export * from 'react';
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  export function useRef<T>(initialValue: T | null): { current: T | null };
  export function createContext<T>(defaultValue: T): React.Context<T>;
  export function useContext<T>(context: React.Context<T>): T;
  export function memo<T extends React.ComponentType<any>>(
    Component: T,
    propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean
  ): T;

  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: 'submit' | 'reset' | 'button';
    value?: string | ReadonlyArray<string> | number;
  }

  export function useId(): string;

  export interface AriaAttributes {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean;
    // ... другие aria-атрибуты по необходимости
  }

  export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    onBlur?: (event: FocusEvent<T>) => void;
    onClick?: (event: MouseEvent<T>) => void;
    onFocus?: (event: FocusEvent<T>) => void;
    onKeyDown?: (event: KeyboardEvent<T>) => void;
    onKeyUp?: (event: KeyboardEvent<T>) => void;
    // ... другие обработчики событий по необходимости
  }
}

declare module 'lucide-react' {
  import { FC } from 'react';
  
  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
  }

  export const Activity: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const Bot: FC<IconProps>;
  export const ArrowDownUp: FC<IconProps>;
  export const ArrowLeftRight: FC<IconProps>;
  export const BarChart2: FC<IconProps>;
  export const Droplet: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const BracketsIcon: FC<IconProps>;
  export const Send: FC<IconProps>;
  export const CreditCard: FC<IconProps>;
  export const DollarSign: FC<IconProps>;
  export const X: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const Circle: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const MoreHorizontal: FC<IconProps>;
  export const GripVertical: FC<IconProps>;
  export const Dot: FC<IconProps>;
}

declare module 'framer-motion' {
  export const motion: {
    div: any;
    path: any;
    svg: any;
  };
  export const useAnimation: any;
  export const useMotionValue: any;
  export const useTransform: any;
}

declare module 'recharts' {
  export const AreaChart: React.FC<any>;
  export const Area: React.FC<any>;
  export const XAxis: React.FC<any>;
  export const YAxis: React.FC<any>;
  export const Tooltip: React.FC<any>;
  export const ResponsiveContainer: React.FC<any>;
}

declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    attribute?: string;
    value?: { [key: string]: string };
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    themes?: string[];
    forcedTheme?: string;
  }
  
  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    themes: string[];
  };
  
  export const ThemeProvider: React.FC<ThemeProviderProps>;
}

declare module 'lightweight-charts' {
  export interface ChartOptions {
    width?: number;
    height?: number;
    layout?: {
      background?: { color?: string };
      textColor?: string;
    };
    grid?: {
      vertLines?: { color?: string };
      horzLines?: { color?: string };
    };
    crosshair?: {
      mode?: number;
      vertLine?: {
        color?: string;
        width?: number;
        style?: number;
        visible?: boolean;
        labelVisible?: boolean;
      };
      horzLine?: {
        color?: string;
        width?: number;
        style?: number;
        visible?: boolean;
        labelVisible?: boolean;
      };
    };
  }

  export interface CandlestickSeriesOptions {
    upColor?: string;
    downColor?: string;
    borderVisible?: boolean;
    wickUpColor?: string;
    wickDownColor?: string;
  }

  export interface IChartApi {
    applyOptions(options: ChartOptions): void;
    resize(width: number, height: number): void;
    remove(): void;
    addCandlestickSeries(options?: CandlestickSeriesOptions): ICandlestickSeriesApi;
  }

  export interface ICandlestickSeriesApi {
    setData(data: Array<{
      time: string | number;
      open: number;
      high: number;
      low: number;
      close: number;
    }>): void;
  }

  export function createChart(
    container: HTMLElement,
    options?: ChartOptions
  ): IChartApi;
}

declare module '@radix-ui/react-accordion' {
  import * as React from 'react';

  export interface AccordionSingleProps extends React.ComponentPropsWithoutRef<'div'> {
    type?: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
  }

  export interface AccordionMultipleProps extends React.ComponentPropsWithoutRef<'div'> {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
  }

  export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

  export const Root: React.FC<AccordionProps>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Header: React.FC<React.ComponentPropsWithoutRef<'h3'>>;
}

declare module '@radix-ui/react-alert-dialog' {
  import * as React from 'react';

  export interface AlertDialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  export const Root: React.FC<AlertDialogProps>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Action: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Cancel: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ container?: HTMLElement; children: React.ReactNode }>;
  export const Overlay: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Title: React.FC<React.ComponentPropsWithoutRef<'h2'>>;
  export const Description: React.FC<React.ComponentPropsWithoutRef<'p'>>;
}

declare module 'input-otp' {
  export const useOTPInput: () => any;
  export const OTPInput: React.FC<any>;
  export const OTPInputContext: React.Context<any>;
}

declare module 'vaul' {
  export const Drawer: React.FC<any>;
  export const DrawerContent: React.FC<any>;
  export const DrawerTrigger: React.FC<any>;
  export const DrawerClose: React.FC<any>;
}

declare module 'react-resizable-panels' {
  export const Panel: React.FC<any>;
  export const PanelGroup: React.FC<any>;
  export const PanelResizeHandle: React.FC<any>;
}

declare module 'class-variance-authority' {
  export function cva(base: string, config?: any): (...args: any[]) => string;
  export type VariantProps<T extends (...args: any) => any> = {
    [K in keyof Parameters<T>[0]]: Parameters<T>[0][K];
  };
}

declare module 'tailwind-merge' {
  export function twMerge(...classLists: string[]): string;
}

declare module 'clsx' {
  export default function clsx(...args: any[]): string;
}

declare module '@radix-ui/react-dropdown-menu' {
  import * as React from 'react';

  export const Root: React.FC<{ children: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const CheckboxItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { checked?: boolean }>;
  export const RadioItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
  export const Label: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubTrigger: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
}

declare module '@radix-ui/react-hover-card' {
  import * as React from 'react';

  export const Root: React.FC<{ children: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-label' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'label'>>;
}

declare module '@radix-ui/react-menubar' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Menu: React.FC<{ children: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubMenu: React.FC<{ children: React.ReactNode }>;
  export const SubTrigger: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
}

declare module '@radix-ui/react-navigation-menu' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'nav'>>;
  export const List: React.FC<React.ComponentPropsWithoutRef<'ul'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'li'>>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Link: React.FC<React.ComponentPropsWithoutRef<'a'>>;
  export const Viewport: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-popover' {
  import * as React from 'react';

  export const Root: React.FC<{ children: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
}

declare module '@radix-ui/react-progress' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: number; max?: number }>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-radio-group' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: string; onValueChange?: (value: string) => void }>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'button'> & { value: string }>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-scroll-area' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Viewport: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Scrollbar: React.FC<React.ComponentPropsWithoutRef<'div'> & { orientation?: 'vertical' | 'horizontal' }>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Corner: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-aspect-ratio' {
  import * as React from 'react';

  interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
    ratio?: number;
  }

  export const Root: React.FC<AspectRatioProps>;
}

declare module '@radix-ui/react-avatar' {
  import * as React from 'react';

  interface AvatarProps extends React.ComponentPropsWithoutRef<'span'> {
    asChild?: boolean;
  }

  interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
    asChild?: boolean;
  }

  interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<'span'> {
    asChild?: boolean;
    delayMs?: number;
  }

  export const Root: React.FC<AvatarProps>;
  export const Image: React.FC<AvatarImageProps>;
  export const Fallback: React.FC<AvatarFallbackProps>;
}

declare module 'react-day-picker' {
  import * as React from 'react';

  export interface DayPickerProps {
    mode?: 'single' | 'multiple' | 'range';
    selected?: Date | Date[] | { from: Date; to: Date };
    onSelect?: (date: Date | undefined) => void;
    disabled?: Date[] | { from: Date; to: Date }[];
    hidden?: Date[] | { from: Date; to: Date }[];
    modifiers?: Record<string, Date[] | { from: Date; to: Date }[]>;
    modifiersStyles?: Record<string, React.CSSProperties>;
    modifiersClassNames?: Record<string, string>;
    showOutsideDays?: boolean;
    defaultMonth?: Date;
    fromMonth?: Date;
    toMonth?: Date;
    month?: Date;
    onMonthChange?: (month: Date) => void;
    numberOfMonths?: number;
    pagedNavigation?: boolean;
    reverseMonths?: boolean;
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    classNames?: {
      root?: string;
      wrapper?: string;
      months?: string;
      month?: string;
      table?: string;
      head?: string;
      headRow?: string;
      headCell?: string;
      body?: string;
      row?: string;
      cell?: string;
      day?: string;
      footer?: string;
      nav?: string;
      caption?: string;
    };
    components?: {
      IconLeft?: React.ComponentType;
      IconRight?: React.ComponentType;
    };
    footer?: React.ReactNode;
  }

  export const DayPicker: React.FC<DayPickerProps>;
}

declare module '@radix-ui/react-checkbox' {
  import * as React from 'react';

  export interface CheckboxProps extends React.ComponentPropsWithoutRef<'button'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
  }

  export const Root: React.FC<CheckboxProps>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-dialog' {
  import * as React from 'react';

  export interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  export const Root: React.FC<DialogProps>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
  export const Overlay: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Title: React.FC<React.ComponentPropsWithoutRef<'h2'>>;
  export const Description: React.FC<React.ComponentPropsWithoutRef<'p'>>;
  export const Close: React.FC<React.ComponentPropsWithoutRef<'button'>>;
}

declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export interface SelectProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    required?: boolean;
  }

  export const Root: React.FC<SelectProps>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Value: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Viewport: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const ItemText: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const ItemIndicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const ScrollUpButton: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const ScrollDownButton: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Group: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Label: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-toast' {
  import * as React from 'react';

  export interface ToastProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    duration?: number;
  }

  export const Provider: React.FC<{ children: React.ReactNode; duration?: number }>;
  export const Root: React.FC<ToastProps>;
  export const Title: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Description: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Action: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Close: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Viewport: React.FC<React.ComponentPropsWithoutRef<'ol'>>;
}

declare module '@radix-ui/react-tooltip' {
  import * as React from 'react';

  export interface TooltipProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
  }

  export const Provider: React.FC<{ children: React.ReactNode; delayDuration?: number }>;
  export const Root: React.FC<TooltipProps>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Arrow: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

declare module 'sonner' {
  export interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  }

  export function toast(props: ToastProps | string): void;
  export const Toaster: React.FC<{
    position?: ToastProps['position'];
    duration?: number;
    theme?: 'light' | 'dark';
  }>;
}

declare module '@radix-ui/react-slider' {
  import * as React from 'react';

  export interface SliderProps extends React.ComponentPropsWithoutRef<'span'> {
    defaultValue?: number[];
    value?: number[];
    onValueChange?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    orientation?: 'horizontal' | 'vertical';
    disabled?: boolean;
  }

  export const Root: React.FC<SliderProps>;
  export const Track: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Range: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-switch' {
  import * as React from 'react';

  export interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
  }

  export const Root: React.FC<SwitchProps>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-tabs' {
  import * as React from 'react';

  export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    activationMode?: 'automatic' | 'manual';
  }

  export const Root: React.FC<TabsProps>;
  export const List: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'> & { value: string }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
}

declare module '@radix-ui/react-toggle' {
  import * as React from 'react';

  export interface ToggleProps extends React.ComponentPropsWithoutRef<'button'> {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }

  export const Root: React.FC<ToggleProps>;
}

declare module '@radix-ui/react-separator' {
  import * as React from 'react';

  export interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
  }

  export const Root: React.FC<SeparatorProps>;
}

declare module '@radix-ui/react-slot' {
  import * as React from 'react';

  export interface SlotProps extends React.ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode;
  }

  export const Slot: React.FC<SlotProps>;
}

declare module '@radix-ui/react-collapsible' {
  import * as React from 'react';

  export interface CollapsibleProps extends React.ComponentPropsWithoutRef<'div'> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
  }

  export const Root: React.FC<CollapsibleProps>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-context-menu' {
  import * as React from 'react';

  export const Root: React.FC<{ children: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Portal: React.FC<{ children: React.ReactNode }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Group: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Label: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const CheckboxItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { checked?: boolean }>;
  export const RadioGroup: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const RadioItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
  export const ItemIndicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Sub: React.FC<{ children: React.ReactNode }>;
  export const SubTrigger: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
} 