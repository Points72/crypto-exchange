declare module '@/components/ui/button' {
  import { ButtonHTMLAttributes } from 'react'
  import { VariantProps } from 'class-variance-authority'

  export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean
  }

  export const Button: React.ForwardRefExoticComponent<ButtonProps>
  export const buttonVariants: (props?: ButtonProps) => string
}

declare module '@/components/ui/card' {
  import { HTMLAttributes } from 'react'

  export const Card: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement>>
  export const CardHeader: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement>>
  export const CardFooter: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement>>
  export const CardTitle: React.ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement>>
  export const CardDescription: React.ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement>>
  export const CardContent: React.ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement>>
}
