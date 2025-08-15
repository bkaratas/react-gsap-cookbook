import { Link, useNavigate } from "react-router-dom";

export default function BackButton({
  to,                     // optional: "/home" gibi; yoksa navigate(-1)
  label = "Geri Dön",
  className = "",
  iconOnly = false,       // true => sadece ikon
}) {
  const navigate = useNavigate();

  const classes = `
    inline-flex items-center gap-2 rounded-lg border
    border-zinc-300 
    bg-white/80 
    px-3 py-1.5 text-sm font-medium
    text-zinc-700 
    shadow-sm hover:bg-zinc-50 
    transition-colors ${className}
  `;

  const Icon = (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.78 15.53a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 111.06 1.06L8.31 9.25H16a.75.75 0 010 1.5H8.31l4.47 4.47a.75.75 0 010 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label}>
        {Icon}
        {!iconOnly && <span>{label}</span>}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={classes}
      aria-label={label}
    >
      {Icon}
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
