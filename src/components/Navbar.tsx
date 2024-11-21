"use client";

import { cn } from "@/lib/utils";
import { usePersonalStore } from "@/store/personalStore";
import Link from "next/link";
import React, { useEffect } from "react";
import EditComponent from "./EditComponent";
import PersonalInfoDialog from "./PersonalInfoDialog";

const Navbar = ({ className }: { className?: string }) => {
  const { personalInfo, fetchPersonalInfo } = usePersonalStore();

  useEffect(() => {
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-3">
        {personalInfo.name} 👨🏻‍💻
      </div>
      {/* <div className="flex justify-end items-center gap-5">
        {Object.values(personalInfo.socialMedia).map((social, index) =>
          social.link ? (
            <Link href={social.link} key={index} target="_blank">
              <social.icon className="w-5 h-5 hover:scale-125 transition-all" />
            </Link>
          ) : (
            <></>
          )
        )}
      </div> */}
    </div>
  );
};

const NavbarWithDialog = () => {
  return <EditComponent comp={<Navbar />} dialog={<PersonalInfoDialog />} />;
};

export default NavbarWithDialog;
