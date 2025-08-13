import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const ChatContent = () => {
  const { messages, currentChatId } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const currentMessages = messages.filter(
    (msg) => msg.chatId === currentChatId
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  if (!currentChatId || currentMessages?.length === 0) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
        flexDirection={'column'}
      >
        <QuestionAnswerOutlinedIcon sx={{ fontSize: 80, color: 'grey.500' }} />
        <Typography>Chat with friend</Typography>
      </Box>
    );
  }

  return (
    <Box display='flex' flexDirection='column' maxHeight='100%' p={2} gap={1.5}>
      {currentMessages.map((msg) => (
        <Box
          key={msg.id}
          display='flex'
          justifyContent={msg.isMine ? 'flex-end' : 'flex-start'}
        >
          <Box
            sx={{
              maxWidth: '60%',
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: msg.isMine ? 'success.main' : 'grey.800',
              color: 'white',
              borderBottomRightRadius: msg.isMine ? 0 : 8,
              borderBottomLeftRadius: msg.isMine ? 8 : 0,
            }}
          >
            {msg.text && (
              <Typography variant='body2' sx={{ mb: msg.attachment ? 1 : 0 }}>
                {msg.text}
              </Typography>
            )}

            {msg.attachment &&
              (msg.attachment.type.startsWith('image/') ? (
                <img
                  src={msg.attachment.url}
                  alt={msg.attachment.name}
                  style={{ maxWidth: '100%', borderRadius: 8 }}
                />
              ) : (
                <a
                  href={msg.attachment.url}
                  download={msg.attachment.name}
                  style={{ color: '#fff', textDecoration: 'underline' }}
                >
                  {msg.attachment.name}
                </a>
              ))}
          </Box>
        </Box>
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};

export default ChatContent;
