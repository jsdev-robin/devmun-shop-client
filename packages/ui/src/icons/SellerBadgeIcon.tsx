import React from 'react';
import { cn } from '../lib/utils';

const SellerBadgeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      height={48}
      width={48}
      aria-hidden="true"
      focusable="false"
      className={cn(className)}
    >
      <style>
        {`
          @keyframes badge-left-move {
            0%, 80% { transform: translate(3.4px, 12.4px); }
            90%, 100% { transform: translate(3.2px, 12.4px); }
          }
          @keyframes badge-left-fade {
            0%, 80% { opacity: 0; }
            90%, 100% { opacity: 1; }
          }
          @keyframes badge-right-move {
            0%, 80% { transform: translate(20.6px, 12.4px); }
            90%, 100% { transform: translate(20.8px, 12.4px); }
          }
          @keyframes badge-right-fade {
            0%, 80% { opacity: 0; }
            90%, 100% { opacity: 1; }
          }
          @keyframes star-rotate {
            0% { transform: translate(12px, 12px) rotate(-145deg); }
            20%, 100% { transform: translate(12px, 12px) rotate(0deg); }
          }
          .badge-animation {
            animation-iteration-count: infinite;
            animation-duration: 5s;
          }
        `}
      </style>

      <g
        className="badge-animation"
        style={{
          transform: 'translate(3.4px, 12.4px)',
          animationName: 'badge-left-move',
        }}
      >
        <g
          className="badge-animation"
          style={{
            transform: 'translate(-3.4px, -12.4px)',
            opacity: 0,
            animationName: 'badge-left-fade',
          }}
        >
          <g>
            <g>
              <polygon points="2.5,15.8 2,13.9 4.5,13.8 4.8,14.7" fill="#654B77" stroke="none" strokeWidth={1} strokeMiterlimit={1} />
            </g>
            <g>
              <polygon points="4.8,10.1 4.5,11.1 2,10.9 2.5,9" fill="#654B77" stroke="none" strokeWidth={1} strokeMiterlimit={1} />
            </g>
          </g>
        </g>
      </g>

      <g
        className="badge-animation"
        style={{
          transform: 'translate(20.6px, 12.4px)',
          animationName: 'badge-right-move',
        }}
      >
        <g
          className="badge-animation"
          style={{
            transform: 'translate(-20.6px, -12.4px)',
            opacity: 0,
            animationName: 'badge-right-fade',
          }}
        >
          <g>
            <polygon points="19.5,11.1 19.2,10.1 21.5,9 22,10.9" fill="#654B77" stroke="none" strokeWidth={1} strokeMiterlimit={1} />
          </g>
          <g>
            <polygon points="22,13.9 21.5,15.8 19.2,14.7 19.5,13.8" fill="#654B77" stroke="none" strokeWidth={1} strokeMiterlimit={1} />
          </g>
        </g>
      </g>

      <g
        className="badge-animation"
        style={{
          transform: 'translate(12px, 12px) rotate(-145deg)',
          animationName: 'star-rotate',
        }}
      >
        <g style={{ transform: 'translate(-12px, -12px)' }}>
          <path
            d="M17.6,8.8L16.1,7.9L15.2,6.4L13.5,6.4L12,5.5L10.5,6.4L8.7,6.4L7.9,7.9L6.4,8.8L6.4,10.5L5.5,12L6.4,13.5L6.4,15.2L7.9,16.1L8.8,17.6L10.5,17.6L12,18.5L13.5,17.6L15.2,17.6L16.1,16.1L17.6,15.2L17.6,13.5L18.5,12L17.6,10.5L17.6,8.8ZM13.7,12.7L14.2,14.9C14.1,15,14.1,15,13.9,15.1L12,14L10.1,15.2C10,15.1,10,15.1,9.8,15L10.3,12.8L8.6,11.3C8.7,11.1,8.7,11.1,8.7,11L11,10.8L11.9,8.7C12.1,8.7,12.1,8.7,12.2,8.7L13.1,10.8L15.4,11C15.5,11.2,15.5,11.2,15.5,11.3L13.7,12.7Z"
            fill="#9560B8"
            stroke="none"
            strokeWidth={1}
            strokeMiterlimit={1}
          />
        </g>
      </g>
    </svg>
  );
};

export default SellerBadgeIcon;
