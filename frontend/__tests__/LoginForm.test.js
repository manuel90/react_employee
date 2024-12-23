import { render, screen, fireEvent } from "@testing-library/react";

//Components
import LoginForm from "@/components/organisms/LoginForm";

//Contexts
import { ThemeContext, AuthContext } from "@/providers/context";

describe('LoginForm Component', () => {
	
	const contextTheme = {
    theme: null,
    setTheme: ()=>{},
    isLoading: false,
    setIsLoading: ()=>{},
    screen: 'login',
    switchScreen: ()=>{},
    errorMessage: '',
    setErrorMessage: ()=>{},
    requests: { count: 0, rows: [] },
    setRequests: ()=>{},
    totalRequests: 0,
    setTotalRequests: ()=>{},
  }
  
  const contextAuth = {
    currentUser: null,
    setCurrentUser: ()=>{},
  }
	
  it('renders an LoginForm component', () => {
    render(
			<ThemeContext.Provider value={contextTheme}>
				<AuthContext.Provider value={contextAuth}>
					<LoginForm />
				</AuthContext.Provider>
			</ThemeContext.Provider>
		)
    
		const form = screen.queryByTestId('login-form')
    
		expect(form).toBeInTheDocument()
  })

	
	
	it("Button should be enabled when all inputs are correct and no errors should be shown and perform series of operations", () => {
		
    render(
			<ThemeContext.Provider value={contextTheme}>
				<AuthContext.Provider value={contextAuth}>
					<LoginForm />
				</AuthContext.Provider>
			</ThemeContext.Provider>
		)
	
		let emailInput = screen.queryByTestId('email-input')
		let passwordInput = screen.queryByTestId('password-input')
	
		fireEvent.change(emailInput, {
			target: { value: 'li.shaoram@example.com' },
		})
	
		fireEvent.change(passwordInput, {
				target: { value: 'Ab123' },
		})
		
		let emailInputError = screen.queryByTestId('email-input-error')
		let passwordInputError = screen.queryByTestId('password-input-error')
		let submitButton = screen.queryByTestId('submit-button')
	
		expect(emailInputError).toBeFalsy()
		expect(passwordInputError).toBeFalsy()
		expect(submitButton.disabled).toBeFalsy()
	
	
		fireEvent.change(emailInput, {
			target: { value: 'missing' },
		})
	
		fireEvent.change(passwordInput, {
			target: { value: '' },
		})
		
		fireEvent.blur(passwordInput)
		
		emailInputError = screen.queryByTestId('email-input-error')
		passwordInputError = screen.queryByTestId('password-input-error')
		submitButton = screen.queryByTestId('submit-button')
	
		expect(emailInputError).toBeTruthy()
		expect(passwordInputError).toBeTruthy()
		expect(passwordInputError.textContent.trim()).toBe('Password should have at least 4 characters.')
		expect(submitButton.disabled).toBeTruthy()
	})
	
	
})
