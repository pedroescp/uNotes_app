import { LoadIcon } from "../icons/icons";

export default function OTP() {
  return (
    <>
      <form
        method="get"
        className="digit-group flex justify-center items-center"
        data-group-name="digits"
        data-autosubmit="false"
        autoComplete="off"
      >
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-1"
          name="digit-1"
          data-next="digit-2"
        />
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-2"
          name="digit-2"
          data-next="digit-3"
          data-previous="digit-1"
        />
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-3"
          name="digit-3"
          data-next="digit-4"
          data-previous="digit-2"
        />
        <span className="px-2 text-slate-50 text-base">&ndash;</span>
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-4"
          name="digit-4"
          data-next="digit-5"
          data-previous="digit-3"
        />
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-5"
          name="digit-5"
          data-next="digit-6"
          data-previous="digit-4"
        />
        <input
          className="input input-bordered w-8 h-14 text-center outline-offset-0 mx-1 leading-10 text-base font-extralight p-0"
          type="text"
          id="digit-6"
          name="digit-6"
          data-previous="digit-5"
        />
      </form>
{/*       <button className="btn btn-primary btn-wide" disabled>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          <LoadIcon />
        </svg>
        Processing...
      </button> */}
    </>
  );
}
