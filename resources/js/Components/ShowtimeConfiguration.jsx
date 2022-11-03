import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "@/Components/Modal";

export default function ShowtimeConfiguration() {

    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [name, setName] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [country, setCountry] = useState('');

    const handleAddMovieSubmit = () => {
        setSending(true);
        const formData = new FormData();
        formData.append( 'name', name );
        formData.append( 'poster', poster );
        formData.append( 'description', description );
        formData.append( 'duration', duration );
        formData.append( 'country', country );
        axios.post(route('movies.store', formData))
            .then(function (response) {
                setSending(false);
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(poster)
    })

    return (
        <>
            <p className="conf-step__paragraph">
                <button type="button" className="conf-step__button conf-step__button-accent" onClick={() => setShowAddMovieModal(true)}>Добавить фильм</button>
            </p>
            <div className="conf-step__movies">
                <div className="conf-step__movie">
                    <img className="conf-step__movie-poster" alt="poster" src="i/poster.png" />
                    <h3 className="conf-step__movie-title">Звёздные войны XXIII: Атака клонированных клонов</h3>
                    <p className="conf-step__movie-duration">130 минут</p>
                </div>

                <div className="conf-step__movie">
                    <img className="conf-step__movie-poster" alt="poster" src="i/poster.png"/>
                    <h3 className="conf-step__movie-title">Миссия выполнима</h3>
                    <p className="conf-step__movie-duration">120 минут</p>
                </div>

                <div className="conf-step__movie">
                    <img className="conf-step__movie-poster" alt="poster" src="i/poster.png"/>
                    <h3 className="conf-step__movie-title">Серая пантера</h3>
                    <p className="conf-step__movie-duration">90 минут</p>
                </div>

                <div className="conf-step__movie">
                    <img className="conf-step__movie-poster" alt="poster" src="i/poster.png"/>
                    <h3 className="conf-step__movie-title">Движение вбок</h3>
                    <p className="conf-step__movie-duration">95 минут</p>
                </div>

                <div className="conf-step__movie">
                    <img className="conf-step__movie-poster" alt="poster" src="i/poster.png"/>
                    <h3 className="conf-step__movie-title">Кот Да Винчи</h3>
                    <p className="conf-step__movie-duration">100 минут</p>
                </div>
            </div>

            <div className="conf-step__seances">
                <div className="conf-step__seances-hall">
                    <h3 className="conf-step__seances-title">Зал 1</h3>
                    <div className="conf-step__seances-timeline">
                        <div className="conf-step__seances-movie">
                            <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                            <p className="conf-step__seances-movie-start">00:00</p>
                        </div>
                        <div className="conf-step__seances-movie">
                            <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                            <p className="conf-step__seances-movie-start">12:00</p>
                        </div>
                        <div className="conf-step__seances-movie">
                            <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных
                                клонов</p>
                            <p className="conf-step__seances-movie-start">14:00</p>
                        </div>
                    </div>
                </div>
                <div className="conf-step__seances-hall">
                    <h3 className="conf-step__seances-title">Зал 2</h3>
                    <div className="conf-step__seances-timeline">
                        <div className="conf-step__seances-movie">
                            <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных
                                клонов</p>
                            <p className="conf-step__seances-movie-start">19:50</p>
                        </div>
                        <div className="conf-step__seances-movie">
                            <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                            <p className="conf-step__seances-movie-start">22:00</p>
                        </div>
                    </div>
                </div>
            </div>

            <fieldset className="conf-step__buttons text-center">
                <button className="conf-step__button conf-step__button-regular">Отмена</button>
                <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
            </fieldset>

            <Modal open={showAddMovieModal} handleClose={() => setShowAddMovieModal(false)}>
                <Modal.Header>
                    Удалить зал?
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={handleAddMovieSubmit}>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                            Название фильма
                            <input className="conf-step__input" type="text"
                                   onChange={(e) => setName(e.target.value)}
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
                                   onChange={(e) => setPoster(e.target.files[0])}
                                   placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="poster" required/>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
                            Описание
                            <textarea className="conf-step__input" type="text"
                                      onChange={(e) => setDescription(e.target.value)}
                                   placeholder="Описание" name="description" required>
                            </textarea>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration">
                            Продолжительность в минутах
                            <input className="conf-step__input" type="number"
                                   onChange={(e) => setDuration(e.target.value)}
                                   placeholder="Например, &laquo;120&raquo;" name="duration" required/>
                        </label>
                        <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
                            Страна
                            <input className="conf-step__input" type="text"
                                   onChange={(e) => setCountry(e.target.value)}
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
        </>
    );
}
