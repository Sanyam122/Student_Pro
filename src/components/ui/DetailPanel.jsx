import { Icon } from '../Icon'

export function DetailPanel({ panel, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <h2 id="detail-title">{panel.title}</h2>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
        </div>
        <p>{panel.body}</p>
        <button className="dark-pill" type="button" onClick={onClose}>{panel.actionLabel ?? 'Done'}</button>
      </section>
    </div>
  )
}
