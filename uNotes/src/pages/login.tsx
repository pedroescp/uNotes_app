function Login() {
  return (
    <div className="flex min-h-full items-center justify-center py-56">
      <div className="p-7 gap-7 flex items-center justify-center flex-col rounded-md border-2 border-b-slate-700 w-1/2 h-1/2">
        <h1 className="font-bold">μNote</h1>
        <div className="w-full">
          <label htmlFor="">User</label>
          <input
            className="w-full transition duration-150 ease-out hover:ease-in border rounded"
            autoComplete="off"
            type="text"
            placeholder="Write the user"
          />
        </div>

        <div className="w-full">
          <label htmlFor="">Password</label>
          <input
            className="placeholder-shown:border-gray-500 w-full"
            type="password"
            autoComplete="off"
            placeholder="Write the password"
          />
        </div>

        <input type="checkbox" className="appearance-none checked:bg-blue-500" />
        <div className="">
          <button className="border decoration-white transition duration-150 ease-in-out ring-white w-28 rounded hover:bg-slate-50 h-8">
            
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
