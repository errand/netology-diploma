export default function Seat({seat, hall}) {

    const handleSeatClick = (evt) => {
        console.log(hall)
        if(evt.target.classList.contains('conf-step__chair_standart')) {
            fetch(route('seats.setVip', seat.id, hall))
                .then(response => response.json())
                .then(request => console.log(request))
        }
    }

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
        <span className={seatClass()} onClick={handleSeatClick}></span>
    );
}
