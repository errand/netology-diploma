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
                <h1 className="page-header__title">????????<span>??</span>????????</h1>
                <span className="page-header__subtitle">??????????????????????????????????????</span>
            </header>

            <main className="conf-steps">
                <Accordion>
                    <Accordion.Trigger>???????????????????? ????????????</Accordion.Trigger>
                    <Accordion.Content>
                        <p className="conf-step__paragraph">?????????????????? ????????:</p>
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
                        <button className="conf-step__button conf-step__button-accent" onClick={handleAddHallClick}>?????????????? ??????</button>
                    </Accordion.Content>
                </Accordion>
                {halls &&
                <HallConfiguration halls={halls} />
                }
            </main>
            <Modal open={showHallModal} handleClose={hideHallModal}>
                <Modal.Header>
                    ???????????????? ??????
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleHallSubmit}>
                        <div className="form-group">
                            <label className="conf-step__label conf-step__label-fullsize">???????????????? ????????
                            <input className="conf-step__input" name="name" onChange={handleHallModalFormChange} />
                            </label>
                            {errors.name && <div className="error">{errors.name}</div> }
                        </div>
                        <div className="form-group">
                            <label className="conf-step__label conf-step__label-fullsize">???????????????????? ??????????
                            <input className="conf-step__input" name="rows" onChange={handleHallModalFormChange} />
                            </label>
                            {errors.rows && <div className="error">{errors.rows}</div> }
                        </div>
                        <div className="form-group">
                            <label className="conf-step__label conf-step__label-fullsize">???????????????????? ?????????????? ?? ????????
                            <input className="conf-step__input" name="seats_in_row" onChange={handleHallModalFormChange} />
                            </label>
                            {errors.seats_in_row && <div className="error">{errors.seats_in_row}</div> }
                        </div>
                        <div className="form-group">
                            <label className="conf-step__label conf-step__label-fullsize">???????? VIP ????????
                            <input className="conf-step__input" name="vip_price" onChange={handleHallModalFormChange} />
                            </label>
                            {errors.vip_price && <div className="error">{errors.vip_price}</div> }
                        </div>
                        <div className="form-group">
                            <label className="conf-step__label conf-step__label-fullsize">???????? ?????????????? ????????
                            <input className="conf-step__input" name="common_price" onChange={handleHallModalFormChange} />
                            </label>
                            {errors.common_price && <div className="error">{errors.common_price}</div> }
                        </div>
                        {sending && !errors && <div>spinner</div> }
                        <button className="conf-step__button conf-step__button-accent">?????????????? ??????</button>
                    </form>
                </Modal.Content>
            </Modal>
            <Modal open={showDeleteHallModal} handleClose={hideDeleteHallModal}>
                <Modal.Header>
                    ?????????????? ???????
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleDeleteHallSubmit}>
                        {sending && !errors && <div>spinner</div> }
                        <button className="conf-step__button conf-step__button-accent">?????????????? ??????</button>
                    </form>
                </Modal.Content>
            </Modal>

        </AuthenticatedLayout>
    );
}
