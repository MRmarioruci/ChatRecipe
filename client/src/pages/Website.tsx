import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import '../assets/scss/pages/Website.scss';

function Website() {
	return (
		<div className="website">
			<div className="left">
				<div className="eat">
					<h2>Let's</h2>
					<h2 className="eat__emphasis">E</h2>
					<h2 className="eat__emphasis">A</h2>
					<h2 className="eat__emphasis">T</h2>
				</div>
			</div>
			<div className="right">
				<img  src={logo} width={220} alt="Logo" className='logo'/>
				<div className="headline">
					Feel the taste of your personal AI Chef
				</div>
				<div className="font__20 text__muted">
					Tired of eating fast food? With ChatRecipe you can have a list of dished to cook instantly.
					Just put the ingredients you have and let AI do the magic.
				</div>
				<div className="mtop--30">
					<Link to="/register" className="btn btn__inverted btn__inverted-shadow btn__rounded btn__lg">
						Start now
					</Link>
					<Link to="/login" className="btn btn__transparent btn__rounded btn__lg">
						Keep cooking
					</Link>
				</div>
				<div className="stats">
					<div className="stat__item">
						<span className="material-icons font__45">
							all_inclusive
						</span>
						<div className="text__muted">
							Infinite Recipes
						</div>
					</div>
					<div className="separator"></div>
					<div className="stat__item">
						<span className="material-icons font__45">
							ramen_dining
						</span>
						<div className="text__muted">
							The limit is your imagination. Sorry, I mean the AI's imagination.
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Website