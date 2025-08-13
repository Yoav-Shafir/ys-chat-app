import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import AddNewChatDialog from '../AddNewChatDialog/AddNewChatDialog';
import ChatItem from '../ChatItem';

const ChatList = () => {
  const {
    chatList,
    currentChatId,
    setCurrentChat,
    addChatUser,
    removeChatUser,
  } = useChat();
  const [open, setOpen] = useState(false);

  const handleAddChat = (name: string) => {
    const newUser = {
      id: crypto.randomUUID(),
      name,
    };
    addChatUser(newUser);
    setCurrentChat(newUser.id);
  };

  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        px={2}
        height={'51px'}
        borderBottom='1px solid #000'
        bgcolor='#fafafa'
      >
        <Typography variant='subtitle1' fontWeight={600}>
          {`Chat${chatList.length > 1 ? 's' : ''} (${chatList.length})`}
        </Typography>

        <Button size='small' variant='contained' onClick={() => setOpen(true)}>
          <AddIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>

      <Box flex={1} sx={{ overflowY: 'auto' }}>
        {chatList.map((user) => (
          <ChatItem
            key={user.id}
            id={user.id}
            name={user.name}
            isActive={currentChatId === user.id}
            onSelect={setCurrentChat}
            onDelete={removeChatUser}
          />
        ))}
      </Box>

      {/* Add Chat Dialog */}
      <AddNewChatDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddChat}
      />
    </Box>
  );
};

export default ChatList;
