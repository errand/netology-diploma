import {useEffect, useState} from "react";
import axios from "axios";

export default function PriceConfiguration({activeHall}) {

    const [price, setPrice] = useState(activeHall.common_price);
    const [vipPrice, setVipPrice] = useState(activeHall.vip_price);
    const [sending, setSending] = useState(false)

    const handleFormSave = () => {
        setSending(true)
        const hall = {
            id: activeHall.id,
            vipPrice,
            price,
        };
        axios.post(route('halls.updateHallPrice', hall))
            .then(function (response) {
                setSending(false);
                setPrice(response.price);
                setVipPrice(response.vipPrice);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        setPrice(activeHall.common_price);
        setVipPrice(activeHall.vip_price);
    }, [activeHall.id])

    return (
        <form onSubmit={handleFormSave}>
            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей
                    <input
                        type="text"
                        className="conf-step__input"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
            </div>
            <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей
                    <input
                        type="text"
                        className="conf-step__input"
                        placeholder="0"
                        value={vipPrice}
                        onChange={(e) => setVipPrice(e.target.value)}
                    />
                </label>
                за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>

            <fieldset className="conf-step__buttons text-center">
                <button type="reset" className="conf-step__button conf-step__button-regular">Отмена</button>
                <button
                    onClick={handleFormSave}
                    type="button"
                    className="conf-step__button conf-step__button-accent"
                    disabled={sending}
                >Сохранить</button>
            </fieldset>
        </form>
    );
}
