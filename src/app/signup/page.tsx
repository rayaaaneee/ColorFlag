import FacebookConnectionButton from '@/components/inputs/facebook-connection-button';
import GithubConnectionButton from '@/components/inputs/github-connection-button';
import GoogleConnectionButton from '@/components/inputs/google-connection-button';
import React from 'react'

const Page = () => {
    return (
      <div>
          <div className="flex gap-4 p-3 w-fit h-fit">
              <GoogleConnectionButton />
              <FacebookConnectionButton />
              <GithubConnectionButton />
          </div>
      </div>
    )
}

export default Page;