import {useState} from "react";
import ToggleBodyClass from "@/Components/ToggleBodyClass";
import {Head, Link} from "@inertiajs/inertia-react";
import QRCode from "react-qr-code";

export default function ShowtimePayment(props){
    const [ready, setReady] = useState(false)
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
                    <section className="ticket">

                        <header className="tichet__check">
                            <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                        </header>

                        <div className="ticket__info-wrapper">
                            <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{props.data.movie}</span>
                            </p>
                            <p className="ticket__info">Места: <span
                                className="ticket__details ticket__chairs">{props.data.seats.join(', ')}</span></p>
                            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{props.data.hall}</span>
                            </p>
                            <p className="ticket__info">Начало сеанса: <span
                                className="ticket__details ticket__start">{props.data.time}</span></p>
                            {!ready &&
                                <>
                            <p className="ticket__info">Стоимость: <span
                                className="ticket__details ticket__cost">
                                {props.data.price}</span> рублей</p>


                            <button className="acceptin-button" onClick={() => setReady(true)}>Получить код
                                бронирования
                            </button>
                            </>
                            }

                            {ready && <QRCode value={`Hey! Movie: ${props.data.movie}, Time ${props.data.time}, Seats: ${props.data.seats.join(', ')}, Hall: ${props.data.hall} `}/>}

                            <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт
                                вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                            <p className="ticket__hint">Приятного просмотра!</p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
