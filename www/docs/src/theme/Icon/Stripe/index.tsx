import React from "react"
import { IconProps } from ".."

const IconStripe: React.FC<IconProps> = ({ iconColorClassName, ...props }) => {
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
        d="M8.7941 6.55502C8.7941 5.82721 9.39972 5.54565 10.3783 5.54565C11.9978 5.58064 13.587 5.99186 15.0203 6.74679V2.35341C13.5424 1.77261 11.9661 1.48308 10.3783 1.50076C6.60644 1.50076 4.07666 3.47646 4.07666 6.77548C4.07666 11.937 11.1645 11.0987 11.1645 13.3236C11.1645 14.1938 10.4208 14.4636 9.37422 14.4636C7.83096 14.4636 5.83773 13.8251 4.27428 12.9751V17.4259C5.88396 18.1262 7.61933 18.4917 9.37475 18.5C13.2512 18.5 15.9234 16.5849 15.9234 13.2285C15.9234 7.65788 8.7941 8.6529 8.7941 6.55608V6.55502Z"
        className={
          iconColorClassName ||
          "tw-fill-medusa-icon-secondary dark:tw-fill-medusa-icon-secondary-dark"
        }
      />
    </svg>
  )
}

export default IconStripe
