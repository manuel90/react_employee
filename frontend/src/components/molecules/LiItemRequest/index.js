//Modules
import { useState, useContext } from "react"

//Contexts
import { ThemeContext, AuthContext } from "@/providers/context"

//Utils
import { baseUrlEndpoint, canUser } from "@/utils";

//styles
import styles from "./liItemRequest.module.scss"


export default function LiItemRequest({ className, item }) {
	
	const {
		currentUser,
	} = useContext(AuthContext);
	
	const {
		isLoading,
		setIsLoading,
    setErrorMessage,
		setTotalRequests,
  } = useContext(ThemeContext);
	
	const [showDetails, setShowDetails] = useState(false)
	
	const onClickToggleDetails = (e) => {
		e.preventDefault()
		setShowDetails(!showDetails)
	}
	
	const onClickDeleteRequest = async (e) => {
		e.preventDefault()
		
		//TODO: Add confirmation modal.
		
		try {
			if(isLoading || !canUser(currentUser, 'delete')) {
				return;
			}
			
			setIsLoading(true)
			const myHeaders = new Headers();
			myHeaders.append("Authorization", `Bearer ${currentUser.token}`);
			
			const response = await fetch(`${baseUrlEndpoint}/api/requests/${item.id}`, {
				method: 'DELETE',
				headers: myHeaders,
			})
			
			if(response.status !== 200) {
				throw new Error("error")	
			}
			
			setTotalRequests((total) => total-1)
			setIsLoading(false)
		} catch(error) {
			setIsLoading(false)
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
		
	}
	
	return (
		<>
			<li className={`${styles.wrapLi} ${showDetails ? styles.showed : ''} ${className}`}>
				<div>
					<b>{item.code}</b>
					{
						showDetails && (
							<div>
								<label>Description</label>
								<p>{item.description}</p>
								<hr/>
								<label>Summary</label>
								<p>{item.summary}</p>
							</div>
						)
					}
				</div>
				<div className={styles.wrapButton}>
					{
						canUser(currentUser, 'read') && (
							<button onClick={onClickToggleDetails} className="btn btn-info">{ showDetails ? 'hide' : 'show'}</button>
						)
					}
					{
						canUser(currentUser, 'delete') && (
							<button onClick={onClickDeleteRequest} className="btn btn-danger">delete</button>
						)
					}
				</div>
			</li>
		</>
	)
}