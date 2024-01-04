export default function AmountQuestion({value, setValue, children}){
  return(
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Amount</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
  </FormControl>
  )
}