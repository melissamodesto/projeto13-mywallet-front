import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  BsFillExclamationTriangleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import axios from "axios";
import styled from "styled-components";

export default function Form(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { entryType } = useParams();

  const path = location.pathname;
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [trackingPassword, setTrackingPassword] = useState(false);
  const [matchingPassword, setMatchingPassword] = useState(false);
  const [requestError, setRequestError] = useState({});

  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const existingDescription = props?.description;
  const existingValue = props?.value;
  let existingType = props?.type;
  const existingId = props?._id;

  useEffect(() => {
    if (props) {
      setDescription(existingDescription);
      setValue(existingValue);
    }
  }, []);

  function handleSubmit(e) {
    switch (path) {
      case "/sign-in":
        e.preventDefault();

        const lowerCaseEmailSignIn = email.toLowerCase();

        axios
          
          .post("http://localhost:5000/sign-in", {
            email: lowerCaseEmailSignIn,
            password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.name);
            navigate("/welcome");
          })
          .catch((error) => {
            setRequestError(error);
          });
        break;

      case "/sign-up":
        e.preventDefault();

        setTrackingPassword(false);

        const lowerCaseEmailSignUp = email.toLowerCase();

        axios
          .post("http://localhost:5000/sign-up", {
            name,
            email: lowerCaseEmailSignUp,
            password,
          })
          .then((res) => {
            console.log(res.data.name);
            navigate("/sign-in");
          })
          .catch((error) => {
            setRequestError(error);
          });
        break;

      case "/new-entry/deposit":
      case "/new-entry/withdraw":
        e.preventDefault();
        const valueAsNumber = Number(value);

        axios
          .post(
            "http://localhost:5000/statements",
            {
              value: valueAsNumber,
              description,
              type: entryType,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            navigate("/welcome");
          })
          .catch((error) => {
            console.log(error);
            setRequestError(error);
          });
        break;
      case "/new-entry/edit":
        e.preventDefault();
        axios
          .put(
            `http://localhost:5000/statements/${existingId}`,
            { description, value, type: existingType },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            navigate("/welcome");
          })
          .catch((error) => {
            if (error.res.data?.includes("Data must be different to update")) {
              navigate("/");
            }
            setRequestError(error);
          });
        break;
      default:
        break;
    }
  }

  function startTrackingPassword(e) {
    if (e.target.name === "password") {
      setPassword(e.target.value);
      if (e.target.value === passwordConfirmation) setMatchingPassword(true);
      else setMatchingPassword(false);
    }
    if (e.target.name === "password-confirmation") {
      setPasswordConfirmation(e.target.value);
      e.target.value.length > 0
        ? setTrackingPassword(true)
        : setTrackingPassword(false);
      if (e.target.value === password) setMatchingPassword(true);
      else setMatchingPassword(false);
    }
  }

  function cancelAndReturn() {
    setValue("");
    setDescription("");
    navigate(-1);
    return;
  }

  function isPasswordMatching() {
    if (trackingPassword && matchingPassword) {
      return (
        <ErrorMessages>
          <BsCheckCircleFill /> As senhas correspondem
        </ErrorMessages>
      );
    } else if (trackingPassword && !matchingPassword) {
      return (
        <ErrorMessages>
          <BsFillExclamationTriangleFill /> As senhas não correspondem
        </ErrorMessages>
      );
    } else {
      return <></>;
    }
  }

  function setButtonDisabled() {
    return !name || !email || !matchingPassword ? true : false;
  }

  function setTypeSelectInput() {
    switch (existingType) {
      case "deposit":
        return (
          <>
            <select
              name="type"
              id="type"
              defaultValue="deposit"
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              <option value="deposit">Entrada (atual)</option>
              <option value="withdraw">Saída</option>
            </select>
          </>
        );
      case "withdraw":
        return (
          <>
            <select
              name="type"
              id="type"
              defaultValue="withdraw"
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              <option value="deposit">Entrada</option>
              <option value="withdraw">Saída (atual)</option>
            </select>
          </>
        );
      default:
        return <></>;
    }
  }

  function handleSelectChange(e) {
    existingType = e.target.value;
  }

  function setErrorContainerContent(errorPlacement = "before-button") {
    let errorMessage = "";

    switch (requestError.res?.status) {
      case 0:
        errorMessage = "Erro de conexão. Tente novamente.";
        break;
      case 400:
        switch (requestError.res?.data[0].type) {
          case "number.min":
            errorMessage = "Por favor, insira um valor maior que 0.";
            break;
          case "number.max":
            errorMessage =
              "Por favor, inserir um valor menor que 1.000.000 (um milhão).";
            break;
          default:
            break;
        }
        break;
      case 401:
        errorMessage = "E-mail ou senha inválidos.";
        break;
      case 406:
        errorMessage = `Utilize letras
                maiúsculas, números ou caracteres especiais.`;
        break;
      case 409:
        errorMessage = "E-mail já cadastrado!";
        break;
      case 500:
        errorMessage = "Erro interno do servidor. Tente novamente.";
        break;
      default:
        break;
    }
    return errorMessage.length > 0 ? (
      <>
        <ErrorMessages errorPlacement>
          <BsFillExclamationTriangleFill /> {errorMessage}
        </ErrorMessages>
      </>
    ) : (
      <></>
    );
  }

  function setFormContent() {
    switch (path) {
      case "/sign-in":
        return (
          <>
            <form onSubmit={handleSubmit}>
              <FormContainer>
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  required
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <SaveButton type="submit">Entrar</SaveButton>
              </FormContainer>
              <LoginSignUp>
                <ErrorMessages>{setErrorContainerContent()}</ErrorMessages>

                <Link
                  to={"/sign-up"}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Primeira vez? Cadastre-se!
                </Link>
              </LoginSignUp>
            </form>
          </>
        );
      case "/sign-up":
        return (
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <Input
                required
                type="text"
                placeholder="Nome"
                pattern="^[a-zA-ZãÃÇ-Üá-ú ]*$"
                title="Por favor, utilize apenas letras."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                required
                name="password"
                type="password"
                placeholder="Senha"
                pattern="^\S{6,20}$"
                title="Por favor, utilize entre 6 e 20 caracteres. (Utilize letras maiúsculas, números e caracteres especiais.)"
                value={password}
                onChange={(e) => {
                  startTrackingPassword(e);
                }}
              />
              <Input
                required
                name="password-confirmation"
                type="password"
                placeholder="Confirme a senha"
                value={passwordConfirmation}
                onChange={(e) => {
                  startTrackingPassword(e);
                }}
              />
              {isPasswordMatching()}
              <SaveButton disabled={setButtonDisabled()} type="submit">
                Cadastrar
              </SaveButton>
            </FormContainer>
            <LoginSignUp>
              {setErrorContainerContent("after-button")}
              <Link
                to={"/sign-in"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Já tem uma conta? Entre agora!
              </Link>
            </LoginSignUp>
          </form>
        );
      case "/new-entry/deposit":
      case "/new-entry/withdraw":
      case "/new-entry/edit":
        return (
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <Input
                required
                allowNegativeValue={false}
                placeholder="Valor"
                step="1"
                min="10"
                max="1000000"
                value={value}
                onValueChange={(newValue) => setValue(newValue)}
              />
              <Input
                type="text"
                required
                placeholder="Descrição"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {setTypeSelectInput()}
              {setErrorContainerContent()}
              <SaveButton type="submit">Salvar</SaveButton>
              <SaveButton type="reset" onClick={cancelAndReturn}>
                Cancelar
              </SaveButton>
            </FormContainer>
          </form>
        );
      default:
        break;
    }
  }

  return <>{setFormContent()}</>;
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-size: 20px;
  &::placeholder {
    color: #c6c6c6;
  }
`;

const SaveButton = styled.button`
  background-color: #a328d6;
  border: none;
  height: 46px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 20px;
  font-family: Raleway, sans-serif;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #8a2be2;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 34px;
  color: #fff;
  font-family: Raleway, sans-serif;
  font-size: 32px;
`;

const LoginSignUp = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #fff;
  font-family: "Raleway", sans-serif;
`;

const ErrorMessages = styled.div`
  color: #fff;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    margin-right: 5px;
  }
`;
