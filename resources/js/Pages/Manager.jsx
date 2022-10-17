import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import ToggleBodyClass from '../Components/ToggleBodyClass'
import Accordion from '@/Components/Accordion';
import Modal from '@/Components/Modal';

export default function Manager(props) {
    const { halls } = usePage().props;

    const [showHallModal, setShowHallModal] = useState(false);
    const [hallValues, setHallValues] = useState({
        name: '',
        rows: '',
        seats_in_row: '',
        vip_price: '',
        common_price: ''
    });
    const [sending, setSending] = useState(false);

    const handleAddHallClick = () => setShowHallModal((previousState) => !previousState);
    const hideHallModal = () => setShowHallModal(false);

    const handleHallModalFormChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setHallValues(values => ({
            ...values,
            [key]: value
        }));
    }

    const handleHallSubmit = evt => {
        evt.preventDefault();
        setSending(true);

        Inertia.post(route('halls.store'), hallValues, {
            onFinish: () => {
                setSending(false);
                evt.target.reset();
            }
        });
    }

        return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manager</h2>}
        >
            <ToggleBodyClass extraClass='admin' />
            <Head title="Manager" />

            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <span className="page-header__subtitle">Администраторррская</span>
            </header>

            <main className="conf-steps">
                <Accordion>
                    <Accordion.Trigger>Управление залами</Accordion.Trigger>
                    <Accordion.Content>
                        <p className="conf-step__paragraph">Доступные залы:</p>
                        <ul className="conf-step__list">
                            <li>Зал 1
                                <button className="conf-step__button conf-step__button-trash"></button>
                            </li>
                            <li>Зал 2
                                <button className="conf-step__button conf-step__button-trash"></button>
                            </li>
                        </ul>
                        {sending ? <div>Sending</div> : <button className="conf-step__button conf-step__button-accent" onClick={handleAddHallClick}>Создать зал</button>}
                    </Accordion.Content>
                </Accordion>
                <Modal open={showHallModal} handleClose={hideHallModal}>
                    <Modal.Header>
                        Добавить зал
                    </Modal.Header>
                    <Modal.Content>
                        <form onSubmit={handleHallSubmit}>
                            <div className="form-group">
                                <label>Название зала</label>
                                <input name="name" onChange={handleHallModalFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Количество рядов</label>
                                <input name="rows" onChange={handleHallModalFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Количество сидений в ряду</label>
                                <input name="seats_in_row" onChange={handleHallModalFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Цена VIP мест</label>
                                <input name="vip_price" onChange={handleHallModalFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Цена простых мест</label>
                                <input name="common_price" onChange={handleHallModalFormChange} />
                            </div>
                            {sending ? <div>Sending</div> : <button className="conf-step__button conf-step__button-accent">Создать зал</button>}
                        </form>
                    </Modal.Content>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
