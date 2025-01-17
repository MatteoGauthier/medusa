import React from "react"
import { IconProps } from ".."

const IconGatsby: React.FC<IconProps> = ({ iconColorClassName, ...props }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM2.92847 10.1286C2.92847 11.8643 3.63561 13.6643 4.98561 15.0143C6.33561 16.3643 8.13561 17.0072 9.93561 17.0714L2.92847 10.1286ZM3.12132 8.45716L11.5428 16.8786C14.6928 16.1714 17.0713 13.3429 17.0713 10H12.5713V11.2857H15.657C15.207 13.2143 13.7928 14.8214 11.9285 15.4643L4.53561 8.07145C5.37132 5.82145 7.49275 4.2143 9.9999 4.2143C11.9285 4.2143 13.6642 5.17859 14.757 6.65716L15.7213 5.82145C14.4356 4.08573 12.3785 2.92859 9.9999 2.92859C6.65704 2.92859 3.82847 5.30716 3.12132 8.45716Z"
        className={
          iconColorClassName ||
          "tw-fill-medusa-icon-secondary dark:tw-fill-medusa-icon-secondary-dark"
        }
      />
    </svg>
  )
}

export default IconGatsby
