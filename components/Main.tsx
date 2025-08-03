'use client'

import { Text, Heading, Button, TextField } from 'frosted-ui'
import React, { useState } from 'react'

import type { AppUser } from '@/lib/types'
import { appMetadata } from '@/lib/config'
import { client } from '@/lib/client'

type Props = {
  user: AppUser
}

const Main = ({ user }: Props) => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")

  async function handleGetUserName() {
    const response = await client.api.$post({ json: { userId: user.userId } })
    if (response.status === 200) {
      const data = await response.json()
      setName(data.name)
    } else {
      const data = await response.json()
      setMessage(`Failed to get user name: ${data.message}`)
    }
  }
  async function handleSendMessage(name: string) {
    const response = await client.api.$get({ query: { name } })
    const data = await response.json()
    setMessage(data.message)
  }
  return (
    <main className='w-full h-[100vh] container mx-auto p-4 flex flex-col items-center justify-center'>
      <div className='flex w-full md:w-1/2 h-1/2 flex-col items-center justify-start gap-4'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Heading size="8">Welcome to {appMetadata.title}!</Heading>
          <Text color="gray">{appMetadata.description}</Text>
        </div>
        <div className='flex flex-row items-center justify-center gap-2 w-full px-2'>
          <Button className='w-1/2' color="teal" size="3" variant="solid" onClick={handleGetUserName}>
            Get User
          </Button>
          <Button className='w-1/2' color="teal" size="3" variant="surface" onClick={() => handleSendMessage(name)} disabled={!name}>
            Test API
          </Button>
        </div>
        <div className='flex flex-row items-center justify-center gap-2 w-full'>
          <TextField.Root size="3" className='w-full'>
            <TextField.Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </TextField.Root>
          <Button className='' color="gray" size="3" variant="ghost" onClick={() => {
            setName("")
            setMessage("")
          }}>
            Clear
          </Button>
        </div>
        <div className='flex flex-row w-full items-center justify-center gap-2'>
          {message && (
            <>
              <Text weight="bold">Response:</Text>
              <Text>{message}</Text></>
          )}
        </div>
      </div>
    </main>
  )
}

export default Main