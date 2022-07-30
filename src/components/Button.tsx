interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex items-center gap-2
       
rounded-sm bg-slate-700 py-2 px-4 font-medium text-white shadow transition-colors hover:bg-red-500"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
