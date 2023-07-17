import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Spinner.scss";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

function Spinner(props: { sizeProp?: SizeProp | undefined }) {
  const { sizeProp = "3x" } = props;

  return (
    <div className="spinner-ctn">
      <FontAwesomeIcon id="spinner" size={sizeProp} icon={faSpinner} />
    </div>
  );
}

export default Spinner;
