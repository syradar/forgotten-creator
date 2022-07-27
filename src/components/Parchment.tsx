import React, { useEffect, useRef, useState } from 'react'

interface ParchmentProps {
  children?: React.ReactNode
}

export const Parchment = React.forwardRef<SVGSVGElement, ParchmentProps>(
  ({ children }: ParchmentProps, forwardedRef) => {
    const [svgHeight, setSvgHeight] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (contentRef !== null) {
        setSvgHeight(contentRef.current?.clientHeight ?? 0)
      } else {
        console.error('null content ref')
      }
    }, [contentRef, children])

    const dim = 98
    const width = 2.5

    return (
      <svg
        ref={forwardedRef}
        width="100%"
        height={svgHeight}
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25)' }}
      >
        <defs>
          <filter id="filter" height="1.4" width="1.4">
            <feTurbulence
              baseFrequency="0.05"
              numOctaves="2"
              type="fractalNoise"
              result="turbulence"
            />
            <feDisplacementMap
              in2="turbulence"
              scale="10"
              result="displacement"
              xChannelSelector="R"
              in="SourceGraphic"
            />
            <feMergeNode
              in2="SourceGraphic"
              in="displacement"
              operator="atop"
              result="fbSourceGraphic"
            />
            {/* <feOffset result="offsetOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />

          <feBlend in="fbSourceGraphic" in2="blurOut" mode="normal" /> */}
          </filter>
        </defs>

        <rect
          filter="url(#filter)"
          fill="white"
          stroke="black"
          strokeWidth={width}
          width={`${dim}%`}
          height={`${svgHeight - width * 2 > 0 ? svgHeight - width * 2 : 0}px`}
          x={`${(100 - dim) / 2}%`}
          y={`${width}px`}
        />
        <foreignObject width="100%" height="100%">
          <div
            className="p-4"
            style={{
              padding: `2rem calc(1rem + ${(100 - dim) * 1}%)`,
            }}
            ref={contentRef}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    )
  },
)

Parchment.displayName = 'Parchment'
