export default function Card({children, header, handleClose}){
  return(
    <div className="bg-contrast m-4 rounded-xl flex-1 flex flex-col shadow-lg">
      {header &&
        <div className='h-10 rounded-t-xl bg-main relative'>
          <div className='absolute right-1'>
            <IconButton onClick={handleClose} className='text-contrast'>
              <Close/>
            </IconButton>
          </div>
        </div>
      }
      <div className='flex flex-col gap-4 px-4 py-4'>
        {children}
      </div>
    </div>
  )
}