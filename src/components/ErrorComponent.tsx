import Lottie from 'react-lottie';
import animationData from '../assets/Animation - 1719161081088.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

function ErrorComponent() {
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
        height={800}
        width={800}
      />
    </div>
  )
}

export default ErrorComponent