import React from 'react'
import { Text, Badge, Heading } from "@chakra-ui/react"
import {
      Menu,
      MenuButton,
      MenuList,
      MenuItem,
      Tag, TagLabel, List, ListItem, ListIcon

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons"
import "./nav.css"

export default function NavBar({ user }) {
      const navigate = useNavigate()
      function logOut() {
            localStorage.setItem("token", "")
            navigate("/")


      }

      return (
            <>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <div className="container">
                              <a className="navbar-brand me-2" href="https://mdbgo.com/">
                                    <Heading size="sm">Demo</Heading>
                              </a>



                              <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target="#navbarButtonsExample"
                                    aria-controls="navbarButtonsExample"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                              >
                                    <i className="fas fa-bars"></i>
                              </button>

                              <div className="collapse navbar-collapse" id="navbarButtonsExample">

                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                          {/* <li className="nav-item">
                                                <a className="nav-link" href="#">Dashboard</a>
                                          </li> */}
                                    </ul>


                                    <div className="d-flex align-items-center">
                                          {user && (<><Text>{user.email}</Text>
                                                {/* <Badge variant='outline' colorScheme='green'>
                                                      online
                                                </Badge> */}
                                                <Tag
                                                      size="md"
                                                      s
                                                      borderRadius='full'
                                                      variant='outline'
                                                      colorScheme='green'
                                                >
                                                      <TagLabel>online</TagLabel>

                                                </Tag>
                                                <Menu>
                                                      <MenuButton >
                                                            <ChevronDownIcon />
                                                      </MenuButton>
                                                      <MenuList>
                                                            <MenuItem onClick={() => logOut()}>logout</MenuItem>
                                                            <MenuItem onClick={() => navigate("/transfer")} >Transfer</MenuItem>
                                                            <MenuItem onClick={() => navigate("/home")}>Dashboard</MenuItem>

                                                      </MenuList>
                                                </Menu> </>)}
                                    </div>
                              </div>
                        </div>

                  </nav>
            </>
      )
}
