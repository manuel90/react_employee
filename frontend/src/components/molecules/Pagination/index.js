
//styles
import styles from "./pagination.module.scss"

export default function Pagination({
	className,
	onChangePage,
	currentPage,
	totalItems,
	limit = 10
}) {
	
	const totalPages = Math.ceil(totalItems/limit)
	
	if(totalPages === 1) {
		return <></>
	}
	
	return (
		<>
			<div className={`${styles.wrapPagination} ${className}`}>
				<label>Page:</label>
				<select
					className="form-select"
					onChange={onChangePage}
					value={currentPage}
				>
					{
						(() => {
							const listOptions = []
							for(let i = 1; i <= totalPages; i++) {
								listOptions.push(<option key={`listPages${i}`} value={i}>{i}</option>)
							}
							return listOptions
						})()
					}
				</select>
			</div>
		</>
	)
}