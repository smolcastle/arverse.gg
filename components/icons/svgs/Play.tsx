const PlayIcon = ({ className }: any) => (
  <svg
    className={`${className ?? 'w-[24px] h-[25p]'}`}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_390_837)">
      <path
        d="M12 24.2666C18.6274 24.2666 24 18.8344 24 12.1333C24 5.43229 18.6274 0 12 0C5.37257 0 0 5.43229 0 12.1333C0 18.8344 5.37257 24.2666 12 24.2666Z"
        fill="#EEE7FE"
      />
      <path
        d="M16.2134 11.0899C16.3924 11.1974 16.5408 11.3501 16.6438 11.533C16.7468 11.716 16.801 11.9229 16.801 12.1334C16.801 12.3439 16.7468 12.5509 16.6438 12.7338C16.5408 12.9167 16.3924 13.0694 16.2134 13.1768L10.2134 16.8168C10.0312 16.9261 9.82364 16.9846 9.61187 16.9865C9.40005 16.9883 9.19152 16.9335 9.00747 16.8275C8.82342 16.7215 8.67042 16.5682 8.56395 16.383C8.45748 16.1979 8.40141 15.9876 8.40137 15.7734V8.49339C8.40141 8.27923 8.45748 8.06893 8.56395 7.88374C8.67042 7.6986 8.82342 7.54527 9.00747 7.4393C9.19152 7.33328 9.40005 7.27845 9.61187 7.28032C9.82364 7.28219 10.0312 7.3407 10.2134 7.44994L16.2134 11.0899Z"
        fill="#8B5CF6"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_390_837"
        x="0"
        y="0"
        width="24"
        height="32.2666"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_390_837"
        />
      </filter>
    </defs>
  </svg>
)

export default PlayIcon
