// src/pages/index.js
import Choose from "./choose";
import Ready from "./ready";
import Onboarding from "./onboarding";
import Tools from "./tools";
import Accqrate from "./accqrate";
import Built from "./built";
import Sales from "./sales";
import Erp from "./erp";
import Transform from "./transform";
import Owner from "./owner";
import Dashboard from "./dashboard";
import Pos from "./pos";

export default function Home() {
  return (
    <>
      <Accqrate />
      <Dashboard />
      <Built />
      <Transform />
      <Owner />
      <Pos />
      <Erp />
      <Sales />
      <Tools />
      <Onboarding />
      <Choose />
      <Ready />
    </>
  );
}
