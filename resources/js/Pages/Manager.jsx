import React, {useEffect, useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import ToggleBodyClass from '../Components/ToggleBodyClass'
import Accordion from '@/Components/Accordion';
import Modal from '@/Components/Modal';
import HallConfiguration from "@/Components/HallConfiguration";
import PriceConfiguration from "@/Components/PriceConfiguration";

export default function Manager(props) {
    const { halls, errors } = usePage().props;

    const [showHallModal, setShowHallModal] = useState(false);
    const [showDeleteHallModal, setShowDeleteHallModal] = useState(false);
    const [hallValues, setHallValues] = useState({
        name: '',
        rows: '',
        seats_in_row: '',
        vip_price: '',
        common_price: ''
    });
    const [sending, setSending] = useState(false);
    const [hallNumber, setHallNumber] = useState('');
    const [activeHall, setActiveHall] = useState('');
    const [activeId, setActiveId] = useState(0)

    const handleSelectHallClick = (id) => {
        setActiveId(id);
    }

    const handleAddHallClick = () => setShowHallModal((previousState) => !previousState);
    const handleDeleteHallClick = (id) => {
        setShowDeleteHallModal((previousState) => !previousState);
        setHallNumber(id);
    };
    const hideHallModal = () => setShowHallModal(false);
    const hideDeleteHallModal = () => setShowDeleteHallModal(false);

    const handleHallModalFormChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setHallValues(values => ({
            ...values,
            [key]: value
        }));
    }

    useEffect(() => {
        console.log(activeId);
        if(activeId) {
            fetch(route('halls.show', activeId))
                .then(response => response.json())
                .then(request => setActiveHall(request));
        }

    }, [activeId])

    const handleHallSubmit = evt => {
        evt.preventDefault();
        setSending(true);

        Inertia.post(route('halls.store'), hallValues, {
            onSuccess: () => {
                setSending(false);
                evt.target.reset();
                setShowHallModal(false);
            }
        });
    }

    const handleDeleteHallSubmit = evt => {
        evt.preventDefault();
        setSending(true);

        Inertia.delete(route('halls.destroy', hallNumber, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                evt.target.reset();
            }
        }));

        setShowDeleteHallModal(false);
        setSending(false);
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
                            {
                                halls.data && halls.data.map(hall =>
                                <li key={hall.id}>
                                    {hall.name} <button className="conf-step__button conf-step__button-trash"
                                onClick={(evt) => handleDeleteHallClick(hall.id)}></button>
                                </li>)
                            }
                        </ul>
                        {sending && !errors && <div>spinner</div> }
                        <button className="conf-step__button conf-step__button-accent" onClick={handleAddHallClick}>Создать зал</button>
                    </Accordion.Content>
                </Accordion>
                {halls.data.length > 0 &&
                    <>
                        <HallConfiguration halls={halls} activeHall={activeHall} onClick={handleSelectHallClick}/>
                        {/*{activeHall && <PriceConfiguration halls={halls} activeHall={activeHall} />}*/}
                    </>
                }
            </main>
            <Modal open={showHallModal} handleClose={hideHallModal}>
                <Modal.Header>
                    Добавить зал
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleHallSubmit}>
                        <div className="form-group">
                            <label>Название зала</label>
                            <input name="name" onChange={handleHallModalFormChange} />
                            {errors.name && <div className="error">{errors.name}</div> }
                        </div>
                        <div className="form-group">
                            <label>Количество рядов</label>
                            <input name="rows" onChange={handleHallModalFormChange} />
                            {errors.rows && <div className="error">{errors.rows}</div> }
                        </div>
                        <div className="form-group">
                            <label>Количество сидений в ряду</label>
                            <input name="seats_in_row" onChange={handleHallModalFormChange} />
                            {errors.seats_in_row && <div className="error">{errors.seats_in_row}</div> }
                        </div>
                        <div className="form-group">
                            <label>Цена VIP мест</label>
                            <input name="vip_price" onChange={handleHallModalFormChange} />
                            {errors.vip_price && <div className="error">{errors.vip_price}</div> }
                        </div>
                        <div className="form-group">
                            <label>Цена простых мест</label>
                            <input name="common_price" onChange={handleHallModalFormChange} />
                            {errors.common_price && <div className="error">{errors.common_price}</div> }
                        </div>
                        {sending && !errors && <div>spinner</div> }
                        <button className="conf-step__button conf-step__button-accent">Создать зал</button>
                    </form>
                </Modal.Content>
            </Modal>
            <Modal open={showDeleteHallModal} handleClose={hideDeleteHallModal}>
                <Modal.Header>
                    Удалить зал?
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleDeleteHallSubmit}>
                        {sending && !errors && <div>spinner</div> }
                        <button className="conf-step__button conf-step__button-accent">Удалить зал</button>
                    </form>
                </Modal.Content>
            </Modal>

        </AuthenticatedLayout>
    );
}
