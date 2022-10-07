function Input() {
  return (
    <div>
      <input
        className="w-full transition duration-150 ease-out hover:ease-in border rounded"
        autoComplete="off"
        type="text"
        placeholder="Write the user"
      />
      <label htmlFor=""></label>
    </div>
  );
}

export default Input;
