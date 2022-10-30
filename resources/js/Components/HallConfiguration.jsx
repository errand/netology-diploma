import React from "react";
import Accordion from "@/Components/Accordion";
import HallConfigurationForm from "@/Components/HallConfigurationForm";

export default function HallConfiguration({ halls, activeHall, onClick }) {

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
                                       onChange={()=>onClick(hall.id)}
                                       checked={activeHall.id === hall.id}
                                />
                                <span className="conf-step__selector">{hall.name}</span>
                            </li>)
                    }
                </ul>
                {activeHall && <HallConfigurationForm hall={activeHall} />}

            </Accordion.Content>
        </Accordion>
    );
}

