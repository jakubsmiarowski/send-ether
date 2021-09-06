import React, {useState} from "react";
import './Dropdown.scss';

interface IDropdownProps {
    title: string;
    items: string[];
    isPendingTransaction: boolean;
    callback: (childData: string) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({title, callback, items, isPendingTransaction}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
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
                    <p className="dd-header__title--bold">{selected ? selected : title}</p>
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
