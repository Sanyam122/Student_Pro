export function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <span>{text}</span>
      {action ? <button className="ghost-button" type="button" onClick={onAction}>{action}</button> : null}
    </div>
  )
}
