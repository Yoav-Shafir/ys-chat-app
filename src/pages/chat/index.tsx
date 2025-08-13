import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ChatContent from '../../components/ChatContent';
import ChatInfo from '../../components/ChatInfo';
import ChatInput from '../../components/ChatInput';
import ChatList from '../../components/ChatList';

const ChatPage = () => {
  return (
    <div className='flex flex-col w-screen h-screen'>
      <Container>
        <header className='h-[10vh] flex items-center px-4 font-semibold text-lg'>
          <Typography fontSize={26} fontWeight={700}>
            Convex + Cognito POC
          </Typography>
        </header>
        <Box
          borderRadius={'16px'}
          height={'80vh'}
          border={'1px solid #000'}
          display={'flex'}
          flex={1}
          overflow={'hidden'}
        >
          {/* Sidebar */}
          <Box className='w-[200px] bg-[#f5f5f5] border-r overflow-y-auto'>
            <ChatList />
          </Box>
          {/* Chat Area */}
          <Box className='flex flex-col flex-1'>
            <Box className='px-4 py-2 border-b'>
              <ChatInfo />
            </Box>
            <Box className='flex-1 px-4 py-2 overflow-y-auto'>
              <ChatContent />
            </Box>
            <Box className='px-4 py-2 border-t'>
              <ChatInput />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ChatPage;
