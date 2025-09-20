import dynamic from "next/dynamic"; 

import Choose from "./choose";
import Tools from "./tools";
import Sales from "./sales";
import Transform from "./transform";
import Pos from "./pos";

const Accqrate = dynamic(() => import("./accqrate"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Accqrate />
      <Transform />
      <Pos />
      <Sales />
      <Tools />
      <Choose />
    </>
  );
}
