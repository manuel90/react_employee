"use client"

//Modules
import { useState, lazy, Suspense } from 'react';


//Components
import Logo from "@/components/atoms/Logo";
import LoginForm from "@/components/organisms/LoginForm";
import Loader from "@/components/atoms/Loader";
import SignUpForm from "@/components/organisms/SignUpForm";
import BottomError from "@/components/atoms/BottomError";
import CreateRequestForm from "@/components/organisms/CreateRequestForm";
const ListRequests = lazy(() => import("@/components/organisms/ListRequests"));
import InlineLoader from '@/components/atoms/InlineLoader';


//Styles
import styles from "./page.module.scss";

import { ThemeContext, AuthContext } from "@/providers/context";

export default function Home() {
  
  const [theme, setTheme] = useState('normal')
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [screen, switchScreen] = useState('login')
  const [errorMessage, setErrorMessage] = useState('')
  const [requests, setRequests] = useState({ count: 0, rows: [] })
  const [totalRequests, setTotalRequests] = useState(0)
  
  
  
  const contextTheme = {
    theme,
    setTheme,
    isLoading,
    setIsLoading,
    screen,
    switchScreen,
    errorMessage,
    setErrorMessage,
    requests,
    setRequests,
    totalRequests,
    setTotalRequests,
  }
  
  const contextAuth = {
    currentUser,
    setCurrentUser,
  }
  
  return (
    <ThemeContext.Provider value={contextTheme}>
      <AuthContext.Provider value={contextAuth}>
        <div className={styles.page}>
          <main className={styles.pageLoginForm}>
            <div className="text-center">
              <Logo />
            </div>
            {
              (() => {
                if(screen === 'login') {
                  return (
                    <>
                      <LoginForm />
                      <a className="mt-4 d-table mx-auto" href="#create-account" onClick={(e) => {
                        e.preventDefault()
                        switchScreen('signup')
                      }}>create an account</a>
                    </>
                  )
                }
                if(screen === 'signup') {
                  return (
                    <>
                      <SignUpForm />
                      <a className="mt-4 d-table mx-auto" href="#login" onClick={(e) => {
                        e.preventDefault()
                        switchScreen('login')
                      }}>I have an account</a>
                    </>
                  )
                }
                if(screen === 'home') {
                  return (
                    <>
                      <div className="d-flex justify-content-end">
                        <button className="mt-4 d-table btn btn-info" onClick={(e) => {
                          e.preventDefault()
                          setCurrentUser(null)
                          localStorage.removeItem('tokenJwt')
                          switchScreen('login')
                        }}>Logout</button>
                      </div>
                      <h2>Requests</h2>
                      <Suspense fallback={<InlineLoader />}>
                        <ListRequests />
                      </Suspense>
                    </>
                  )
                }
                if(screen === 'create-request') {
                  return (
                    <>
                      <CreateRequestForm />
                    </>
                  )
                }
                return <></>
              })()
            }
          </main>
          <footer className={`text-center my-5`}>
            @mlopezlara90 2024
          </footer>
        </div>
        <Loader />
        <BottomError />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
