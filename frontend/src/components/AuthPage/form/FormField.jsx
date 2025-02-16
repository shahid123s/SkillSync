export default function FormField({ id, label, type, placeholder }) {
    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm">
          {label}
        </label>
        <input id={id} type={type} placeholder={placeholder} className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#55C2C3] focus:outline-none" />
      </div>
    );
  }
  