import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import {
      FormControl,
      Input, Button, InputGroup, InputRightElement, InputLeftElement, Spinner, useToast, List, ListItem, ListIcon, HStack
} from '@chakra-ui/react'
import "./register.css"
import { PhoneIcon, LockIcon, EmailIcon, CheckIcon, CloseIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Register() {
      var token = localStorage.getItem("token") || "qwertyuioplkj"

      const navigate = useNavigate()
      const toast = useToast()

      const [user, setUser] = React.useState(null)

      const [loading, setLoading] = React.useState(false)
      const [balance, setBalance] = React.useState(false)
      const [amount, setAmount] = React.useState(false)
      const [beneficiary, setBeneficiary] = React.useState(false)
      const [trxId, setTrxId] = React.useState(false)






      const updateAmount = (e) => {

            setAmount(e.target.value)
            if (Number(e.target.value) > Number(balance)) {
                  toast({
                        title: 'you can not send more than your current balance ',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })

            }

      }
      const transfer = async () => {

            try {
                  setLoading(true)

                  const transferStatus = await fetch("https://erin-glorious-hummingbird.cyclic.app/transfer", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        }, body: JSON.stringify({ id: trxId, amount: Number(amount) })
                  })
                  if (transferStatus.status === 200) {
                        setBeneficiary(null)
                        setLoading(false)

                        toast({
                              title: 'transfer was successful ',
                              status: 'success',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })


                  } else {
                        const errorData = await transferStatus.json()
                        console.log(errorData)
                        toast({
                              title: 'unable to transfer funds ',
                              status: 'error',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })
                        setLoading(false)


                  }

            } catch (error) {
                  console.log(error)
                  toast({
                        title: 'unable to transfer funds ',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })
                  setLoading(false)


            }

      }







      const handle = async (e) => {
            e.preventDefault()
            try {
                  if (user.paymentId.includes(trxId)) {
                        toast({
                              title: 'you can not send money to yourself',
                              status: 'error',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })
                        return;

                  }
                  setLoading(true)
                  const beneficiary = await fetch("https://erin-glorious-hummingbird.cyclic.app/trxId", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        }, body: JSON.stringify({ id: trxId })
                  })
                  if (beneficiary.status === 200) {
                        const Data = await beneficiary.json()
                        console.log(Data)
                        setBeneficiary(Data)
                        setLoading(false)

                  } else {
                        toast({
                              title: 'user not found ',
                              status: 'error',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })
                        setLoading(false)

                  }


            } catch (error) {
                  toast({
                        title: 'user not found ',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })
                  setLoading(false)


            }

      }
      const getBalance = async () => {
            try {
                  const userBalance = await fetch("https://erin-glorious-hummingbird.cyclic.app/get/balance", {
                        method: "GET",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        },
                  })
                  if (userBalance.status === 200) {
                        const balanceData = await userBalance.json()
                        console.log(balanceData)
                        setBalance(balanceData.balance)
                  } else {
                        console.log("unable to get balance")
                  }

            } catch (error) {
                  console.error(error)

            }

      }

      useEffect(() => {


            const getUser = async () => {
                  try {
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
                              const res = await userData.json()
                              setUser(res)
                              console.log(res, user)
                              // console.log(userData)
                        } else {
                              setUser(await userData.json())
                              console.log(userData)
                              navigate("/")
                        }



                  } catch (error) {
                        navigate("/")


                  }

            }
            getUser()
            getBalance()
      }, [])



      return (
            <div>
                  <NavBar user={user} />
                  <div className="mainContent">
                        {!beneficiary && <form className='mainForm' onSubmit={handle}>

                              <FormControl isRequired mb={2}>

                                    <InputGroup>
                                          <InputLeftElement
                                                pointerEvents='none'
                                                color='gray.300'
                                                fontSize='1.2em'
                                                children='#'
                                          />
                                          <Input placeholder='Enter TrxId' onChange={(e) => setTrxId(e.target.value)} />

                                    </InputGroup>

                              </FormControl>

                              <FormControl isRequired mb={2}>

                                    <InputGroup>
                                          <InputLeftElement
                                                pointerEvents='none'
                                                color='gray.300'
                                                fontSize='1.2em'
                                                children='$'

                                          />
                                          <Input type="number" placeholder='Enter amount' onChange={(e) => updateAmount(e)} />
                                          <InputRightElement children={<CheckIcon color='green.500' />} />
                                    </InputGroup>
                              </FormControl>

                              <Button type='submit' leftIcon={<LockIcon />} colorScheme='blue' variant='solid' mt={4} w="100%" isDisabled={loading || Number(amount) > Number(balance)}>
                                    {loading ? <Spinner color='orange' thickness='4px' emptyColor='white' size="lg"
                                          speed='0.2s' /> : "Transfer"}
                              </Button>

                        </form>}
                        {beneficiary && (
                              <div className='details'>
                                    <List w="100%" spacing={3} >
                                          <ListItem>
                                                <ListIcon as={CheckIcon} color='green.500' />
                                                {beneficiary.name}
                                          </ListItem>
                                          <ListItem>
                                                <ListIcon as={EmailIcon} color='green.500' />
                                                {beneficiary.email}

                                          </ListItem>

                                          <ListItem>

                                                $ {amount}

                                          </ListItem>


                                    </List>
                                    <HStack spacing="8px" mt={4}>
                                          <Button onClick={() => transfer()} rightIcon={<ArrowRightIcon boxSize={5} />} colorScheme='blue' variant='solid' w="50%" isDisabled={loading || amount > balance}>
                                                {loading ? <Spinner color='orange' thickness='4px' emptyColor='white' size="lg"
                                                      speed='0.2s' /> : "Transfer"}
                                          </Button>
                                          <Button colorScheme='red' rightIcon={<CloseIcon boxSize={5} />} variant='solid' w="50%" onClick={() => setBeneficiary(null)}>
                                                cancel
                                          </Button>


                                    </HStack>


                              </div>
                        )}
                  </div>

            </div>
      )
}
