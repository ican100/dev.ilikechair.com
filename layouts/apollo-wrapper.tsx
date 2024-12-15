'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import React from 'react'

import { makeClient } from '@plugins/apollo'

type Props = {
  children: React.ReactNode
}

const ApolloWrapper = ({ children }: Readonly<Props>) => {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

export default ApolloWrapper
