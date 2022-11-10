import React, {useEffect} from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ToggleBodyClass from '../Components/ToggleBodyClass'

export default function Welcome(props) {

    return (
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

                <nav className="page-nav">
                    <a className="page-nav__day page-nav__day_today" href="#">
                        <span className="page-nav__day-week">Пн</span><span className="page-nav__day-number">31</span>
                    </a>
                    <a className="page-nav__day" href="#">
                        <span className="page-nav__day-week">Вт</span><span className="page-nav__day-number">1</span>
                    </a>
                    <a className="page-nav__day page-nav__day_chosen" href="#">
                        <span className="page-nav__day-week">Ср</span><span className="page-nav__day-number">2</span>
                    </a>
                    <a className="page-nav__day" href="#">
                        <span className="page-nav__day-week">Чт</span><span className="page-nav__day-number">3</span>
                    </a>
                    <a className="page-nav__day" href="#">
                        <span className="page-nav__day-week">Пт</span><span className="page-nav__day-number">4</span>
                    </a>
                    <a className="page-nav__day page-nav__day_weekend" href="#">
                        <span className="page-nav__day-week">Сб</span><span className="page-nav__day-number">5</span>
                    </a>
                    <a className="page-nav__day page-nav__day_next" href="#">
                    </a>
                </nav>

                <main>
                    {props.movies && props.movies.map(movie =>
                        <section className="movie" key={movie.id}>
                            <div className="movie__info">
                                <div className="movie__poster">
                                    <img className="movie__poster-image" alt={movie.name} src={`/storage/${movie.poster}`} />
                                </div>
                                <div className="movie__description">
                                    <h2 className="movie__title">{movie.name}</h2>
                                    <p className="movie__synopsis">{movie.description}</p>
                                    <p className="movie__data">
                                        <span className="movie__data-duration">{movie.duration} минут</span>
                                        <span className="movie__data-origin">{movie.country}</span>
                                    </p>
                                </div>
                            </div>

                            {props.halls && props.halls.map(hall =>
                                <div className="movie-seances__hall" key={hall.id}>
                                    <h3 className="movie-seances__hall-title">{hall.name}</h3>
                                    <ul className="movie-seances__list">
                                        {props.showtimes
                                            .filter(showtime => showtime.hall_id === hall.id && showtime.movie_id === movie.id)
                                            .map(showtime =>
                                                <li key={showtime.id} className="movie-seances__time-block">
                                                    <a className="movie-seances__time" href="hall.html">{showtime.time}</a></li>
                                            )}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}
