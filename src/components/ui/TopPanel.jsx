import { Icon } from '../Icon'

export function TopPanel({ title, action, onAction, onClose, children }) {
  return (
    <div className="floating-panel top-panel">
      <div className="panel-heading">
        <strong>{title}</strong>
        <div>
          {action ? <button className="text-action compact" type="button" onClick={onAction}>{action}</button> : null}
          <button className="icon-button" type="button" aria-label={`Close ${title}`} onClick={onClose}>
            <Icon name="close" size={15} />
          </button>
        </div>
      </div>
      <div className="panel-list">
        {children}
      </div>
    </div>
  )
}
