import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  let a = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      a.push( <FaStar />);
    } else if (value >= i - 0.5) {
      a.push(<FaStarHalfAlt />);
    } else {
      a.push(<FaRegStar />);
    }
  }

  return (
    <div className='rating'>
      <span> {a}</span>
      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

export default Rating;
