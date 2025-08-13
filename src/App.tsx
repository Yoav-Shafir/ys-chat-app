/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useQuery } from 'convex/react';
// import { api } from '../convex/_generated/api';
import { ChatProvider } from './context/ChatContext';
import ChatPage from './pages/chat';

export default function App() {
  // const profile = useQuery(api.functions.getProfile.getProfile);

  return (
    // <div style={{ padding: '50px' }}>
    //   <h1>Convex + Cognito POC</h1>
    //   <div className='mt-6'>
    //     {profile === undefined ? (
    //       <p>Loading profile...</p>
    //     ) : profile ? (
    //       <div>
    //         <p>Authenticated as: {profile.email}</p>
    //         <ChatPage />
    //       </div>
    //     ) : (
    //       <p>Not authenticated</p>
    //     )}
    //   </div>
    // </div>
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}
