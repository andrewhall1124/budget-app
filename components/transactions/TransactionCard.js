export function TransactionCard({cardInit, typeInit, categoryInit, dateInit, notesInit, amountInit, handleClose, id}){
  const [card, setCard] = useState(cardInit ? cardInit : "")
  const [type, setType] = useState(typeInit ? typeInit : "")
  const typeMenu = ['Income', 'Expense']
  const [category, setCategory] = useState(categoryInit ? categoryInit : "")
  const currentDate = dayjs()
  const [date, setDate] = useState(dateInit ? dayjs(dateInit) : currentDate );
  const [notes, setNotes] = useState(notesInit ? notesInit : "")
  const [amount, setAmount] = useState(amountInit ? amountInit : 0.00)
  const user_id = useContext(AuthContext).user.id

  const [cardOptions, setCardOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])

  const handleSubmit = async (update) => {
    if(update == true){ //Update transaction
      try {
        const { data, error } = await supabase
          .from('transactions')
          .update({ card, type, category, date, notes, amount })
          .eq('id', id)
        handleClose();
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
          setCard("");
          setCategory("");
          setType("")
          setDate("");
          setNotes("");
          setAmount(0.00);
          handleClose();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else{ // Insert new transaction
      try {
        const { data, error } = await supabase
          .from('transactions')
          .insert({ card, type, category, date, notes, amount, user_id });
        handleClose();
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
          setCard("");
          setCategory("");
          setType("")
          setDate("");
          setNotes("");
          setAmount(0.00);
          handleClose();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const getCategories = async () =>{
    try{
      const { data, error } = await supabase
        .from('budgets')
        .select('name')
      if(error){
        console.log(error)
      }
      else{
        console.log(data)
        setCategoryOptions(convertData(data))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const getCards = async () => {
    try{
      const { data, error } = await supabase
        .from('cards')
        .select('name')
      if(error){
        console.log(error)
      }
      else{
        console.log(data)
        setCardOptions(convertData(data))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  function convertData(objectArray){
    let outputArray = []
    for(const object of objectArray){
      outputArray.push(object.name)
    }
    return outputArray
  }

  useEffect(()=>{
    getCards()
    getCategories()
  },[])

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Transaction</CardTitle>
      <SelectQuestion value={card} setValue={setCard} menu={cardOptions}>Card</SelectQuestion>
      <SelectQuestion value={type} setValue={setType} menu={typeMenu}>Type</SelectQuestion>
      <SelectQuestion value={category} setValue={setCategory} menu={categoryOptions}>Category</SelectQuestion>
      <DateQuestion value={date} setValue={setDate}/>
      <TextAreaQuestion value={notes} setValue={setNotes}>Notes</TextAreaQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={() => handleSubmit(id ? true : false)}>Submit</Button>
      </div>
    </Card>
  )
}