'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<string>('password')

  return (
    <main className='h-screen flex'>
      <h1>Welcome to the application</h1>
    </main>
  );
}
