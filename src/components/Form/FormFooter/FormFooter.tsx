import React, {useContext} from "react";
import {FormContext} from "../FormContext";

interface IFormFooter {
    close: () => void;
}

const FormFooter: React.FC<IFormFooter> = ({ close }) => {

    const { state } = useContext(FormContext);

    return (
        <footer className="form__footer">
            <button className="form-close" onClick={() => close()}>
                Cancel
            </button>
            <button className="submit" onClick={() => console.log(state)}>Submit</button>
        </footer>
    )
}

export default FormFooter;
