export function SectionHeader({ title, action, onAction }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button className="text-action" type="button" onClick={onAction}>
        {action}
      </button>
    </div>
  )
}
