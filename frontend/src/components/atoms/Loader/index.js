"use client"

import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

//Styles
import styles from "./loader.module.scss";

//Contexts
import { ThemeContext } from "@/providers/context";

export default function Loader() {
	
	const { isLoading } = useContext(ThemeContext)
	
	useEffect(() => {
		if(isLoading) {
			document.body.setAttribute('loadercomp', 'true')
			document.body.style.overflow = "hidden"
		} else {
			if(document.body.getAttribute('loadercomp') === 'true') {
				document.body.removeAttribute('loadercomp')
				document.body.style.removeProperty('overflow')
			}
		}
	}, [isLoading])
	
	return (
		<>
			{
				isLoading && createPortal(
					<div className={styles.wrapLoader}>
						<div className={styles.loader}></div>
					</div>, document.body
				)
			}
		</>
	)
}