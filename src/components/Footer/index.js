import React from 'react'
import { styled } from 'linaria/react'

const StyledFooter = styled.footer`
  padding: 0 16px;
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;

  .copyright {
    color: rgba(255, 255, 255, 0.7);

    a {
      color: #fff;
      font-size: inherit;
      text-decoration: underline;
      opacity: 0.7;
      transition: 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }
`

function Footer() {
  return (
    <StyledFooter>
      <p className="copyright">
        © {new Date().getFullYear()},{' '}
        <a
          href="https://tglink.ru/deaddinos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Библиотека вымерших динозавров
        </a>
      </p>
    </StyledFooter>
  )
}

export default Footer
