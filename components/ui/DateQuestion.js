import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function DateQuestion({value, setValue}){
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(newValue)=>(setValue(newValue))} sx={{width: "100%"}}/>
    </LocalizationProvider>
  )
}