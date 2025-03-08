import "./TextInput.css"; // Importamos su CSS

export default function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-input"
    />
  );
}