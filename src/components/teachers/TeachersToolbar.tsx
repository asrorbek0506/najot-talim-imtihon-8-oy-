import { Icon } from "../ui/Icon";

interface TeachersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const TeachersToolbar = ({ search, onSearchChange }: TeachersToolbarProps) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full max-w-sm">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon.search />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="O'qituvchi ismi yoki mutaxassisligi..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </label>
    </div>
  );
};

export default TeachersToolbar;
