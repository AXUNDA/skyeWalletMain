import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import {
      FormControl,
      Input, Button, InputGroup, InputRightElement, InputLeftElement, Spinner, useToast
} from '@chakra-ui/react'
import "./register.css"
import { LockIcon, EmailIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Register() {
      const [show, setShow] = React.useState(false)
      const toast = useToast()
      const navigate = useNavigate()
      var token = localStorage.getItem("token") || "qwertyuioplkj"

      const [loading, setLoading] = React.useState(false)
      const [find, setFind] = React.useState(false)

      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")


      const handleClick = () => setShow(!show)

      const getUser = async () => {
            try {
                  toast({
                        title: 'please wait',

                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                        position: "top"
                  })
                  setFind(true)
                  const userData = await fetch("https://erin-glorious-hummingbird.cyclic.app/get/user", {
                        method: "GET",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`
                        },
                  })
                  if (userData.status === 200) {
                        setFind(false)

                        navigate("/home")
                        // alert("token worked")

                        // console.log(userData)
                  } else {
                        setFind(false)

                        // setUser(await userData.json())
                        return;


                        // navigate("/")
                  }



            } catch (error) {
                  console.log(error);
                  return;


            }

      }



      const handle = async (e) => {
            e.preventDefault()
            try {
                  setLoading(true)
                  const response = await fetch("https://erin-glorious-hummingbird.cyclic.app/signin", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                        }, body: JSON.stringify({ email, password })
                  })
                  if (response.status === 200) {


                        const data = await response.json()
                        localStorage.setItem("token", data.token)
                        console.log(data.token)
                        toast({
                              title: 'login success',

                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                              position: "top"

                        })
                        navigate("/home")

                  } else {
                        const data = await response.json()
                        console.log(data)





                        toast({
                              title: 'check your credentials',

                              status: 'error',
                              duration: 9000,
                              isClosable: true,
                              position: "top"
                        })
                        setLoading(false)



                  }


            } catch (error) {

            }

      }
      useEffect(() => {
            getUser()

      }, []);



      return (
            <div>
                  <NavBar />
                  <div className="mainContent">
                        {!find && <form className='mainForm' onSubmit={handle}>

                              <FormControl isRequired mb={2}>

                                    <InputGroup>
                                          <InputLeftElement
                                                pointerEvents='none'
                                                children={<EmailIcon color='gray.300' />}
                                          />
                                          <Input type='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                                    </InputGroup>

                              </FormControl>

                              <FormControl isRequired mb={2}>

                                    <InputGroup size='md'>
                                          <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                onChange={(e) => setPassword(e.target.value)
                                                }


                                          />
                                          <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                      {show ? 'Hide' : 'Show'}
                                                </Button>
                                          </InputRightElement>
                                    </InputGroup>

                              </FormControl>

                              <Button type='submit' leftIcon={<LockIcon />} colorScheme='blue' variant='solid' mt={4} w="100%" isDisabled={loading}>
                                    {loading ? <Spinner color='orange' thickness='4px' emptyColor='white' size="lg"
                                          speed='0.2s' /> : "Login"}
                              </Button>
                              <p className='text-center mt-2 bottom'><a className='text-center' href="/register">No account ? Register</a></p>


                        </form>}
                        {find &&
                              <Spinner
                                    thickness='4px'
                                    speed='0.35s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                              />

                        }
                  </div>
            </div>
      )
}
