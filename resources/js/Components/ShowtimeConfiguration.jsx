import React, {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import axios from "axios";
import Modal from "@/Components/Modal";

export default function ShowtimeConfiguration({halls}) {

    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [showShowtimeModal, setShowShowtimeModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [poster, setPoster] = useState('');
    const [movies, setMovies] = useState(null);
    const [showtime, setShowtime] = useState(null);
    const [activeMovie, setActiveMovie] = useState(null);
    const [activeHall, setActiveHall] = useState(null);
    const [time, setTime] = useState('00:00')

    const { data, setData, post } = useForm({
        name: null,
        poster: null,
        description: null,
        duration: null,
        country: null
    })

    const fetchMovies = () => {
        axios.get(route('movies.index'))
            .then((response) => setMovies(response.data))
    }

    const fetchShowtime = () => {
        axios.get(route('showtimes.showtimes'))
            .then((response => setShowtime(response.data)))
    }

    const handleAddMovieSubmit = () => {
        setSending(true);
        post(route('movies.store', data));
        setShowAddMovieModal(false);
        fetchMovies();
        setSending(false);
    }

    const handleAddShowtimeSubmit = () => {
        const data = {
            hall_id: activeHall,
            movie_id: activeMovie,
            time
        }
        axios.post(route('showtimes.store'), data)
            .then(() => {
                setShowShowtimeModal(false);
                fetchShowtime();
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMovies();
        fetchShowtime();
    }, [])

    return (
        <>
            <p id={'movies'} className="conf-step__paragraph">
                <button type="button" className="conf-step__button conf-step__button-accent" onClick={() => setShowAddMovieModal(true)}>Добавить фильм</button>
            </p>
            <div className="conf-step__movies">
                {movies && movies.map(movie =>
                    <div className="conf-step__movie" key={movie.id} onClick={() => {
                        setActiveMovie(movie.id);
                        setShowShowtimeModal(true);
                    }
                    }>
                        <img className="conf-step__movie-poster" alt="poster" src={`/storage/${movie.poster}`}/>
                        <h3 className="conf-step__movie-title">{movie.name}</h3>
                        <p className="conf-step__movie-duration">{movie.duration} минут</p>
                    </div>
                )}

            </div>

            <div className="conf-step__seances">
                {halls && halls.data.map(hall =>
                    <div className="conf-step__seances-hall" key={hall.id}>
                        <h3 className="conf-step__seances-title">{hall.name}</h3>
                        <div className="conf-step__seances-timeline">
                            {console.log(showtime)}
                            {showtime && showtime.filter(show => show.hall_id === hall.id).map(movieShow =>
                                movies && movies.filter(movie => movie.id === movieShow.movie_id).map(item =>

                                    <div className="conf-step__seances-movie" style={{marginLeft: ((parseInt(movieShow.time.split(':')[0]) * 60 + parseInt(movieShow.time.split(':')[1])) / 60) * 30, background: '#85ff89'}} key={movieShow.id}>
                                        <p className="conf-step__seances-movie-title">{item.name}</p>
                                        <p className="conf-step__seances-movie-start">{movieShow.time}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Modal open={showAddMovieModal} handleClose={() => setShowAddMovieModal(false)}>
                <Modal.Header>
                    Добавить фильм
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleAddMovieSubmit}>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                            Название фильма
                            <input className="conf-step__input" type="text"
                                   onChange={(e) => setData('name', e.target.value)}
                                   placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="name" required/>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="poster">
                            {poster && (
                                <div>
                                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(poster)} />
                                    <br />
                                    <button onClick={()=>setPoster(null)}>Remove</button>
                                </div>
                            )}
                            Постер
                            <input className="conf-step__input" type="file" accept="image/png, image/jpeg"
                                   onChange={(e) => {
                                       setData('poster', e.target.files[0]);
                                       setPoster(e.target.files[0])
                                   }}
                                   placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="poster" required/>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
                            Описание
                            <textarea className="conf-step__input" type="text"
                                      onChange={(e) => setData('description', e.target.value)}
                                      placeholder="Описание" name="description" required>
                            </textarea>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
                            Продолжительность в минутах
                            <input className="conf-step__input" type="number"
                                   onChange={(e) => setData('duration', e.target.value)}
                                   placeholder="Например, &laquo;120&raquo;" name="duration" required/>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
                            Страна
                            <input className="conf-step__input" type="text"
                                   onChange={(e) => setData('country', e.target.value)}
                                   placeholder="Например, &laquo;Индия&raquo;" name="country" required/>
                        </label>
                        <div className="conf-step__buttons text-center">
                            <button type="button"
                                    className="conf-step__button conf-step__button-accent" onClick={handleAddMovieSubmit}>Добавить фильм</button>
                            <button className="conf-step__button conf-step__button-regular" onClick={()=>setShowAddMovieModal(false)}>Отменить</button>
                        </div>
                    </form>
                </Modal.Content>
            </Modal>
            <Modal open={showShowtimeModal} handleClose={() => setShowShowtimeModal(false)}>
                <Modal.Header>
                    Добавить сеанс
                </Modal.Header>

                <Modal.Content>
                    {movies && movies.filter(movie => movie.id === activeMovie).map(item =>
                    <div className="conf-step__movie" key={item.id}>
                        <h6>Фильм</h6>
                        <img className="conf-step__movie-poster" width={'100px'} alt="poster" src={`/storage/${item.poster}`}/>
                        <h3 className="conf-step__movie-title">{item.name}</h3>
                        <p className="conf-step__movie-duration">{item.duration} минут</p>
                    </div>
                    )}
                    <form onSubmit={handleAddShowtimeSubmit}>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall">
                            Название зала
                            <select className="conf-step__input" name="hall"
                                    defaultValue={'DEFAULT'}
                                    required
                                    onChange={(e) => {
                                        setActiveHall(e.target.value)}
                                    }>
                                <option value="DEFAULT" disabled>Выберите зал</option>
                                {halls.data && halls.data.map(hall =>
                                    <option value={hall.id} key={hall.id}>{hall.name}</option>
                                )}
                            </select>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="time">
                            Время начала
                            <input className="conf-step__input" type="time" value={time} name="time" required onChange={(e) => setTime(e.target.value)} />
                        </label>

                        <div className="conf-step__buttons text-center">
                            <button type="button"
                                    className="conf-step__button conf-step__button-accent" onClick={handleAddShowtimeSubmit}>Добавить сеанс</button>
                            <button type={'button'} className="conf-step__button conf-step__button-regular" onClick={()=>setShowShowtimeModal(false)}>Отменить</button>
                        </div>
                    </form>
                </Modal.Content>
            </Modal>
        </>
    );
}
