"use client"

//Modules
import { useContext, useEffect, useState } from "react"


//Contexts
import { ThemeContext, AuthContext } from "@/providers/context";

//Utils
import { baseUrlEndpoint, regexEmail } from "@/utils";


export default function LoginForm({ className }) {
	
	const {
    setCurrentUser,
  } = useContext(AuthContext);
	
	const {
		isLoading,
    setIsLoading,
		switchScreen,
		setErrorMessage,
  } = useContext(ThemeContext);
	
	
	const [email, setEmail] = useState('')
	const [isEmailValid, setIsEmailValid] = useState(true)
	
	const [password, setPassword] = useState('')
	const [isPasswordValid, setIsPasswordValid] = useState(true)
	
	
	const [isFormValid, setIsFormValid] = useState(false)
	
	/**
	 * Handler for the submit form.
	 * Here is sent the authentication request.
	 * @param {*} e 
	 */
	const onSubmitForm = async (e) => {
		e.preventDefault()
		
		try {
			if(isLoading) {
				return;
			}
			
			setIsLoading(true)
			const myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json");
			
			const payload = {
				email,
				password,
			}
			
			const response = await fetch(`${baseUrlEndpoint}/auth`, {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify(payload),
			})
			
			const userResult = await response.json()
			
			if(response.status !== 200) {
				throw new Error(userResult.message ? userResult.message : "something went wrong.")	
			}
			
			localStorage.setItem('tokenJwt', userResult.token)
			setCurrentUser(userResult)
			setIsLoading(false)
			switchScreen('home')
		} catch(error) {
			setIsLoading(false)
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
	}
	
	/**
	 * Return the jwt token from the localstorage
	 * @returns 
	 */
	const getTokenSessionJwt = () => localStorage.getItem('tokenJwt') || ''
	
	/**
	 * Load the current user session.
	 * @returns 
	 */
	const loadSession = async () => {
		
		try {
			
			const localToken = getTokenSessionJwt()
			
			
			if(isLoading || !localToken) {
				return;
			}
			
			setIsLoading(true)
			
			
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json")
			myHeaders.append("Authorization", `Bearer ${localToken}`)
			
			const response = await fetch(`${baseUrlEndpoint}/auth/verify`, {
				method: 'GET',
				headers: myHeaders,
			})
			
			if(response.status !== 200) {
				throw new Error("response error")
			}
			
			const userResult = await response.json()
			setCurrentUser(userResult)
			setIsLoading(false)
			switchScreen('home')
		} catch(error) {
			localStorage.removeItem('tokenJwt')
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if(email.trim()) {
			setIsEmailValid(regexEmail.test(email) && email.length <= 50)
		}
	}, [email])
	
	useEffect(() => {
		if(password.trim()) {
			const trimmedPwd = password.trim()
			setIsPasswordValid(trimmedPwd.length >= 4)
		}
	}, [password])
	
	//This hook is used to enable/disable the form's button.
	useEffect(() => {
		const trimmedPwd = password.trim()
		
		setIsFormValid(regexEmail.test(email) && email.length <= 50 && trimmedPwd.length >= 4)
	}, [email, password])
	
	useEffect(() => {
		loadSession()
	}, [])
	
	return (
		<>
			<form data-testid="login-form" className={className} onSubmit={onSubmitForm} >
				<div className="mb-3">
					<label htmlFor="input_email" className="form-label">Email</label>
					<input 
						id="input_email" 
						data-testid="email-input" 
						type="text" 
						placeholder="Email"
						className="form-control" 
						value={email}
						onChange={(e) => setEmail(e.target.value)} 
						onBlur={() => {
							setIsEmailValid(regexEmail.test(email) && email.length <= 50)
						}}
					/>
					{
						!isEmailValid && (
							<p data-testid="email-input-error" className="mt-2 text-danger">Email invalid. Max 50 chars.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_password" className="form-label">Password</label>
					<input 
						id="input_password" 
						data-testid="password-input" 
						type="password" 
						className="form-control" 
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} 
						onBlur={() => {
							const trimmedPwd = password.trim()
							setIsPasswordValid(trimmedPwd.length >= 4)
						}}
					/>
					{
						!isPasswordValid && (
							<p data-testid="password-input-error" className="mt-2 text-danger">Password should have at least 4 characters.</p>
						)
					}
				</div>
				
				<button className="btn btn-primary mt-50 w-100" type="submit" data-testid="submit-button" disabled={!isFormValid}>Login</button>
			</form>
			
		</>
	)
}