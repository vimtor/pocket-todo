import React from 'react'
import { color, styled, weight } from 'helpers'

const Container = styled.section`
  margin-top: 36px;
  font-size: 16px;
  text-align: center;
  white-space: pre;
  ${color('gray600')};
`

const TermsPrivacy = styled.p`
  margin-bottom: 8px;

  & > a {
    ${color('gray600')};
    ${weight('bold')};
  }
`

const Version = styled.p`
  ${weight('regular')};
`

const Dot = styled.div`
  display: inline-block;
  margin: 0 6px 0 8px;
`

export const LegalInformation = () => {
  return (
    <Container>
      <TermsPrivacy>
        <a href="https://pocket-todo.netlify.app/privacy-policy/">Privacy Policy</a>
        <Dot>&sdot;</Dot>
        <a href="https://pocket-todo.netlify.app/terms-and-conditions/">Terms & Conditions</a>
      </TermsPrivacy>
      <Version>Pocket Todo 1.0.0</Version>
    </Container>
  )
}
