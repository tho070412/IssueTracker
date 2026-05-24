export default function Spinner({ size = 'md', label = 'Cargando...' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${sizes[size]} border-2 border-border border-t-accent rounded-full animate-spin`}
      />
      <span className="text-muted font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}
