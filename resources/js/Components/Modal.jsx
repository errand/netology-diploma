import React, { useContext } from 'react';

const ModalContext = React.createContext();

const Modal = ({ open, handleClose, children }) => {
    const showHideClassName = open ? "conf-modal conf-modal__show" : "conf-modal conf-modal__hide";

    return (
        <ModalContext.Provider value={{ open, handleClose }}>
            <section className={showHideClassName}>
                <div className="conf-modal__wrapper">
                    {children}
                </div>
            </section>
        </ModalContext.Provider>
    );
};

const Header = ({ children }) => {
    const { handleClose } = useContext(ModalContext);

    return (
        <>
            <header>
                <h2 className="conf-step__title">{children}</h2>
                <button onClick={handleClose}>close</button>
            </header>
        </>
    );
};

const Content = ({children}) => {

    return (
        <>
            <div className="conf-step__content">{children}</div>
        </>
    );
};

Modal.Header = Header;
Modal.Content = Content;

export default Modal;
