import {useState} from "react";
import ToggleBodyClass from "@/Components/ToggleBodyClass";
import {Head, Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

export default function ShowtimeSelect(props){

    const [selected, setSelected] = useState([]);
    const [price, setPrice] = useState(0);

    const colsNumberStyle = {
        gridTemplateColumns:`repeat(${props.hall.seats_in_row}, 1fr)`,
        gridTemplateRows:`repeat(${props.hall.rows}, 1fr)`,
        display: 'grid',
        gap: '10px'
    };

    const handleSeatClick = (seat, vip) => {
        const seatPrice = vip == 1 ? parseInt(props.hall.vip_price) : parseInt(props.hall.common_price);
        if(selected.includes(seat)) {
            let newSeats = selected.filter(item => item !== seat);
            setSelected(newSeats)
            setPrice(previousPrice => previousPrice - seatPrice)

        } else {
            setSelected(oldArray => [...oldArray, seat]);
            setPrice(previousPrice => previousPrice + seatPrice)
        }
    };

    const handlePaymentClick = () => {
        const showtimeValues = {
            seats: selected,
            movie: props.movie.name,
            time: props.showtime.time,
            hall: props.hall.name,
            price
        }
        Inertia.get(route('showtime.payment', props.showtime.id), showtimeValues, {
            onSuccess: () => {
                evt.target.reset();
                setShowHallModal(false);
            }
        });
    }

    const isSelected = id => {
        if(selected.length > 0 && selected.includes(id)) {
            return ' buying-scheme__chair_selected';
        }
    };

    return(
        <>
            <ToggleBodyClass extraClass='client' />
            <Head title="ИдёмВКино" />
            <div className="client">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('manager')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Manager
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <header className="page-header">
                    <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                </header>
            <main>
                <section className="buying">
                    <div className="buying__info">
                        <div className="buying__info-description">
                            <h2 className="buying__info-title">{props.movie.name}</h2>
                            <p className="buying__info-start">Начало сеанса: {props.showtime.time}</p>
                            <p className="buying__info-hall">{props.hall.name}</p>
                        </div>
                        <div className="buying__info-hint">
                            <p>Тапните дважды,<br/>чтобы увеличить</p>
                        </div>
                    </div>
                    <div className="buying-scheme">
                        <div className="buying-scheme__wrapper">

                                <div className="buying-scheme__row" style={colsNumberStyle}>
                                    {props.seats.map(seat =>
                                        <span key={seat.id}
                                              className={`buying-scheme__chair buying-scheme__chair_${seat.sold == 1 ? 'taken' : (seat.vip == 1 ? 'vip' : 'standart')} ${isSelected(seat.id)}`}
                                              onClick={seat.sold == 0 ? () => handleSeatClick(seat.id, seat.vip) : undefined}
                                        ></span>
                                    )}
                                </div>
                        </div>
                        <div className="buying-scheme__legend">
                            <div className="col">
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                                    (<span className="buying-scheme__legend-value">{props.hall.common_price}</span>руб)</p>
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                                    (<span className="buying-scheme__legend-value">{props.hall.vip_price}</span>руб)</p>
                            </div>
                            <div className="col">
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                                <p className="buying-scheme__legend-price"><span
                                    className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                            </div>
                        </div>
                    </div>
                    <button href={route('showtime.payment', props.showtime.id)} onClick={()=> handlePaymentClick()} className="acceptin-button">Забронировать</button>
                </section>
            </main>
            </div>
            </>
    );
}
