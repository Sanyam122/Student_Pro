import { notes } from '../../data/content'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { queryValue, replaceQuery } from '../../utils/routing'
import { Icon } from '../Icon'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { IconChip } from '../ui/IconChip'
import { ProgressBar } from '../ui/ProgressBar'
import { RightRail } from '../ui/RightRail'
import { SectionHeader } from '../ui/SectionHeader'

export function NotesPage({ actions }) {
  const filters = ['All', 'Physics', 'Chemistry', 'Maths', 'Biology', 'General']
  const [search, setSearch] = useState(queryValue('notes_q'))
  const [activeFilter, setActiveFilter] = useState(queryValue('note_subject', 'All'))
  const debouncedSearch = useDebouncedValue(search)
  const filteredNotes = useMemo(() => {
    const normalized = debouncedSearch.trim().toLowerCase()
    return notes.filter((note) => {
      const matchesSearch = !normalized || `${note.title} ${note.subject} ${note.type}`.toLowerCase().includes(normalized)
      const matchesFilter = activeFilter === 'All' || note.subject === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [activeFilter, debouncedSearch])
  const recent = filteredNotes.slice(0, 3)
  const filterCount = (activeFilter === 'All' ? 0 : 1) + (debouncedSearch ? 1 : 0)

  useEffect(() => {
    replaceQuery({ notes_q: search, note_subject: activeFilter })
  }, [activeFilter, search])

  const resetFilters = () => {
    setSearch('')
    setActiveFilter('All')
  }

  return (
    <div className="page-grid">
      <section className="main-feed">
        <div className="filter-toolbar">
          <label className="search-pill page-search">
            <Icon name="search" size={18} />
            <input
              aria-label="Search notes by title, subject, or type"
              type="search"
              value={search}
              placeholder="Search notes by title or subject"
              onChange={(event) => setSearch(event.target.value)}
            />
            {search ? (
              <button className="clear-button" type="button" aria-label="Clear notes search" onClick={() => setSearch('')}>
                <Icon name="close" size={15} />
              </button>
            ) : null}
          </label>
          <div className="chip-row" aria-label="Filter notes by subject">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="filter-summary">
            <span>{filteredNotes.length} notes</span>
            {filterCount ? <Badge accent="blue">{filterCount} filters</Badge> : null}
            {filterCount ? <button className="text-action compact" type="button" onClick={resetFilters}>Reset</button> : null}
          </div>
        </div>
        <SectionHeader title="Recently Added" action="Sort by date" onAction={() => actions.notify('Notes sorted by most recent')} />
        {recent.length ? (
          <div className="recent-row">
            {recent.map((note) => (
              <RecentNote key={note.title} note={note} />
            ))}
          </div>
        ) : (
          <EmptyState title="No recent notes match" text="Clear filters or upload a new study file." action="Clear filters" onAction={resetFilters} />
        )}
        <SectionHeader title="All Notes" action="Grid view" onAction={() => actions.notify('Grid view is active')} />
        {filteredNotes.length ? (
          <div className="note-grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.title} note={note} actions={actions} />
            ))}
          </div>
        ) : (
          <EmptyState title="No notes found" text="Try another keyword or subject filter." action="Reset filters" onAction={resetFilters} />
        )}
      </section>
      <RightRail>
        <UploadWidget actions={actions} />
        <Card title="Pinned Notes" icon="note">
          <div className="pinned-list">
            {notes.filter((note) => note.pinned).map((note) => (
              <button className="compact-row action-row" key={note.title} type="button" onClick={() => actions.showDetail(note.title, `${note.subject} note, ${note.pages} pages.`, 'Open note')}>
                <IconChip accent={note.accent} icon="file" />
                <span>
                  <strong title={note.title}>{note.title}</strong>
                  <small>{note.subject}</small>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </RightRail>
    </div>
  )
}

function RecentNote({ note }) {
  return (
    <article className={`recent-note gradient-card ${note.accent}`}>
      <Badge accent={note.accent}>{note.subject}</Badge>
      <h3 title={note.title}>{note.title}</h3>
      <span>{note.pages} pages - {note.date}</span>
    </article>
  )
}

function NoteCard({ note, actions }) {
  return (
    <article className="note-card">
      <div className="card-topline">
        <IconChip accent={note.accent} icon="file" />
        <Badge accent={note.accent}>{note.subject}</Badge>
      </div>
      <h3 title={note.title}>{note.title}</h3>
      <div className="note-meta">
        <span>{note.type}</span>
        <span>{note.pages} pages</span>
        <span>{note.date}</span>
      </div>
      <button className="ghost-button" type="button" onClick={() => actions.showDetail(note.title, `${note.subject} ${note.type} with ${note.pages} pages. Last update: ${note.date}.`, 'Open note')}>
        Open note
      </button>
    </article>
  )
}

function UploadWidget({ actions }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const allowedTypes = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'xls', 'xlsx']

  useEffect(() => {
    if (!files.length || error) return undefined
    const steps = [38, 72, 100]
    const timers = steps.map((step, index) => window.setTimeout(() => setProgress(step), 380 * (index + 1)))
    const done = window.setTimeout(() => actions.notify(`${files.length} file${files.length > 1 ? 's' : ''} uploaded`), 1500)
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(done)
    }
  }, [actions, error, files])

  const acceptFiles = (fileList) => {
    const selected = Array.from(fileList)
    const invalid = selected.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase()
      return !extension || !allowedTypes.includes(extension) || file.size > 25 * 1024 * 1024
    })
    if (invalid) {
      setFiles([])
      setProgress(0)
      setError('Upload failed. Use PDF, DOC, image, or sheet files under 25 MB.')
      return
    }
    setError('')
    setProgress(12)
    setFiles(selected)
  }

  return (
    <Card title="Quick Upload" icon="upload">
      <div
        className={`upload-zone ${dragging ? 'is-dragging' : ''} ${error ? 'has-error' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          acceptFiles(event.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx"
          onChange={(event) => {
            if (event.target.files?.length) {
              acceptFiles(event.target.files)
            }
            event.target.value = ''
          }}
        />
        <IconChip accent={error ? 'danger' : 'blue'} icon="upload" />
        <strong>Drop study files here</strong>
        <span>PDF, DOC, image, or sheet up to 25 MB</span>
        <button className="ghost-button" type="button" onClick={(event) => {
          event.stopPropagation()
          inputRef.current?.click()
        }}>
          Browse files
        </button>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {files.length ? (
        <div className="upload-list">
          {files.map((file) => (
            <div className="upload-file" key={`${file.name}-${file.size}`}>
              <span title={file.name}>{file.name}</span>
              <small>{progress === 100 ? 'Uploaded' : `${progress}%`}</small>
            </div>
          ))}
        </div>
      ) : null}
      <div className="storage-line">
        <span>Storage used</span>
        <strong>6.8 / 10 GB</strong>
      </div>
      <ProgressBar value={files.length ? Math.max(68, progress) : 68} accent={error ? 'danger' : 'blue'} />
    </Card>
  )
}
