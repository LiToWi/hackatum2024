"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import account_data from "@/data/accounts.json";

// Interaction hyperparameters
const sheenSize = 500;
const cardRotation = 15;
const cardScale = 1.07;

interface NFTGridProps {
  months: Array<string>;
}

interface NFTCardProps {
  month: string;
}

interface CardContentProps {
  month: string;
}

export default function NFTGrid( { months } : NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((nft) => (<div><NFTCard month={nft} /></div>))}
    </div>

  )
}

export function NFTCard( { month } : NFTCardProps) {
  // Raw motion values
  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  // Calculated rotation values for styling
  const rotateX = useTransform(
    yPcnt,
    [-0.4, 0.4],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.4, 0.4],
    [`${cardRotation}deg`, `-${cardRotation}deg`]
  );

  // Calculated sheen values for styling
  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);

  // Helper function for getting mouse position
  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  // Mouse event handlers
  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY } = getMousePosition(e);

    mouseX.jump(currentMouseX);
    mouseY.jump(currentMouseY);
    scale.set(cardScale);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    xPcnt.set(0);
    yPcnt.set(0);
    scale.set(1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col h-96 w-64 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.div
          className="absolute z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-full blur-md"
          style={{
            height: sheenSize,
            width: sheenSize,
            background: "radial-gradient(white, #3984ff00 80%)",
            left: sheenX,
            top: sheenY,
          }}
        />
        <CardContent month={month}/>
      </motion.div>
    </main>
  );
}

const CardContent = ( { month } : CardContentProps) => {
  const { publicKey } = useWallet()
  const user = account_data.accounts.find((data) => {return data.walletAddress === publicKey?.toString()});

  return (
    <>
    <div className='flex mt-[10%] flex-col justify-center items-center'>
      <div className="relative w-44 h-44 rounded-full overflow-hidden">
        <Image src={user?.profilePicture || ""} alt="Profile Picture" layout="fill" objectFit="cover" />
      </div>
    </div>

      <div className="flex flex-col gap-0 mt-4">
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {user?.vorname} {user?.name}
        </h1>
        <p className="text-sm text-neutral-700 font-mono">Attended-Events: {month === "November 2024" ? new Set(localStorage.getItem("registeredEvents")?.split(',')).size : Math.floor(Math.random()*7)}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-[0.6rem] font-medium px-2 py-[3px] border-neutral-700 text-neutral-700 border-[1px] rounded-sm">
          Est. {month}
        </span>
        <button className="fill-[#FF0000] w-12 opacity-70">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        role="img"
      >
        <title>Solana</title>
        <defs>
          <linearGradient id="gradient1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#00FFA3" />
            <stop offset="100%" stop-color="#DC1FFF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#00FFA3" />
            <stop offset="100%" stop-color="#DC1FFF" />
          </linearGradient>
        </defs>
        <path
          d="M80 100c5-5 12-10 20-10h200c9 0 13 11 7 17l-40 40c-5 5-12 10-20 10H100c-9 0-13-11-7-17z"
          fill="url(#gradient1)"
        />
        <path
          d="M300 190c-5-5-12-10-20-10H100c-9 0-13 11-7 17l40 40c5 5 12 10 20 10h200c9 0 13-11 7-17z"
          fill="url(#gradient2)"
        />
        <path
          d="M80 280c5-5 12-10 20-10h200c9 0 13 11 7 17l-40 40c-5 5-12 10-20 10H100c-9 0-13-11-7-17z"
          fill="url(#gradient1)"
        />
      </svg>

        </button>
      </div>
    </>
  );
};
