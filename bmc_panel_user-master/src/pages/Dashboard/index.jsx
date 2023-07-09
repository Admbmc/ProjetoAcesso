import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import Main from "../../components/Main";

import { BMCContext } from "../../providers/BMCProvider";
import WelcomeModal from "../../components/WelcomeModal";
import CreateProfile from "../../components/CreateProfile";

export default function Dashboard() {
  const { profilePJ, me, permission } = useContext(BMCContext);

  return (
    <div>
      <Main>
        <Container>
          <h1 className="mt-4">Olá, {me?.name}.</h1>

          {profilePJ?.result === "error" && <>{profilePJ.message}</>}
        </Container>
      </Main>
      {!me?.welcome && permission && (
        <WelcomeModal title={`Olá, ${me?.name}`} action={"teste"}>
          É um prazer para nós iniciar duas jornadas com você: nosso lançamento
          no mercado e o início da sua jornada de conformidade. Vamos juntos
          buscar os melhores resultados!
        </WelcomeModal>
      )}
      {!permission && <CreateProfile title={profilePJ.message} />}
    </div>
  );
}
