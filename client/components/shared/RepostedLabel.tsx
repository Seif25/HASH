import CachedIcon from "@mui/icons-material/Cached";

export default function RepostedLabel({ label }: {label: string}) {
  return (
    <p className="italic font-bold text-green-500 flex items-center gap-1">
      <CachedIcon fontSize="small" color="inherit" />
      {label}
    </p>
  );
}
