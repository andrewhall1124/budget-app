export default function Button({children, onClick, variant }){
  const buttonVariant = () =>{
    if (variant == 'red'){
      return `bg-light-red text-dark-red`
    } 
    else if(variant = 'outline'){
      return 'bg-contrast text-main border-2 border-main'
    }
  }

  return(
    <button 
      onClick={() => onClick()} 
      className={`py-2 px-4 rounded-xl w-fit font-semibold ${buttonVariant()}`}>
      {children}
    </button>
  )
}