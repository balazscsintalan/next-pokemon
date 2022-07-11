import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import pokeball from '../../public/pokeball.png';

const Navbar: React.FC = () => {
  return (
    <Link href="/">
      <a className="w-12 h-12 absolute m-2">
        <Image src={pokeball} alt="pokemon icon" height={100} width={100} />
      </a>
    </Link>
  );
};

export default Navbar;
