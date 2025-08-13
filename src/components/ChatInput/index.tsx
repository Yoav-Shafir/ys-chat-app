import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';

interface EmojiMartEmoji {
  id: string;
  name: string;
  native: string;
  colons: string;
  skin?: number;
  [key: string]: unknown;
}

const ChatInput = () => {
  const { sendMessage, currentChatId } = useChat();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentChatId) return;

    const fileUrl = URL.createObjectURL(file);
    sendMessage(message, {
      name: file.name,
      type: file.type,
      url: fileUrl,
    });
    setMessage('');
  };

  const handleSend = () => {
    if (
      (message.trim() || fileInputRef.current?.files?.length) &&
      currentChatId
    ) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box padding={3} display='flex' alignItems='center' position='relative'>
      <input
        type='file'
        ref={fileInputRef}
        hidden
        onChange={handleFileSelect}
      />

      <AddIcon
        sx={{ fontSize: 30, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
        onClick={() => fileInputRef.current?.click()}
      />
      <EmojiEmotionsIcon
        sx={{
          fontSize: 28,
          cursor: 'pointer',
          ml: 1,
          '&:hover': { opacity: 0.7 },
        }}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      />
      {showEmojiPicker && (
        <Box position='absolute' bottom='60px' left='50px' zIndex={10}>
          <Picker
            data={data}
            onEmojiSelect={(emoji: EmojiMartEmoji) => {
              setMessage((prev) => prev + emoji.native);
              setShowEmojiPicker(false);
            }}
            theme='light'
          />
        </Box>
      )}

      <Box mx={1} flexGrow={1}>
        <OutlinedInput
          size='small'
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
      </Box>

      <Button
        disabled={!currentChatId}
        variant='contained'
        sx={{ height: '40px', width: '100px', color: '#fff' }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
