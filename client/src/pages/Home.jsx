import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, useDisclosure, Heading, Text, useToast } from '@chakra-ui/react'
import {
      Modal,
      ModalOverlay,
      ModalContent,
      ModalHeader,
      ModalFooter,
      ModalBody,
      ModalCloseButton, Spinner
} from '@chakra-ui/react'
import { CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import {
      Table,
      Thead,
      Tbody,
      Tfoot,
      Tr,
      Th,
      Td,
      TableCaption,
      TableContainer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


export default function Home() {
      const [loading, setLoading] = React.useState(false)

      const [user, setUser] = useState([])
      const [paymentId, setPaymentId] = useState([])
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [balance, setBalance] = useState("")
      const [history, setHistory] = useState([])
      const toast = useToast()
      const navigate = useNavigate()
      var token = localStorage.getItem("token") || "qwertyuioplkj"


      const copy = (text) => {
            navigator.clipboard.writeText(text)

            toast({
                  title: 'copied',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: "top"

            })


      }
      const getHistory = async () => {
            try {
                  const userHistory = await fetch("https://erin-glorious-hummingbird.cyclic.app/get/receipts", {
                        method: "GET",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        },
                  })
                  if (userHistory.status === 200) {
                        const historyData = await userHistory.json()
                        console.log(historyData)
                        setHistory(historyData)
                  } else {
                        alert("no history data")
                  }

            } catch (error) {
                  toast({
                        title: 'unable to fetch account history',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })

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
                        // toast({
                        //       title: 'unable to fetch balance',
                        //       status: 'error',
                        //       duration: 2000,
                        //       isClosable: true,
                        //       position: "top"

                        // })
                        navigate("/")

                  }

            } catch (error) {
                  toast({
                        title: 'unable to fetch balance',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })
                  navigate("/")


            }

      }


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
                        setPaymentId(res.paymentId)

                        // console.log(userData)
                  } else {
                        // setUser(await userData.json())
                        navigate("/")


                        // navigate("/")
                  }



            } catch (error) {
                  navigate("/")


            }

      }
      const newId = async () => {
            try {
                  setLoading(true)
                  const newId = await fetch("https://erin-glorious-hummingbird.cyclic.app/newId", {
                        method: "GET",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        },
                  })
                  if (newId.status === 200) {
                        setLoading(false)
                        await getUser()

                        toast({
                              title: 'new TrxId created',
                              status: 'success',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })


                  } else {
                        toast({
                              title: 'id not created',
                              status: 'error',
                              duration: 2000,
                              isClosable: true,
                              position: "top"

                        })
                        setLoading(false)


                  }

            } catch (error) {
                  setLoading(false)
                  toast({
                        title: 'id not created',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"

                  })



            }

      }

      const deleteId = async (id) => {
            try {
                  if (paymentId.length === 1) {
                        toast({
                              title: ' you must have at least one TrxId',
                              status: 'error',
                              duration: 3000,
                              isClosable: true,
                              position: "top"

                        })
                        return

                  }
                  toast({
                        title: ' please wait',
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                        position: "top"

                  })
                  const deletedId = await fetch(`https://erin-glorious-hummingbird.cyclic.app/id/${id}`, {
                        method: "DELETE",
                        credentials: "include",
                        headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              // "Access-Control-Allow-Credentials": true,
                              "Authorization": `Bearer ${token}`

                        },
                  })
                  if (deletedId.status === 200) {
                        await getUser()

                        toast({
                              title: ' Id deleted',
                              status: 'success',
                              duration: 3000,
                              isClosable: true,
                              position: "top"

                        })


                  } else {
                        toast({
                              title: 'id not deleted',
                              status: 'error',
                              duration: 3000,
                              isClosable: true,
                              position: "top"

                        })

                  }


            } catch (error) {
                  toast({
                        title: 'unable to delete id',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: "top"

                  })

            }

      }

      useEffect(() => {



            getUser()
            getBalance()
            getHistory()
      }, [])



      return (
            <div >
                  <NavBar user={user} />
                  <div className="top mt-4">
                        <div className="right mt-4">
                              <Button colorScheme='blue' variant='outline' onClick={() => navigate("/transfer")}>Transfer funds</Button>
                              <Button isDisabled={paymentId.length > 4 || loading} colorScheme='blue' onClick={() => newId()}>

                                    {loading ? <Spinner color='orange' thickness='4px' emptyColor='white' size="lg"
                                          speed='0.2s' /> : "create new TrxId"}

                              </Button>

                              <Button onClick={onOpen} colorScheme='blue' variant='solid'>view your TrxId's</Button>

                              <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                          <ModalHeader>Your TrxId's</ModalHeader>
                                          <ModalCloseButton />
                                          <ModalBody>
                                                <div className="idS">
                                                      {paymentId && paymentId.map((id) =>

                                                            <div className="each mb-3" key={id} >
                                                                  <DeleteIcon onClick={() => deleteId(id)
                                                                  }
                                                                        boxSize={7}
                                                                        color="red.500"
                                                                        className='icon'


                                                                  />
                                                                  <Heading size="md">{id}</Heading>
                                                                  <CopyIcon className='icon' boxSize={7} onClick={() => copy(id)} />
                                                            </div>







                                                      )}
                                                </div>

                                          </ModalBody>

                                          <ModalFooter>
                                                <Button w="100%" colorScheme='blue' onClick={onClose}>
                                                      Close
                                                </Button>

                                          </ModalFooter>
                                    </ModalContent>
                              </Modal>

                        </div>
                        <div className="left">
                              <Heading size="sm">Balance</Heading>
                              <Text>{balance && balance}</Text>


                        </div>

                  </div>
                  <div className="mainBody">

                        {history && <>
                              <TableContainer>
                                    <Table variant='simple' size="lg">
                                          <TableCaption placement='top'>Your recent Transactions</TableCaption>
                                          <Thead>
                                                <Tr>
                                                      <Th>Sender</Th>
                                                      <Th>Receiver</Th>
                                                      <Th>Amount</Th>
                                                      <Th>Date</Th>




                                                </Tr>
                                          </Thead>
                                          <Tbody>
                                                {history.map((receipt) => (
                                                      <Tr key={receipt._id}>
                                                            <Td>{receipt.from.name}</Td>
                                                            <Td>{receipt.to.name}</Td>
                                                            <Td >{receipt.amount}</Td>
                                                            <Td >{receipt.createdAt}</Td>


                                                      </Tr>


                                                ))}


                                          </Tbody>
                                          <Tfoot>

                                          </Tfoot>
                                    </Table>
                              </TableContainer>



                        </>}
                        {!history && <>

                              <Heading size="sm"> your transactions will appear here</Heading>
                        </>}




                  </div>


            </div>
      )
}
