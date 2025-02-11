"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  children?: React.ReactNode
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    React.useEffect(() => {
      if (emblaApi) setApi?.(emblaApi)
    }, [emblaApi, setApi])

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            )}
          >
            {Array.isArray(children) 
              ? children.map((child: React.ReactNode, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "min-w-0 flex-[0_0_100%]",
                      orientation === "horizontal" ? "pl-4" : "pt-4",
                    )}
                  >
                    {child}
                  </div>
                ))
              : children && (
                  <div
                    className={cn(
                      "min-w-0 flex-[0_0_100%]",
                      orientation === "horizontal" ? "pl-4" : "pt-4",
                    )}
                  >
                    {children}
                  </div>
                )}
          </div>
        </div>
      </div>
    )
  }
)

const CarouselPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
)

const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
)

Carousel.displayName = "Carousel"
CarouselPrevious.displayName = "CarouselPrevious"
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselPrevious,
  CarouselNext,
}
