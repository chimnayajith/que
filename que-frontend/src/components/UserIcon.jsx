export default function UserIcon({ size = 48, className = '' }) {
  const s = size
  return (
    <svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.06" />
      <path
        d="M12 12.5c1.933 0 3.5-1.567 3.5-3.5S13.933 5.5 12 5.5 8.5 7.067 8.5 9s1.567 3.5 3.5 3.5z"
        fill="currentColor"
      />
      <path
        d="M4.5 18.25c0-2.485 2.827-4.5 7.5-4.5s7.5 2.015 7.5 4.5v.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.25z"
        fill="currentColor"
      />
    </svg>
  )
}
