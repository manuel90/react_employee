"use client"

//Modules
import { useContext, useEffect, useRef, useState } from "react"


//Contexts
import { ThemeContext } from "@/providers/context";

//Utils
import { baseUrlEndpoint, regexEmail } from "@/utils";




export default function SignUpForm({ className }) {
		
	const {
		isLoading,
    setIsLoading,
		switchScreen,
		setErrorMessage,
  } = useContext(ThemeContext);
	
	const [name, setName] = useState('')
	const [isNameValid, setIsNameValid] = useState(true)
	
	const [email, setEmail] = useState('')
	const [isEmailValid, setIsEmailValid] = useState(true)
	
	const [password, setPassword] = useState('')
	const [isPasswordValid, setIsPasswordValid] = useState(true)
	const [showPassword, setShowPassword] = useState(false)
	
	const [salary, setSalary] = useState('')
	const [isSalaryValid, setIsSalaryValid] = useState(true)
	
	const [roleId, setRoleId] = useState('')
	const [isRoleIdValid, setIsRoleIdValid] = useState(true)//TODO: Rename these kind of vars
	const refRolePrevValue = useRef('')
	
	
	const [isFormValid, setIsFormValid] = useState(false)
	
	const [roles, setRoles] = useState([])
	
	/**
	 * Handler for the submit form.
	 * Here is sent the registration request.
	 * @param {*} e 
	 */
	const onSubmitForm = async (e) => {
		e.preventDefault()
		
		try {
			if(isLoading) {
				return;
			}
			
			setIsLoading(true)
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			
			const payload = {
				name,
				email,
				password,
				salary,
				roleId,
			}
			
			const response = await fetch(`${baseUrlEndpoint}/api/employees`, {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify(payload),
			})
			
			if(response.status !== 200) {
				throw new Error("error")
			}
			
			setIsLoading(false)
			switchScreen('login')
		} catch(error) {
			setIsLoading(false)
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
		
	}
	
	
	/**
	 * Function to load the roles.
	 */
	const loadRoles = async () => {

		try {
			const response = await fetch(`${baseUrlEndpoint}/api/roles`, {
				method: 'GET',
			})
			
			if(response.status !== 200) {
				throw new Error("error")
			}
			
			const result = await response.json()
			setRoles(result)
		} catch(error) {
			setRoles([])
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
	}
	
	useEffect(() => {
		if(name.trim()) {
			setIsNameValid(name.trim().length > 0)
		}
	}, [name])
	
	useEffect(() => {
		setIsEmailValid(regexEmail.test(email))
	}, [email])
	
	useEffect(() => {
		setIsRoleIdValid(!!roleId || (refRolePrevValue.current == '' && roleId === ''))
		refRolePrevValue.current = roleId;
	}, [roleId])
	
	//This hook is used to enable/disable the form's button.
	useEffect(() => {
		setIsFormValid(name.trim().length > 0 && regexEmail.test(email) && password.trim().length >= 4 && salary.trim().length > 0 && roleId.trim().length > 0)
	}, [name, email, password, salary, roleId])
	
	//Here the roles are loaded.
	useEffect(() => {
		loadRoles()
	}, [])
	
	return (
		<>
			<form className={className} onSubmit={onSubmitForm}>
				<div className="mb-3">
					<label htmlFor="input_name" className="form-label">Name *</label>
					<input 
						id="input_name" 
						data-testid="name-input" 
						type="text" 
						placeholder="Name"
						className="form-control" 
						value={name}
						onChange={(e) => setName(e.target.value)} 
						onBlur={() => {
							setIsNameValid(name.trim().length !== 0)
						}}
					/>
					{
						!isNameValid && (
						<p className="mt-2 text-danger">Name required.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_email" className="form-label">Email *</label>
					<input 
						id="input_email" 
						data-testid="email-input" 
						type="text" 
						placeholder="Email"
						className="form-control" 
						value={email}
						onChange={(e) => setEmail(e.target.value)} 
						onBlur={() => {
							setIsEmailValid(regexEmail.test(email))
						}}
					/>
					{
						!isEmailValid && (
						<p className="mt-2 text-danger">Email invalid.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_password" className="form-label">Password *</label>
					<input 
						id="input_password" 
						data-testid="password-input" 
						type={showPassword ? "text" : "password"} 
						className="form-control" 
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)} 
						onBlur={() => {
							setIsPasswordValid(password.trim().length >= 4)
						}}
					/>
					<button className="btn btn-secondary mt-2" onClick={(e) => {
						e.preventDefault()
						setShowPassword(!showPassword)
					}}>{ showPassword ? 'hide' : 'show'}</button>
					{
						!isPasswordValid && (
						<p className="mt-2 text-danger">Password should have at least 4 characters.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_salary" className="form-label">Salary *</label>
					<input 
						id="input_salary" 
						data-testid="salary-input" 
						type="number" 
						className="form-control" 
						placeholder="Salary"
						value={salary}
						onChange={(e) => setSalary(e.target.value)} 
						onBlur={() => {
							setIsSalaryValid(salary.trim().length !== 0)
						}}
					/>
					{
						!isSalaryValid && (
						<p className="mt-2 text-danger">Salary required.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_role" className="form-label">Role *</label>
					<select 
						id="input_role" 
						data-testid="role-select" 
						className="form-select" 
						placeholder="Role"
						defaultValue={roleId}
						onChange={(e) => setRoleId(e.target.value)} 
					>
						<option value="">- Select a Role -</option>
						{
							roles.map((role, indexRole) => (
								<option key={`optionRole${indexRole}`} value={role.id}>{role.name}</option>
							))
						}
					</select>
					{
						!isRoleIdValid && (
						<p className="mt-2 text-danger">Role required.</p>
						)
					}
				</div>
				
				<button className="btn btn-primary mt-50 w-100" type="submit" data-testid="submit-button" disabled={!isFormValid}>Sign Up</button>
			</form>
			
		</>
	)
}