import React, {useEffect, useState} from "react";
import Accordion from "@/Components/Accordion";
import HallSeatsConfigurationForm from "@/Components/HallSeatsConfigurationForm";
import PriceConfiguration from "@/Components/PriceConfiguration";
import ShowtimeConfiguration from "@/Components/ShowtimeConfiguration";

export default function HallConfiguration({ halls }) {
    const [activeHall, setActiveHall] = useState('');
    const [activeId, setActiveId] = useState(0);
    const [activeHallMessage, setActiveHallMessage] = useState('')

    const handleSelectHallClick = (id) => {
        setActiveId(id);
    }

    const handleOpenSalesClick = () => {
        axios.post(route('halls.setActive', activeId))
            .then(() => setActiveHallMessage('Зал открыт для посещения'))
    }

    useEffect(() => {
        if(activeId) {
            fetch(route('halls.show', activeId))
                .then(response => response.json())
                .then(request => setActiveHall(request));
        }

    }, [activeId])

    return (
        <>
        <Accordion>
            <Accordion.Trigger>
                Конфигурация залов
            </Accordion.Trigger>
            <Accordion.Content>
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {
                        halls.data && halls.data.map(hall =>
                            <li key={hall.id}>
                                <input id={hall.id} type="radio"
                                       className="conf-step__radio"
                                       name="chairs-hall"
                                       value={hall.name}
                                       onChange={()=>handleSelectHallClick(hall.id)}
                                       checked={activeHall.id === hall.id}
                                />
                                <span className="conf-step__selector">{hall.name}</span>
                            </li>)
                    }

                </ul>

                {activeHall && <HallSeatsConfigurationForm hall={activeHall} />}

            </Accordion.Content>
        </Accordion>
        <Accordion>
            <Accordion.Trigger>
                Конфигурация цен
            </Accordion.Trigger>
            <Accordion.Content>
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {
                        halls.data && halls.data.map(hall =>
                            <li key={hall.id}>
                                <input id={hall.id} type="radio"
                                       className="conf-step__radio"
                                       name="chairs-hall"
                                       value={hall.name}
                                       onChange={()=>handleSelectHallClick(hall.id)}
                                       checked={activeHall.id === hall.id}
                                />
                                <span className="conf-step__selector">{hall.name}</span>
                            </li>)
                    }

                </ul>

                {activeHall && <PriceConfiguration activeHall={activeHall} />}

            </Accordion.Content>
        </Accordion>
        <Accordion>
            <Accordion.Trigger>
                Сетка сеансов
            </Accordion.Trigger>
            <Accordion.Content>
                <ShowtimeConfiguration halls={halls} />

            </Accordion.Content>
        </Accordion>
            {activeHall &&
            <Accordion>
                <Accordion.Trigger>
                    Открыть продажи
                </Accordion.Trigger>
                <Accordion.Content>

                    <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                    <button type={'button'} className="conf-step__button conf-step__button-accent" onClick={handleOpenSalesClick}>Открыть продажу билетов</button>
                    {activeHallMessage && <p><br/>{activeHallMessage}</p>}
                </Accordion.Content>
            </Accordion>
            }

    </>
    );
}

