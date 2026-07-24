export function Icon({ name, size = 20 }) {
  const paths = {
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    note: <path d="M7 3h8l4 4v14H7zM15 3v5h5M10 12h7M10 16h7" />,
    archive: <path d="M4 7h16M6 7v13h12V7M9 11h6M5 4h14v3H5z" />,
    calendar: <path d="M7 3v4M17 3v4M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2z" />,
    logout: <path d="M10 17 15 12l-5-5M15 12H3M21 4v16h-8" />,
    search: <path d="m21 21-4.4-4.4M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z" />,
    bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M10 20h4" />,
    trophy: <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0zM5 5H3v2a4 4 0 0 0 4 4M19 5h2v2a4 4 0 0 1-4 4" />,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />,
    clock: <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
    upload: <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />,
    file: <path d="M14 2H6v20h12V6zM14 2v4h4M9 13h6M9 17h6" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    flame: <path d="M12 22c4 0 7-2.8 7-6.7 0-2.8-1.5-4.8-3.2-6.4-.9 2.3-2.4 3.5-4.1 4.4.8-3.1-.8-6.5-3.3-8.3.2 3.7-3.4 5.6-3.4 10.2C5 19.2 8 22 12 22z" />,
    trend: <path d="M4 18 10 12l4 4 6-9M15 7h5v5" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-5" />,
    spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
    target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  }

  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
