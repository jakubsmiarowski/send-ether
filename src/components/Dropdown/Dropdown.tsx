import React, {useContext, useEffect, useState} from "react";
import './Dropdown.scss';
import {AppContext} from "../../AppContext";

interface IDropdownProps {
    defaultValue: string;
    items: string[];
    callback: (childData: string) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({callback, items, defaultValue}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const { pendingTransaction: { isPendingTransaction }} = useContext(AppContext);

    useEffect(() => {
        callback(defaultValue)
    },[])

    const toggle = () => {
        if (!isPendingTransaction) {
            setOpen(!open)
        }
    };

    function handleOnClick(item: string) {
        setSelected(item);
        setOpen(false);
        callback(item);
    }

    return (
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                style={{ color: isPendingTransaction ? '#8C8C8C' : 'black'}}
                role="button"
                onKeyPress={() => toggle()}
                onClick={() => toggle()}
            >
                <div className="dd-header__title">
                    <p className="dd-header__title--bold">{selected ? selected : defaultValue}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd-list-item" key={item}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
