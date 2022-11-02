import React, {useEffect, useState} from "react";
import axios from "axios";
import Seat from "@/Components/Seat";

export default function HallConfiguration({ hall }) {

    const [rows, setRows] = useState(hall.rows);
    const [seats, setSeats] = useState(hall.seats_in_row);
    const [seatsInHall, setSeatsInHall] = useState([]);

    const fetchHalls = (id) => {
        fetch(route('seats.showSeatsInHall', id))
            .then(response => response.json())
            .then(request => {
                setSeatsInHall(request)
            });
    }

    const handleSeatClick = (evt, seat) => {
        axios.post(route('seats.toggleSeat', seat))
            .then(function (response) {
                fetchHalls(hall.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleFormSave = (hall_id) => {
        const hall = {
            id: hall_id,
            rows: rows,
            seats_in_row: seats,
        };
        axios.post(route('halls.updateHallRows', hall))
            .then(function (response) {
                fetchHalls(hall.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const colsNumberStyle = {
        gridTemplateColumns:`repeat(${hall.seats_in_row}, 1fr)`,
        gridTemplateRows:`repeat(${hall.rows}, 1fr)`,
        display: 'grid',
        gap: '10px'
    };

    useEffect(() => {
        fetchHalls(hall.id);
        setRows(hall.rows)
        setSeats(hall.seats_in_row)
    }, [hall.id])

    return (
        <>
            <form onSubmit={(evt) => handleFormSave(hall.id)}>
                <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в
                    ряду:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Рядов, шт
                        <input type="text" className="conf-step__input"
                               placeholder={rows}
                               value={rows}
                               onChange={(e) => setRows(e.target.value)} /></label>
                    <span className="multiplier">x</span>
                    <label className="conf-step__label">Мест, шт
                        <input type="text" className="conf-step__input"
                               placeholder={seats}
                               value={seats}
                               onChange={(e) => setSeats(e.target.value)} /></label>
                </div>


                <fieldset className="conf-step__buttons text-center">
                    <p className="conf-step__paragraph">При изменении количества рядов и сидений, настройки типа мест будут стёрты!</p>
                    <button className="conf-step__button conf-step__button-regular">Отмена</button>
                    <button type="button" className="conf-step__button conf-step__button-accent" onClick={() => handleFormSave(hall.id)}>Сохранить</button>
                </fieldset>
                <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                <div className="conf-step__legend">
                    <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                    <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                    <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет
                    кресла)
                    <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                </div>

                <div className="conf-step__hall">
                    <div className={`conf-step__hall-wrapper grid-cols-${hall.seats_in_row} grid-rows-${hall.rows}`} style={colsNumberStyle}>
                        {seatsInHall.map(seat => <Seat seat={seat} key={seat.id} clickHandle={handleSeatClick} />)}
                    </div>
                </div>
            </form>
        </>
    );
}

