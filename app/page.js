"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    setupProviders();
  }, [])

  return (
    <div>
      {providers && 
          Object.values(providers).map((provider) => (
            <button 
              type="button" 
              key={provider.name} 
              onClick={() => signIn(provider.id)}
              className="bg-red-600 rounded-full px-3 py-1 text-md text-white"
            >
              Login
            </button>
          ))
        }
    </div>
  )
}
