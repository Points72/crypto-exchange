declare module 'lucide-react/dist/esm/icons' {
  import { ComponentType } from 'react';

  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
  }

  export const Activity: ComponentType<IconProps>;
  export const Search: ComponentType<IconProps>;
  export const ArrowRight: ComponentType<IconProps>;
  export const Bot: ComponentType<IconProps>;
} 