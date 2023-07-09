import React, { useState, useEffect, createContext } from "react";
import { message } from "antd";

import { apiAuthorization } from "../services/api";

import { Good, Regular, Bad } from "../components/Icons";

const key = "updatable";

export const BMCContext = createContext({});

export const BMCProvider = (props) => {
  const [me, setMe] = useState({});
  const [profilePJ, setProfilePJ] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [permission, setPermission] = useState(false);

  const [degrees] = useState([
    {
      id: 1,
      min_points: 0,
      max_points: 1500,
      level: "Baixo grau de conformidade",
      icon: <Bad/>,
      resume:
        "Baixo: O grau inicial da sua conformidade é baixo. Isso quer dizer que a empresa está exposta a graus de riscos administrativos e jurídicos bem elevados. Inicialmente a empresa precisa focar em desenvolver e consolidar uma cultura empresarial e organizacional. A gestão e a liderança devem ser desenvolvidas e as ferramentas de organização devem ser mais exploradas nas operações da empresa. Um programa de conformidade efetivo começa pela mudança de comportamento empreendedor e por uma disposição à organização.",
    },
    {
      id: 2,
      min_points: 1501,
      max_points: 2999,
      level: "Grau regular de conformidade",
      icon: <Regular/>,
      resume:
        "Regular: O grau inicial da sua conformidade é regular, com isso a empresa não está exposta a um grau preocupante de riscos administrativos e jurídicos, mas há muito a ser feito. A cultura empresarial está em desenvolvimento e é crucial que ela se consolide para a efetividade do programa de conformidade. Vamos focar na liderança e no desenvolvimento da equipe para atingir níveis mais satisfatórios de conformidade e amenizar os riscos.",
    },
    {
      id: 3,
      min_points: 3000,
      max_points: 4000,
      level: "Grau mais Conforme",
      icon: <Good/>,
      resume:
        "Mais conforme: Parabéns! A empresa está pronta para iniciar um programa de conformidade da melhor maneira possível. A cultura empresarial já está bem consolidada bem como a cultura organizacional. Vamos focar em aprimorar seu comportamento empreendedor e desenvolver seus líderes e rotinas operacionais para começar a implementação e gestão da conformidade que levará a empresa a uma governança bem estruturada e humanizada.",
    },
  ]);

  // Lista de Questionários
  useEffect(() => {
    async function handleQuizzes() {
      await apiAuthorization()
        .get("/questionarios")
        .then((resp) => {
          const { data } = resp;
          setQuizzes(data);
        })
        .catch(function (error) {
          alertError(error.response.data.message);
        });
    }
    handleQuizzes();
  }, [setQuizzes]);

    // Perfil PJ
    async function handleProfile() {
      await apiAuthorization()
        .get("/profile")
        .then((resp) => {
          const { data } = resp;
          setProfilePJ(data);
          if(data.result === 'success'){
            setPermission(true);
          }else{
            setPermission(false);
          }
        })
        .catch(function (error) {
          alertError(error.response.data.message);
        });
    }

  const alertSuccess = (text) => {
    message.loading({ content: "Carregando...", key });
    setTimeout(() => {
      message.success({ content: text, key, duration: 2 });
    }, 1000);
  };

  const alertError = (text) => {
    message.error(text);
  };

  const alertWarning = (text) => {
    message.warning(text);
  };

  return (
    <BMCContext.Provider
      value={{
        me,
        setMe,
        profilePJ,
        setProfilePJ,
        alertSuccess,
        alertError,
        alertWarning,
        quizzes,
        degrees,
        permission,
        setPermission,
        handleProfile,
      }}
    >
      {props.children}
    </BMCContext.Provider>
  );
};
