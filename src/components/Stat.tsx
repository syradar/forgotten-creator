interface StatProps {
  label: string
  children: React.ReactNode
  boxed?: boolean
  flexGreedy?: boolean
}
export const Stat = ({
  label,
  children,
  flexGreedy = false,
  boxed = true,
}: StatProps) => {
  return (
    <div
      className={`flex flex-col items-center leading-none
    ${boxed ? 'rounded-lg border bg-white p-3' : ''}
    ${flexGreedy ? 'flex-auto' : ''}
    `}
    >
      <div className="font-medium">{children}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  )
}
