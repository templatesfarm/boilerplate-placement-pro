import Link from "next/link";
import React from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Navbar() {
  const socials = [
    {
      link: "https://www.linkedin.com/in/deepakpahawa/",
      label: "linkedIn",
      icon: SiLinkedin,
    },
    {
      link: "https://www.linkedin.com/in/deepakpahawa/",
      label: "github",
      icon: SiGithub,
    },
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-3">
        Deepak Pahawa 👨🏻‍💻
      </div>
      <div className="flex justify-end items-center gap-5">
        {socials.map((social, index) => (
          <Link href={social.link} key={index} target="_blank">
            <social.icon className="w-5 h-5 hover:scale-125 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
