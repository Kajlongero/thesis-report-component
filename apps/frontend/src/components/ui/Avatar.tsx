import React from "react";
import { cn } from "../../utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const AvatarImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = ({ className, ...props }) => (
  <img
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
);

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
