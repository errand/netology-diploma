import {useEffect} from "react";
import ToggleBodyClass from "@/Components/ToggleBodyClass";
import {Head} from "@inertiajs/inertia-react";

export default function ShowtimeSelect(props){

    useEffect(() => console.log(props))
    return(
        <>
            <ToggleBodyClass extraClass='client' />
            <Head title="ИдёмВКино" />
            <main>
                <section className="buying">
                    <div className="buying__info">
                        <div className="buying__info-description">
                            <h2 className="buying__info-title">{props.movie[0].name}</h2>
                            <p className="buying__info-start">Начало сеанса: {props.showtime.time}</p>
                            <p className="buying__info-hall">{props.hall[0].name}</p>
                        </div>
                        <div className="buying__info-hint">
                            <p>Тапните дважды,<br/>чтобы увеличить</p>
                        </div>
                    </div>
                    <div className="buying-scheme">
                        <div className="buying-scheme__wrapper">
                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span
                                className="buying-scheme__chair buying-scheme__chair_vip"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_selected"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_selected"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span
                                className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                            </div>

                            <div className="buying-scheme__row">
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span
                                className="buying-scheme__chair buying-scheme__chair_taken"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span
                                className="buying-scheme__chair buying-scheme__chair_standart"></span>
                            </div>
                        </div>
                        <div className="buying-scheme__legend">
                            <div className="col">
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                                    (<span className="buying-scheme__legend-value">250</span>руб)</p>
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                                    (<span className="buying-scheme__legend-value">350</span>руб)</p>
                            </div>
                            <div className="col">
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                            </div>
                        </div>
                    </div>
                    <button className="acceptin-button" onClick="location.href='payment.html'">Забронировать</button>
                </section>
            </main>
            </>
    );
}
