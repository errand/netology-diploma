import React, {useEffect, useState} from "react";
import Seat from "@/Components/Seat";

export default function HallConfiguration({ hall }) {

    const [rows, setRows] = useState(hall.rows);
    const [seats, setSeats] = useState(hall.seats_in_row);
    const [seatsInHall, setSeatsInHall] = useState([]);

    const colsNumberStyle = {
        gridTemplateColumns:`repeat(${hall.seats_in_row}, 1fr)`,
        display: 'grid',
        gap: '10px'
    };

    useEffect(() => {
        fetch(route('seats.showSeatsInHall', hall.id))
            .then(response => response.json())
            .then(request => setSeatsInHall(request))
    })

    return (
        <>
                    <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в
                        ряду:</p>
                    <div className="conf-step__legend">
                        <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input"
                                                                            placeholder={hall.rows}
                                                                            value={rows}
                                                                            onChange={(e) => setRows(e.target.value)} /></label>
                        <span className="multiplier">x</span>
                        <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input"
                                                                           placeholder={hall.seats_in_row}
                                                                           value={seats}
                                                                           onChange={(e) => setSeats(e.target.value)} /></label>
                    </div>
                    <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                    <div className="conf-step__legend">
                        <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                        <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                        <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет
                        кресла)
                        <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                    </div>

                    <div className="conf-step__hall">
                        <div className={`conf-step__hall-wrapper grid-cols-${hall.seats_in_row}`} style={colsNumberStyle}>
                            {seatsInHall.map(seat => <Seat seat={seat} />)}
                        </div>
                    </div>

                    <fieldset className="conf-step__buttons text-center">
                        <button className="conf-step__button conf-step__button-regular">Отмена</button>
                        <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
                    </fieldset>

            </>
    );
}

