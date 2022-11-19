export default function Seat({seat, hall, clickHandle}) {

    const seatClass = () => {
        if(seat.vip == 1) {
            return 'conf-step__chair conf-step__chair_vip'
        } else if (seat.sold == 1) {
            return 'conf-step__chair conf-step__chair_disabled'
        } else {
            return 'conf-step__chair conf-step__chair_standart'
        }
    };
    return (
        <span id={seat.id} className={seatClass()} onClick={(evt) => clickHandle(evt, seat.id, hall)}></span>
    );
}
