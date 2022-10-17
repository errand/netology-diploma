import React, { useState, useContext, Fragment } from 'react';
import { Transition } from '@headlessui/react';

const AccordionContext = React.createContext();

const Accordion = ({ children }) => {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <AccordionContext.Provider value={{ open, setOpen, toggleOpen }}>
            <section className="conf-step">{children}</section>
        </AccordionContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, toggleOpen } = useContext(AccordionContext);
    const openClass = open ? 'conf-step__header conf-step__header_opened' : 'conf-step__header conf-step__header_closed';

    return (
        <>
            <header className={openClass} onClick={toggleOpen}>
                <h2 className="conf-step__title">{children}</h2>
            </header>
        </>
    );
};

const Content = ({children}) => {
    const { open, setOpen } = useContext(AccordionContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="conf-step__wrapper">{children}</div>
            </Transition>
        </>
    );
};

Accordion.Trigger = Trigger;
Accordion.Content = Content;

export default Accordion;
