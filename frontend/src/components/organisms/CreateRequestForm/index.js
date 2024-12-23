"use client"

//Modules
import { useContext, useEffect, useState } from "react"


//Contexts
import { ThemeContext, AuthContext } from "@/providers/context";

//Utils
import { baseUrlEndpoint, canUser } from "@/utils";


export default function CreateRequestForm({ className }) {
	
	const {
    currentUser,
    setCurrentUser,
  } = useContext(AuthContext);
	
	const {
		isLoading,
    setIsLoading,
		switchScreen,
		setErrorMessage,
  } = useContext(ThemeContext);
	
	const [code, setCode] = useState('')
	const [isCodeValid, setIsCodeValid] = useState(true)
	
	const [description, setDescription] = useState('')
	const [isDescriptionValid, setIsDescriptionValid] = useState(true)
	
	const [summary, setSummary] = useState('')
	const [isSummaryValid, setIsSummaryValid] = useState(true)
	
	
	const [isFormValid, setIsFormValid] = useState(false)
	
	/**
	 * Handler for the submit form.
	 * Submit to create the employee request.
	 * @param {*} e 
	 */
	const onSubmitForm = async (e) => {
		e.preventDefault()
		
		try {
			if(isLoading || !canUser(currentUser, 'create')) {
				return;
			}
			
			setIsLoading(true)
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json")
			myHeaders.append("Authorization", `Bearer ${currentUser.token}`)
			
			const payload = {
				code,
				description,
				summary,
			}
			
			const response = await fetch(`${baseUrlEndpoint}/api/requests`, {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify(payload),
			})
			
			const resultJson = await response.json()
			
			if(response.status !== 200) {
				throw new Error(resultJson.message ? userResult.message : "something went wrong.")	
			}
			
			setIsLoading(false)
			switchScreen('home')
		} catch(error) {
			setIsLoading(false)
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
		
	}
	
	useEffect(() => {
		if(code.trim()) {
			setIsCodeValid(code.trim().length > 0)
		}
	}, [code])
	
	useEffect(() => {
		if(description.trim()) {
			setIsDescriptionValid(description.trim().length > 0)
		}
	}, [description])
	
	useEffect(() => {
		if(summary.trim()) {
			setIsSummaryValid(summary.trim().length > 0)
		}
	}, [summary])
	
	//This hook is used to enable/disable the form's button.
	useEffect(() => {
		setIsFormValid(code.trim().length > 0 && description.trim().length > 0 && summary.trim().length > 0)
	}, [code, description, summary])
	
	if(!canUser(currentUser, 'create')) {
		return (
			<>
				<h4>Access denied.</h4>
			</>
		)
	}
	
	return (
		<>
			<h3>Create Request</h3>
			<form className={className} onSubmit={onSubmitForm}>
				<div className="mb-3">
					<label htmlFor="input_name" className="form-label">Name *</label>
					<input 
						id="input_code" 
						data-testid="code-input" 
						type="text" 
						placeholder="Code"
						className="form-control" 
						value={code}
						onChange={(e) => setCode(e.target.value)} 
						onBlur={() => {
							setIsCodeValid(code.trim().length !== 0)
						}}
					/>
					{
						!isCodeValid && (
						<p className="mt-2 text-danger">Code required.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_description" className="form-label">Description *</label>
					<input 
						id="input_description" 
						data-testid="description-input" 
						type="text" 
						placeholder="Description"
						className="form-control" 
						value={description}
						onChange={(e) => setDescription(e.target.value)} 
						onBlur={() => {
							setIsDescriptionValid(description.trim().length !== 0)
						}}
					/>
					{
						!isDescriptionValid && (
						<p className="mt-2 text-danger">Description required.</p>
						)
					}
				</div>
				
				<div className="mb-3">
					<label htmlFor="input_summary" className="form-label">Summary *</label>
					<input 
						id="input_summary" 
						data-testid="summary-input" 
						type="text" 
						className="form-control" 
						placeholder="Summary"
						value={summary}
						onChange={(e) => setSummary(e.target.value)} 
						onBlur={() => {
							setIsSummaryValid(summary.trim().length >= 4)
						}}
					/>
					{
						!isSummaryValid && (
						<p className="mt-2 text-danger">Summary required.</p>
						)
					}
				</div>
				<button className="btn btn-primary mt-50 w-100" type="submit" data-testid="submit-button" disabled={!isFormValid}>Add</button>
				<a onClick={(e) => {
					e.preventDefault()
					switchScreen('home')
				}} href="#back" className="mt-3 d-table mx-auto">{'< back'}</a>
			</form>
			
		</>
	)
}