export default function Transaction({category, notes, amount, type, index, id}){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () =>{
    setAnchorEl(null)
  }

  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () =>{
    handleClose()
    setDialogOpen(true)
  }

  const deleteTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
      if (error) {
        console.error('Error deleting data:', error);
      } else {
        console.log('Data deleted successfully:', data);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return(
    <>
      <div className={`flex justify-between items-center 'border-b-2 border-background`}>
        <div className="flex">
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVert/>
          </IconButton>
          <div>
            <div className="font-semibold text-main-2">{category}</div>
            <div>{notes}</div>
          </div>
        </div>
        <NumberBox color={type == 'Income' ? 'green' : type == 'Expense' ? 'red': 'grey'}>{amount}</NumberBox>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href={`/edit/${id}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon><Edit/></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={openDialog}>
          <ListItemIcon><Delete/></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete transaction?</DialogTitle>
        <DialogContent>Warning: this cannot be undone</DialogContent>
        <div className="flex justify-center gap-4 pb-4">
          <Button variant='outline' onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant='red' onClick={deleteTransaction}>Delete</Button>
        </div>
      </Dialog>
   </>
  )
}