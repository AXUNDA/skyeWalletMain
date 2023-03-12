import React from 'react'
import NavBar from '../components/NavBar'
import {
      FormControl,
      Input, Button, InputGroup, InputRightElement, InputLeftElement, Spinner, useToast
} from '@chakra-ui/react'
import "./register.css"
import { PhoneIcon, LockIcon, EmailIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Register() {
      const navigate = useNavigate()
      const toast = useToast()
      const [show, setShow] = React.useState(false)
      const [show2, setShow2] = React.useState(false)
      const [loading, setLoading] = React.useState(false)
      const [email, setEmail] = React.useState("")
      const [name, setName] = React.useState("")
      const [password, setPassword] = React.useState("")
      const [confirmPassword, setConfirmPassword] = React.useState("")
      const [phone, setPhone] = React.useState("")





      const handleClick = () => setShow(!show)
      const handleClick2 = () => setShow2(!show2)

      const handle = async (e) => {
            e.preventDefault()
            setLoading(true)
            try {
                  const response = await fetch("https://erin-glorious-hummingbird.cyclic.app/signup", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              "Access-Control-Allow-Credentials": true,
                        }, body: JSON.stringify({ name, email, password, passwordConfirmation: confirmPassword, phone })
                  })
                  if (response.status === 200) {
                        // setTimeout(function () {
                        //       navigate("/")
                        // }, 1000)

                        const data = await response.json()
                        localStorage.setItem("token", data.token)

                        console.log(data)
                        toast({
                              title: 'success',
                              description: "registration successful",
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                              position: "top"

                        })
                        navigate("/home")

                  } else {
                        const data = await response.json()
                        console.log(data[0])
                        const message = data[0].message



                        toast({
                              title: 'Error',
                              description: `please make sure your passwords match and your credentials are correct`,
                              status: 'error',
                              duration: 9000,
                              isClosable: true,
                              position: "top"
                        })
                        setLoading(false)


                  }




            } catch (error) {
                  setLoading(false)
                  toast({
                        title: 'error',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })


            }

      }


      return (
            <div>
                  <NavBar />
                  <div className="mainContent">
                        <form className='mainForm' onSubmit={handle}>
                              <FormControl isRequired mb={2}>
                                    <Input type='text' placeholder='full name' required onChange={(e) => setName(e.target.value)} />



                              </FormControl>

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

                                    <InputGroup>
                                          <InputLeftElement
                                                pointerEvents='none'
                                                children={<PhoneIcon color='gray.300' />}
                                          />


                                          <Input type='tel' placeholder='Phone number' required
                                                onChange={(e) => setPhone(String(e.target.value))}



                                          />
                                    </InputGroup>

                              </FormControl>
                              <FormControl isRequired mb={2}>

                                    <InputGroup size='md'>
                                          <Input
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                onChange={(e) => setPassword(e.target.value)}
                                                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}'
                                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 7 or more characters"




                                          />
                                          <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                      {show ? 'Hide' : 'Show'}
                                                </Button>
                                          </InputRightElement>
                                    </InputGroup>

                              </FormControl>
                              <FormControl isRequired mb={2}>

                                    <InputGroup size='md'>
                                          <Input
                                                pr='4.5rem'
                                                type={show2 ? 'text' : 'password'}
                                                placeholder='confirm password'
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}'
                                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 7 or more characters"



                                          />
                                          <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick2}>
                                                      {show2 ? 'Hide' : 'Show'}
                                                </Button>
                                          </InputRightElement>
                                    </InputGroup>

                              </FormControl>
                              <Button type='submit' leftIcon={<LockIcon />} colorScheme='blue' variant='solid' mt={4} w="100%" isDisabled={loading}>
                                    {loading ? <Spinner color='orange' thickness='4px' emptyColor='white' size="lg"
                                          speed='0.2s' /> : "Register"}
                              </Button>
                              <p className='text-center mt-2 bottom'><a className='text-center' href="/">have an account ? Login</a></p>


                        </form>
                  </div>
            </div>
      )
}
