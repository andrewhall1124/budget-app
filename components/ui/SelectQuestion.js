import { Select } from "@radix-ui/themes";

export default function SelectQuestion({value, setValue, menu}){
  return(
    <Select.Root
      value={value}
      onChange={(event) =>(setValue(event.target.value))}
    >
      <Select.Trigger/>
      <Select.Content>
      {menu.map((row, index) =>(
        <Select.Item key={index} value={row}>{row}</Select.Item>
      ))}
      </Select.Content>
    </Select.Root>
  )
}