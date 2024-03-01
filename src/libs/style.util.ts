import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * tailwind class 유틸함수
 * @param classNames - tailwind 클래스 명
 */
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
