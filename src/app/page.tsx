import Button from "@/components/inputs/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  prisma.user.create({

  })
  return (
    <>
      <Image alt="fr-flag" src={`/images/flags/country/fr.svg`} width={100} height={100} />
      <Image alt="it-map" src={`/images/maps/country/it/vector.svg`} style={{ color: 'blue' }} width={100} height={100} />
      <h1 className="text-7xl font-bold">WorldMaster</h1>
      <h2 className="text-4xl italic">Train, learn and master the world</h2>
      <Link href={'/signin'}>
        <Button className="mt-5">
          <p>Sign in</p>
        </Button>
      </Link>
    </>
  );
}

export default Home;
