export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-lg bg-white p-4 shadow-lg">{children}</div>
}

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-zalamander text-5xl">{children}</h2>
}
