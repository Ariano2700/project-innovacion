import { SVGProps } from "react";

export default function CarbonAnalytics(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path fill="currentColor" d="M4 2H2v26a2 2 0 0 0 2 2h26v-2H4Z" />
      <path
        fill="currentColor"
        d="M30 9h-7v2h3.59L19 18.59l-4.29-4.3a1 1 0 0 0-1.42 0L6 21.59L7.41 23L14 16.41l4.29 4.3a1 1 0 0 0 1.42 0l8.29-8.3V16h2Z"
      />
    </svg>
  );
}
