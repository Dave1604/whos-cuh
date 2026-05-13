import React from 'react'

interface Props {
  width?: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function SideBtn({
  left, right, top, h, w,
}: {
  left?: number; right?: number; top: number; h: number; w: number
}) {
  return (
    <div style={{
      position: 'absolute',
      left:  left  !== undefined ? left  : undefined,
      right: right !== undefined ? right : undefined,
      top,
      width: w,
      height: h,
      background: left !== undefined
        ? 'linear-gradient(90deg,  #111113 0%, #3a3a3c 60%, #2a2a2c 100%)'
        : 'linear-gradient(270deg, #111113 0%, #3a3a3c 60%, #2a2a2c 100%)',
      borderRadius: w,
      boxShadow: left !== undefined
        ? 'inset -1px 0 0 rgba(255,255,255,0.08)'
        : 'inset  1px 0 0 rgba(255,255,255,0.08)',
    }} />
  )
}

export default function IPhoneFrame({ width = 280, children, className = '', style }: Props) {
  /* All dimensions proportional to real iPhone 15 Pro (393 × 852 CSS px) */
  const S  = width / 393
  const h  = Math.round(852 * S)
  const pad     = Math.max(6,  Math.round(11 * S))
  const outerR  = Math.round(47 * S)
  const innerR  = Math.round(38 * S)
  const islandW = Math.round(126 * S)
  const islandH = Math.max(16, Math.round(37 * S))
  const islandT = Math.max(8,  Math.round(14 * S))
  const btnW    = Math.max(3,  Math.round(4  * S))
  const shadow  = [
    `0 0 0 ${Math.max(1, Math.round(1.5 * S))}px rgba(255,255,255,0.22)`,
    `0 0 0 ${Math.max(2, Math.round(3   * S))}px rgba(0,0,0,0.9)`,
    `0 ${Math.round(36*S)}px ${Math.round(90*S)}px rgba(0,0,0,0.5)`,
    `0 ${Math.round(10*S)}px ${Math.round(28*S)}px rgba(0,0,0,0.22)`,
    'inset 0 1px 0 rgba(255,255,255,0.2)',
    'inset 0 -1px 0 rgba(0,0,0,0.3)',
  ].join(',')

  return (
    <div className={className} style={{ width, height: h, position: 'relative', flexShrink: 0, ...style }}>
      {/* ── Left buttons: action · vol+ · vol- ── */}
      <SideBtn left={-btnW} top={Math.round(120*S)} h={Math.round(62*S)} w={btnW} />
      <SideBtn left={-btnW} top={Math.round(202*S)} h={Math.round(68*S)} w={btnW} />
      <SideBtn left={-btnW} top={Math.round(288*S)} h={Math.round(68*S)} w={btnW} />
      {/* ── Right button: power ── */}
      <SideBtn right={-btnW} top={Math.round(192*S)} h={Math.round(104*S)} w={btnW} />

      {/* ── Titanium body ── */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: outerR,
        padding: pad,
        boxSizing: 'border-box',
        background: [
          'linear-gradient(145deg,',
          '  #5e5e62 0%,',
          '  #3a3a3c 30%,',
          '  #2c2c2e 55%,',
          '  #1c1c1e 100%)',
        ].join(''),
        boxShadow: shadow,
      }}>

        {/* ── Screen glass ── */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: innerR,
          background: '#0a0a0a',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: islandT,
            left: '50%',
            transform: 'translateX(-50%)',
            width: islandW,
            height: islandH,
            background: '#000',
            borderRadius: islandH,
            zIndex: 20,
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.07)',
              'inset 0 0 6px rgba(0,0,0,0.6)',
            ].join(','),
          }} />

          {/* Screen content */}
          {children}
        </div>
      </div>
    </div>
  )
}
