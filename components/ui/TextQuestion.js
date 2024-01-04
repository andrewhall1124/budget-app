import { TextField } from "@radix-ui/themes"
export default function TextQuestion({value, setValue, children}){
  return(
    <div>
      <TextField.Input placeholder={children} value={value} onChange={(event)=>(setValue(event.target.value))}>
      </TextField.Input>
    </div>
  )
}