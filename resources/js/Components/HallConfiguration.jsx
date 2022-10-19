import React, {useState} from "react";
import Accordion from "@/Components/Accordion";
import HallConfigurationForm from "@/Components/HallConfigurationForm";

export default function HallConfiguration({ halls }) {

    const [activeHall, setActiveHall] = useState('')

    const handleSelectHallClick = (id) => {
        fetch(route('halls.show', id))
            .then(response => response.json())
            .then(request => setActiveHall(request));
    }

    return (
        <Accordion>
            <Accordion.Trigger>
                {console.log(activeHall)}
                Конфигурация залов
            </Accordion.Trigger>
            <Accordion.Content>
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {
                        halls.data && halls.data.map(hall =>
                            <li key={hall.id}>
                                <input type="radio"
                                       className="conf-step__radio"
                                       name="chairs-hall"
                                       value={hall.name}
                                       onClick={()=>handleSelectHallClick(hall.id)}
                                />
                                <span className="conf-step__selector">{hall.name}</span>
                            </li>)
                    }
                </ul>
                <HallConfigurationForm></HallConfigurationForm>
            </Accordion.Content>
        </Accordion>
    );
}

