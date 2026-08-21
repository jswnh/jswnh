"use client"

import React, { createContext, useContext, useRef, type PropsWithChildren } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import type { MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

interface DockContextType {
  mouseX: MotionValue<number>
  iconSize: number
  iconMagnification: number
  disableMagnification: boolean
  iconDistance: number
}

const DockContext = createContext<DockContextType | null>(null)

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-full border p-2 backdrop-blur-md"
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)

    return (
      <DockContext.Provider
        value={{
          mouseX,
          iconSize,
          iconMagnification,
          disableMagnification,
          iconDistance,
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          })}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size: sizeProp,
  magnification: magnificationProp,
  disableMagnification: disableMagnificationProp,
  distance: distanceProp,
  mouseX: mouseXProp,
  className,
  children,
  ...props
}: DockIconProps) => {
  const context = useContext(DockContext)
  const size = sizeProp ?? context?.iconSize ?? DEFAULT_SIZE
  const magnification = magnificationProp ?? context?.iconMagnification ?? DEFAULT_MAGNIFICATION
  const disableMagnification = disableMagnificationProp ?? context?.disableMagnification ?? DEFAULT_DISABLEMAGNIFICATION
  const distance = distanceProp ?? context?.iconDistance ?? DEFAULT_DISTANCE
  const mouseX = mouseXProp ?? context?.mouseX

  const ref = useRef<HTMLDivElement>(null)
  const defaultMouseX = useMotionValue(Infinity)

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const targetSize = disableMagnification ? size : magnification

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  )

  const yTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [0, -8, 0]
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, y }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex size-full items-center justify-center">
        {children}
      </div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
