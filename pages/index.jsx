import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";

export default function Home() {
  const { isAuthenticated, authenticate, user } = useMoralis();

  return (
    <div>
      <div className="flex justify-end items-center h-12 bg-gray-100 px-10">
        <a className="border rounded-full px-2 py-1 bg-white" onClick={authenticate}>
          connect wallet
        </a>
      </div>
    </div>
  );
}
