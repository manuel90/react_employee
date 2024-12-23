"use client"

//Modules
import { useContext, useEffect, useState } from "react"

//Components
import LiItemRequest from "@/components/molecules/LiItemRequest";
import Pagination from "@/components/molecules/Pagination";

//Contexts
import { ThemeContext, AuthContext } from "@/providers/context";

//Utils
import { baseUrlEndpoint, canUser } from "@/utils";

//styles
import styles from "./listRequests.module.scss"


export default function ListRequests({ className }) {
	
	const {
    currentUser,
  } = useContext(AuthContext);
	
	
	const {
		isLoading,
		setIsLoading,
    setErrorMessage,
		switchScreen,
		requests,
		setRequests,
		totalRequests,
		setTotalRequests,
  } = useContext(ThemeContext);
	
	const [currentPage, setCurrentPage] = useState(1)
	const limitPagination = 10
	
	
	const onChangePagination = (e) => {
		setCurrentPage(e.target.value)
	}
	
	
	/**
	 * Function to fetch the Employee's requests
	 * @param {*} paged 
	 * @returns 
	 */
	const loadMyRequests = async (paged) => {
		try {
			if(isLoading) {
				return;
			}
			
			setIsLoading(true)
			const myHeaders = new Headers();
			myHeaders.append("Authorization", `Bearer ${currentUser.token}`);
			
			const response = await fetch(`${baseUrlEndpoint}/api/requests?page=${paged}&limit=${limitPagination}`, {
				method: 'GET',
				headers: myHeaders,
			})
			
			if(response.status !== 200) {
				throw new Error("error")
			}
			
			const result = await response.json()
			setRequests(result)
			setTotalRequests(result.count)
			setIsLoading(false)
		} catch(error) {
			setIsLoading(false)
			setErrorMessage(error instanceof Error ? error.message : 'error')
		}
	}
	
	useEffect(() => {
		loadMyRequests(currentPage)
	}, [currentPage])
	
	useEffect(() => {
		if(currentPage === 1) {
			loadMyRequests(1)
		} else {
			setCurrentPage(1)
		}
	}, [totalRequests])
	
	if(requests.count === 0) {
		return (
			<>
				<h5>There's no requests yet.</h5>
				{
					canUser(currentUser, 'create') && (
						<button onClick={() => {
							switchScreen('create-request')
						}} className="btn btn-primary">Create</button>
					)
				}
			</>
		)
	}
	
	return (
		<>
			<div className={`${styles.wrapDivUl} ${className}`}>
				<h6>Total: {totalRequests}</h6>
				<ul>
					{
						requests.rows.map((itemRequest, indexItemRequest) => (
							<LiItemRequest item={itemRequest} key={`liItemRequest${indexItemRequest}`} />
						))
					}
				</ul>
				<Pagination
					currentPage={currentPage}
					totalItems={requests.count}
					onChangePage={onChangePagination}
					limit={limitPagination}
				/>
				{
					canUser(currentUser, 'create') && (
						<button onClick={() => {
							switchScreen('create-request')
						}} className="btn btn-success">add</button>
					)
				}
			</div>
		</>
	)
}