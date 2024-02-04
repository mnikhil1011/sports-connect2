import { NavLink , useNavigate} from "react-router-dom"
import { useState } from "react"

const CoachLogin = () => {
	const [emailID, setEmailID] = useState('')
	const [password, setPassword] = useState('')
	const [errDisplay, seterrDisplay] = useState('')
	const navigate=useNavigate()

	const LoginFormSubmit = async (e) => {
		e.preventDefault();
		const coach = { emailID, password }
		const response = await fetch(`/api/coach/login`, {
			method: 'POST',
			body: JSON.stringify(coach),
			headers: {
				'Content-type': 'application/json',
			}
		})
		const json =await  response.json()

		if (response.ok) {
			console.log(json)
			return navigate("/coach/home")
		}
		else {
			console.log(json.error)
			seterrDisplay(json.error)
		}

	}

	return (
		<div>
			<div>
				<form className="loginForm" onSubmit={LoginFormSubmit}>
					<div>
						<label>email id  </label>
						<input
							type="text"
							value={emailID}
							onChange={(e) => setEmailID(e.target.value)}
						/>
					</div>
					<div>
						<label>password</label>
						<input
							type='text'
							value={password}
							onChange={(e) => { setPassword(e.target.value) }}
						/>
					</div>

					<button>submit</button>
				</form>
			</div>
			<div>
				{errDisplay && <p>{errDisplay}</p>}
			</div>
			<div>
				<NavLink to='/coach'>back</NavLink>
			</div>
		</div>)

}

export default CoachLogin
