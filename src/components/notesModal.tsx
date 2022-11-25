import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TextEditor from '../TextEditor';

interface Parameters {
  open: any;
  cancelButtonRef: any;
  setOpen: any;
  note?: any;
}

export function NotesModal({ open, cancelButtonRef, setOpen, note }: Parameters) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
        </Transition.Child>

        <div className='fixed flex inset-0 z-10 overflow-y-auto p-4'>
          <div className='flex items-end justify-center  text-center sm:items-center sm:p-0 w-full '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-slate-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg h-full w-full'>
                <TextEditor note={note} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
