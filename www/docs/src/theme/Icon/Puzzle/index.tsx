import React from "react"
import { IconProps } from ".."

const IconPuzzle: React.FC<IconProps> = (props) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.875 5.0725C11.875 4.77667 12.03 4.50917 12.2092 4.27333C12.3933 4.03167 12.5 3.745 12.5 3.4375C12.5 2.57417 11.6608 1.875 10.625 1.875C9.58917 1.875 8.75 2.575 8.75 3.4375C8.75 3.745 8.85667 4.03167 9.04083 4.27333C9.22 4.50917 9.375 4.77667 9.375 5.0725C9.37536 5.14396 9.36136 5.21476 9.33382 5.2807C9.30629 5.34664 9.26578 5.40637 9.21471 5.45635C9.16365 5.50633 9.10305 5.54554 9.03654 5.57165C8.97002 5.59776 8.89893 5.61023 8.8275 5.60833C7.66805 5.57493 6.51059 5.49152 5.35833 5.35833C5.51333 6.7025 5.6025 8.06667 5.62083 9.4475C5.62161 9.51992 5.60798 9.59177 5.58075 9.65888C5.55352 9.72599 5.51323 9.78702 5.46221 9.83842C5.41119 9.88983 5.35047 9.93058 5.28357 9.95832C5.21667 9.98606 5.14492 10.0002 5.0725 10C4.77667 10 4.50917 9.845 4.27333 9.66583C4.03448 9.47926 3.74058 9.377 3.4375 9.375C2.57417 9.375 1.875 10.2142 1.875 11.25C1.875 12.2858 2.575 13.125 3.4375 13.125C3.745 13.125 4.03167 13.0183 4.27333 12.8342C4.50917 12.655 4.77667 12.5 5.0725 12.5C5.33083 12.5 5.535 12.7167 5.51583 12.975C5.41218 14.3879 5.23359 15.7943 4.98083 17.1883C6.24583 17.3467 7.52917 17.4458 8.8275 17.4833C8.89893 17.4852 8.97002 17.4728 9.03654 17.4467C9.10305 17.4205 9.16365 17.3813 9.21471 17.3314C9.26578 17.2814 9.30629 17.2216 9.33382 17.1557C9.36136 17.0898 9.37536 17.019 9.375 16.9475C9.375 16.6517 9.22 16.3842 9.04083 16.1483C8.85426 15.9095 8.752 15.6156 8.75 15.3125C8.75 14.45 9.59 13.75 10.625 13.75C11.6608 13.75 12.5 14.45 12.5 15.3125C12.5 15.62 12.3933 15.9067 12.2092 16.1483C12.03 16.3842 11.8758 16.6517 11.8758 16.9475C11.8758 17.225 12.1067 17.4467 12.3842 17.4308C13.9004 17.3417 15.4103 17.1664 16.9067 16.9058C17.1331 15.6044 17.2949 14.2925 17.3917 12.975C17.396 12.9141 17.3878 12.853 17.3674 12.7954C17.347 12.7379 17.315 12.6851 17.2733 12.6405C17.2316 12.5959 17.1811 12.5604 17.1251 12.5363C17.069 12.5121 17.0086 12.4997 16.9475 12.5C16.6517 12.5 16.3842 12.655 16.1483 12.8342C15.9067 13.0183 15.62 13.125 15.3125 13.125C14.45 13.125 13.75 12.2858 13.75 11.25C13.75 10.2142 14.45 9.375 15.3125 9.375C15.6208 9.375 15.9067 9.48167 16.1483 9.66583C16.3842 9.845 16.6517 10 16.9483 10C17.0208 10.0002 17.0925 9.98606 17.1594 9.95832C17.2263 9.93058 17.287 9.88983 17.338 9.83842C17.3891 9.78702 17.4294 9.72599 17.4566 9.65888C17.4838 9.59177 17.4974 9.51992 17.4967 9.4475C17.4766 7.95405 17.3737 6.46287 17.1883 4.98083C15.6167 5.26583 14.0133 5.45917 12.3833 5.555C12.3177 5.55864 12.2521 5.54882 12.1904 5.52614C12.1288 5.50346 12.0724 5.46841 12.0248 5.42314C11.9771 5.37787 11.9393 5.32333 11.9135 5.26289C11.8878 5.20244 11.8747 5.1382 11.875 5.0725Z"
        stroke="var(--ifm-icon-color)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconPuzzle
