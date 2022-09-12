import { useLocation, useParams } from "react-router-dom";
import Header from "./InitialScreen/Header";
import Form from "./InitialScreen/Form";

export default function NewEntry() {
  const { entry } = useParams();

  const type = entry === "deposit" ? "entrada" : "saída";
  const location = useLocation();
  const description = location.state?.description;
  const value = location.state?.value;
  const existingType = location.state?.type;
  const _id = location.state?._id;

  return (
    <>
      <Header name={type} />
      <Form
        description={description}
        value={value}
        _id={_id}
        type={existingType}
      />
    </>
  );
}
