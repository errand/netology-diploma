export default function Seat({seat, hall, clickHandle}) {

    const seatClass = () => {
        if(seat.vip) {
            return 'conf-step__chair conf-step__chair_vip'
        } else if (seat.sold) {
            return 'conf-step__chair conf-step__chair_disabled'
        } else {
            return 'conf-step__chair conf-step__chair_standart'
        }
    };
    return (
        <span className={seatClass()} onClick={(evt) => clickHandle(evt, seat.id, hall)}></span>
    );
}
