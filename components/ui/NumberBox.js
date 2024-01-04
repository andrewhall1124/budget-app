export default function NumberBox({children, color}){
  const style = () =>{
    if(color == 'red'){
      return 'bg-light-red text-dark-red'
    }
    else if(color == 'green'){
      return 'bg-light-green text-dark-green'
    }
    else if(color == 'grey'){
      return 'bg-light-grey text-dark-grey'
    }
    else{
      return 'bg-main-2 text-contrast'
    }
  }

  return(
    <div className={`font-semibold p-2 text-sm rounded-xl min-w-[50px] flex justify-center ${style()}`}>
      {Math.round(children*100)/100}
    </div>
  )
}