import Lottie from 'react-lottie-player'
import cookingAnimation from '../assets/animations/cooking.json';

function Main() {
    return (
        <div className="intro">
            <div className="">
                <Lottie
                    loop
                    animationData={cookingAnimation}
                    play
                    style={{ width: 350, height: 350, margin: 'auto' }}
                />
            </div>
            <div>
                <h2>Start cooking now</h2>
                <h5 className="text__muted">Stop eating pasta every day. Add the ingredients you have at home and our AI will automatically suggest recipes for you.</h5>
                <span className="material-icons font__30 text__warning">
                    keyboard_double_arrow_down
                </span>
            </div>
        </div>
    )
}

export default Main