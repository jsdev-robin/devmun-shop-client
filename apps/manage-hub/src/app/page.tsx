'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(
  process.env.NODE_ENV === 'production'
    ? 'https://shop.api.devmun.xyz'
    : 'http://localhost:8080',
  {
    transports: ['websocket'],
    withCredentials: true,
  },
);

const ROOM_ID = 'screen-room';

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const peer = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    socket.emit('join', ROOM_ID);

    socket.on('user-joined', async () => {
      if (isSharing) await createOffer();
    });

    socket.on('signal', async ({ data }) => {
      if (!peer.current) createPeer();

      if (data.sdp) {
        await peer.current!.setRemoteDescription(
          new RTCSessionDescription(data.sdp),
        );
        if (data.sdp.type === 'offer') {
          const answer = await peer.current!.createAnswer();
          await peer.current!.setLocalDescription(answer);
          socket.emit('signal', { roomId: ROOM_ID, data: { sdp: answer } });
        }
      } else if (data.candidate) {
        await peer.current!.addIceCandidate(
          new RTCIceCandidate(data.candidate),
        );
      }
    });
  }, [isSharing]);

  const createPeer = () => {
    peer.current = new RTCPeerConnection();
    peer.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('signal', {
          roomId: ROOM_ID,
          data: { candidate: e.candidate },
        });
      }
    };
    peer.current.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };
  };

  const startScreenShare = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    setIsSharing(true);
    createPeer();

    stream.getTracks().forEach((track) => {
      peer.current!.addTrack(track, stream);
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const createOffer = async () => {
    const offer = await peer.current!.createOffer();
    await peer.current!.setLocalDescription(offer);
    socket.emit('signal', { roomId: ROOM_ID, data: { sdp: offer } });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🖥️ WebRTC Screen Sharing</h1>
      <button
        onClick={startScreenShare}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Sharing Screen
      </button>

      <div className="mt-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          className="w-full h-auto border"
        />
      </div>
    </div>
  );
}
