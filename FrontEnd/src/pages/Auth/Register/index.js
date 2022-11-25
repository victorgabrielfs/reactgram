import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const handleSubmit = (e) => {}

	return (
		<div id="register">
			<h2>ReactGram</h2>
			<p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<input
					type="email"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<input
					type="password"
					placeholder="Confirm your password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>
				{/*!loading && <input type="submit" value="Cadastrar" />}
				{loading && <input type="submit" disabled value="Aguarde..." />}
  {error && <Message msg={error} type="error" />*/}
			</form>
			<p>
				Já tem conta? <Link to="/login">Clique aqui</Link>
			</p>
		</div>
	)
}

export default Register
