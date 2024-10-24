"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const LinkHighlight = (content: string, link: string, index: number) => {
    if(pathname === "/properties"){
      return (
        <Link href={link} className={`${pathname === link?'border-b':''} hover:text-neutral-400 duration-150 p-2 px-3 text-white`} key={index}>
        {content}
      </Link>
      );
    }
    switch (pathname) {

      case "/":
        return (
          <Link href={link} className={`${pathname === link?'border-b':''}  p-2 px-3`} key={index}>
            {content}
          </Link>
        );

        case "/rent":
          return (
            <Link href={link} className={`${pathname === link?'border-b':''}  p-2 px-3`} key={index}>
              {content}
            </Link>
          );

      case "/sell":
        return (
          <Link href={link} className={`${pathname === link?'bg-[#F6F5EF]':''} p-2 px-3`} key={index}>
            {content}
          </Link>
        );

      case "/about":
        return (
          <Link href={link} className={`${pathname === link?'border-b':''} p-2 px-3`} key={index}>
            {content}
          </Link>
        );

      default:
        return (
          <Link href={link} className={`p-2 px-3`} key={index}>
            {content}
          </Link>
        );
    }
  };

  // console.log(pathname);

  return (
    <div className={`flex justify-between ${pathname === '/sell' ? 'text-heading ' : 'text-white '} items-center px-14 mt-4`}>
      <Link href={'/'}>
        <Image priority={true} src={'/oneindia.svg'} width={0} height={0} sizes='100vw' alt='logo' className='size-14 ' />
      </Link>
      <ul className='flex gap-5 '>
        {NavContent.map(({ content, link }, index) => (
          LinkHighlight(content, link, index)
        ))}
      </ul>
    </div>
  );
};

export default NavBar;

const NavContent = [
  { content: "Home", link: '/' },
  { content: "Rent", link: '/rent' },
  { content: "List Your Property", link: '/sell' },
  { content: "About", link: '/about' },
];
