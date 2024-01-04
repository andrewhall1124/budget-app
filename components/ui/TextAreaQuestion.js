export default function TextAreaQuestion({value, setValue, children}){
  return(
    <div>
      <TextField multiline label={children} value={value} onChange={(event)=>(setValue(event.target.value))} sx={{width: '100%'}}>{children}</TextField>
    </div>
  )
}