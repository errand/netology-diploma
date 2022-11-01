import React, {useEffect, useState} from "react";
import Accordion from "@/Components/Accordion";
import HallSeatsConfigurationForm from "@/Components/HallSeatsConfigurationForm";
import PriceConfiguration from "@/Components/PriceConfiguration";

export default function HallConfiguration({ halls }) {
    const [activeHall, setActiveHall] = useState('');
    const [activeId, setActiveId] = useState(0)

    const handleSelectHallClick = (id) => {
        setActiveId(id);
    }

    useEffect(() => {
        if(activeId) {
            fetch(route('halls.show', activeId))
                .then(response => response.json())
                .then(request => setActiveHall(request));
        }

    }, [activeId])

    return (
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
    );
}

