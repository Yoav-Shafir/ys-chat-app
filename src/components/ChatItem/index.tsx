import { Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface ChatItemProps {
  id: string;
  name: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ChatItem = ({
  id,
  name,
  isActive,
  onSelect,
  onDelete,
}: ChatItemProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={2}
      py={1}
      sx={{
        backgroundColor: isActive ? '#ddd' : 'transparent',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#eee' },
        '&:hover .delete-btn': { opacity: 1 },
      }}
      onClick={() => onSelect(id)}
    >
      <Typography variant='body2' sx={{ flex: 1 }}>
        {name}
      </Typography>
      <IconButton
        className='delete-btn'
        size='small'
        sx={{ opacity: 0, transition: 'opacity 0.2s' }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <DeleteOutlineIcon fontSize='small' />
      </IconButton>
    </Box>
  );
};

export default ChatItem;
