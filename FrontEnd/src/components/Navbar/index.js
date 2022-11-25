import { NavLink, Link } from 'react-router-dom'
import './styles.css'
import {
	BsSearch,
	BsHouseDoorFill,
	BsFillPersonFill,
	BsFillCameraFill
} from 'react-icons/bs'

const Navbar = () => {
	return (
		<nav id="nav">
			<Link to="/">
				<h2>ReactGram</h2>
			</Link>
			<form id="search-form">
				<BsSearch />
				<input type="text" placeholder="Search" />
			</form>
			<ul id="nav-links">
				<li>
					<NavLink to="/">
						<BsHouseDoorFill />
					</NavLink>
				</li>
				<li>
					<NavLink to="/login">Sign in</NavLink>
				</li>
				<li>
					<NavLink to="/register">Sign up</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
