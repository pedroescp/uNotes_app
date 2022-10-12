import Button from "../components/button";

function Login() {
  return (
    <div className="flex min-h-full items-center justify-center pt-56">
      <div className="p-7 gap-7 flex items-center justify-center flex-col rounded-md border w-80 h-1/2 shadow-default border-default">
        <h1 className="text-shdows font-bold">μNote</h1>
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

        <input
          type="checkbox"
          className="appearance-none checked:bg-blue-500"
        />
        <div className="">
          <Button/>
        </div>
      </div>
    </div>
  );
}

export default Login;
