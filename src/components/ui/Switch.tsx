interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

const Switch = ({ checked, onChange, label, description }: SwitchProps) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-x-4 py-3">
      {(label || description) && (
        <span>
          {label && (
            <span className="block text-sm font-medium text-gray-900">
              {label}
            </span>
          )}
          {description && (
            <span className="mt-0.5 block text-xs text-gray-500">
              {description}
            </span>
          )}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
};

export default Switch;
