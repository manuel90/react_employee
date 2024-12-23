"use client"

import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

//Styles
import styles from "./bottomError.module.scss";

//Contexts
import { ThemeContext } from "@/providers/context";

export default function BottomError() {
	
	const {
		errorMessage,
		setErrorMessage,
	} = useContext(ThemeContext)
	
	return (
		<>
			{
				errorMessage && createPortal(
					<p onClick={() => setErrorMessage('')} className={styles.wrapError}>
						{errorMessage}
					</p>, document.body
				)
			}
		</>
	)
}