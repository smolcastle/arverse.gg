import React from 'react'

type Props = {
  children: React.ReactNode
  href: string
}

const ExternalLink = (props: Props) => (
  <a
    className="text-blue-500 hover:underline"
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
)

export default ExternalLink
