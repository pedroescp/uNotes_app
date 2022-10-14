import Button from "../components/button";
import Input from "../components/input";

function Password() {
  return (
    <div className="flex min-h-full items-center justify-center py-56">
      <div className="p-7 gap-7 flex items-center justify-center flex-col rounded-md border w-80 h-1/2 shadow-default border-default">
        <h1 className="text-shdows font-bold">μNote</h1>
        <div className="w-full">
          <label htmlFor="">User</label>
          <Input />
        </div>

        <div className="w-full">
          <label htmlFor="">Password</label>

          <Input />
        </div>
        <div className="grid">
          
          <div className="">
            <a href="/"></a>
          </div>
          
          <Button/>
        </div>
      </div>
    </div>
  );
}

export default Password;
