interface StatProps {
  label: string
  children: React.ReactNode
  boxed?: boolean
}
export const Stat = ({ label, children, boxed = true }: StatProps) => {
  return (
    <div
      className={`flex flex-col items-center leading-none
    ${boxed ? 'rounded-lg border bg-white p-3' : ''}
    `}
    >
      <div className="font-medium">{children}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  )
}
