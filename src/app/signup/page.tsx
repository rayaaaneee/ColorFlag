import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";

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