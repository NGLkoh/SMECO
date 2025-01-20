import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
 useToast,
Textarea,
Input,
Button, Link,
} from '@chakra-ui/react';
import {
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
  FiUser,
  FiCamera,
  FiFileText,
  FiLayout,
  FiMessageSquare,
  FiPlus,
  FiLayers,
} from 'react-icons/fi';
import AddNewSection from '../addNew/index'
import ClientDashboard from '../dashboard/index'
import AdminDashboard from '../dashboard-admin/index'
import Template from '../templates'
import  {getCookiesData} from '../../lib/getCookieData'
import axios from "axios";
import TemplateCategory from '../template-category/index';
import AddSubUser from '../addSubUser/index'
import AddSubUserAdmin from '../addUser/index'
import AddNewImageSection from '../addImage/index'
import ContactAdmin from '../messageAdmin/index'
import ContactGuest from '../messageGuest/index'
import Comments from '../comments/index'
import ProfileEdit from '../settings/index'
import Events from '../events/index'
import AdminEvents from '../admin-events/index'
import NewsLetter from '../newletter/index'
import MessageGuestToAdmin from '../messageGuestToAdmin/index'
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";
import { BsBook, BsFillCalendarEventFill, BsNewspaper } from 'react-icons/bs';
import { FiPocket } from 'react-icons/fi';
import ChangePasswordModal from '../modal/changepassword'
import Subscribe from '../list-of-subscribe/index'
const LinkItems = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard' },
  {
    name: 'Blog Articles',
    icon: FiFileText,
    id: 'addTemplate',
    subLinks: [
	  { name: 'Categories', icon: FiLayers,  id: 'addNewCategory'},
    ],
  },
  { name: 'Comments', icon: FiMessageSquare,  id: 'comment' },
  { name: 'Anouncement', icon: BsFillCalendarEventFill,  id: 'events' },
  { name: 'Message', icon: FiMessageSquare,  id: 'guestMessage' },
  { name: 'Media', icon: FiCamera,  id: 'imageUpload' },
  { name: 'Users', icon: FiUser,
  id: 'addNewUser'},
  { name: 'Settings', icon: FiSettings, id: 'profile' }
];

const LinkSubUserItems = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard' },
  {
    name: 'Blog Articles',
    icon: FiFileText,
    id: 'addTemplate',
    subLinks: [
	  { name: 'Categories', icon: FiLayers,  id: 'addNewCategory'},
    ],
  },
  { name: 'Comments', icon: FiMessageSquare,  id: 'comment' },
  { name: 'Anouncement', icon: BsFillCalendarEventFill,  id: 'events' },
  { name: 'Message', icon: FiMessageSquare,  id: 'guestMessage' },
  { name: 'Media', icon: FiCamera,  id: 'imageUpload' }
];

const LinkAdmin = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard-admin' },
  { name: 'Users', icon: FiUser,
  id: 'addNewUser-admin'
  },
  { name: 'Message', icon: FiMessageSquare, id: 'guestToAdminMessage'},
 { name: 'Events', icon: BsFillCalendarEventFill,  id: 'admin-events' },
 { name: 'Newsletter', icon: BsNewspaper,  id: 'admin-newletter' },
 { name: 'List of Subscribers', icon:  BsBook,  id: 'subscribe-list' },
];

const SidebarContent = ({ onClose, user, count, setNav }) => {
  const [selectedId, setSelectedId] = useState('');

  return (
    <Box
      transition="3s ease"
      bg="#232536"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color="white"
      display="flex"
      flexDirection="column"

    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
       <Link href='/'><img src="logo.png" alt="logo" /></Link> 
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {user && user.userType === 'sub-user'
        && LinkSubUserItems.map((link) => (
            <Box key={link.name}>
              {user && user.ids && link.id === 'users' ? null : (
                <NavItem
                  icon={link.icon}
                  count={count}
                  id={link.id}
                  subLinks={link.subLinks}
                  setNav={setNav}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                >
                  {link.name}
                </NavItem>
              )}
            </Box>
          ))
        }
      {user && user.userType === 'admin'
        && LinkAdmin.map((link) => (
            <Box key={link.name}>
              {user && user.ids && link.id === 'users' ? null : (
                <NavItem
                  icon={link.icon}
                  count={count}
                  id={link.id}
                  subLinks={link.subLinks}
                  setNav={setNav}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                >
                  {link.name}
                </NavItem>
              )}
            </Box>
          ))
        }
         {user && user.userType === 'user' && <>{LinkItems.map((link) => (
            <Box key={link.name}>
              {user && user.ids && link.id === 'users' ?  null :  (
                <NavItem
                  icon={link.icon}
                  count={count}
                  id={link.id}
                  subLinks={link.subLinks}
                  setNav={setNav}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                >
                  {link.name}
                </NavItem>
              )}
            </Box>
          ))}
          <Box onClick={(e) => {
			window.location.href = "mailto:bdmpkitsolution24@gmail.com";
			e.preventDefault();
		}}> 
        <NavItem
        icon={FiPocket}
        count={count}
        setNav={setNav}
        id="123"
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        position="absolute"
        bottom="0"
        to='bdmpkitsolution24@gmail.com'
		
        marginBottom="5"
        mx="5"
        _hover="none"
      >
        Send Feedback
      </NavItem></Box></>}

      
  
    </Box>
  );
};

const NavItem = ({ 
  icon, 
  children, 
  count, 
  subLinks, 
  id, 
  setNav, 
  selectedId, 
  setSelectedId}) => {
  const [isOpen, setIsOpen] = useState(false);
 

  // Handle toggling of sublinks
  const toggleSubLinks = (linkId) => {
    if (selectedId === linkId) {
      // Close if the same link is clicked again
      setSelectedId('');
      setIsOpen(false);
    } else {
      setSelectedId(linkId); // Set the selected ID
      setIsOpen(true);       // Open the clicked link's sublinks
      setNav(linkId);        // Update navigation state
    }
  };




  return (
    <Box>
      <Box
        as="a"

        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="2"
          mx="5"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#FFD050',
            color: 'black',
          }}
          onClick={() => toggleSubLinks(id)}

        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'black',
              }}
              as={icon}
            />
          )}
          {children}
          {id === 'events' && (
            <Box
              ml={2}
              borderRadius="100%"
              background="red"
              color="white"
              w="25px"
              textAlign="center"
            >
              {count}
            </Box>
          )}
        </Flex>
      </Box>

      {/* Render sublinks */}
      {subLinks && isOpen && (
        <Box pl={8}>
          {subLinks.map((subLink) => (
            <Flex
              key={subLink.id}
              align="center"
              p="2"
              cursor="pointer"
              bg={selectedId === subLink.id ? '#FFD050' : undefined} // Highlight selected sublink
              color={selectedId === subLink.id ? 'black' : undefined}
              _hover={{ bg: '#FFD050', color: 'black' }}
   borderRadius="8"
              onClick={() => {
                setNav(subLink.id);  // Navigate to the sublink
                setSelectedId(subLink.id); // Highlight clicked sublink
              }}
            >
              <Icon as={subLink.icon} mr="4" />
              <Text>{subLink.name}</Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};


const MobileNav = ({ user, onOpen }) => {
  const [isPassOpen, setPassword] = useState(false);
    const closeModalPassword = () => {
    setPassword(false)
  }

  const handleChangePassword = () => {
  setPassword(true)
 }
const  handleLogout = async () => {
	 await axios.post('/api/users/logout')
	 let origin = window.location.origin
     window.location.href = `${origin}/login`
}
	  
  return (
    <Flex
      ml={{ base: 0, md: 50 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'#232536'}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
		color="white"
		border='none'
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: '0', md: '6' }}>
  
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
               	<Avatar  src={user && user.profile && user.profile[0]?.fileName 
            ? `https://smeco-bucket1.s3.ap-southeast-2.amazonaws.com/${user.profile[0].fileName}` 
            : "" // No avatar image, use default
        } 
			 name={`${user ? user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1) : ""} ${user ? user.lastName.charAt(0).toUpperCase()+ user.lastName.slice(1) : ""}`} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                  color="white"
                >
                  <Text fontSize="sm" color="white">{user ? user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1) : ""} {user ?  user.lastName.charAt(0).toUpperCase()+ user.lastName.slice(1) : ""}</Text>
                  <Text fontSize="xs" color="white">{user ? user.userType.charAt(0).toUpperCase()+ user.userType.slice(1) : ""}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="white" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
  bg={useColorModeValue('white', 'gray.900')}
  borderColor={useColorModeValue('gray.200', 'gray.700')}
>
  {user?._id && user?._id !== ('672ff29e19abf9597c2544f6') ? (
    <MenuItem
      as="a"
      href={`/blog-user/${user._id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Profile
    </MenuItem>
  ) : (
    <MenuItem isDisabled>Profile</MenuItem> // Optional fallback if user._id is not available
  )}
  <MenuDivider />
  <MenuItem onClick={handleChangePassword}>Change password</MenuItem>
  <MenuItem onClick={handleLogout}>Sign out</MenuItem>

  <ChangePasswordModal  openPassword={isPassOpen} username={user ? user._id: ""} closeEditEventModal={closeModalPassword} />
</MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nav, setNav] = useState('');
 	const [user, setUser] = useState()
 	const [fileName, setFileName] = useState()
    const [file, setFile] = useState()
    const [description, setDescription] = useState()
    const [facebook, setFacebook] = useState()
    const [instagram, setInstagram] = useState()
    const [tiktok, setTiktok] = useState()
    const [shopee, setShopee] = useState()
    const [lazada, setLazada] = useState()

    const [count, setCount] = useState(0)
 	const toast = useToast()
   
	useEffect(() => {
      getCookieUserData()
	}, [])

 

	const getEvent = async (userId) => {
      setCount(0); 
		try {
        let number = []
		const res = await axios.post('/api/event/event');
		  
        let data = res.data.result
		data.map((row) => {
        
			if(row.users.indexOf(userId) > -1) {
            } else { 
              number.push(row)
           }
		})
	   setCount(number.length)
		} catch (error) {
		console.error('Error fetching messages:', error);
		}
	};

   const handleChange = async (event)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${event.name}`)
           new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(event)
			reader.onload = () => {
              setFile(reader.result)
			 resolve(reader.result)
			}
			reader.onerror = reject
		})
	};

  const getCookieUserData = async () => {
	const data = await getCookiesData()
	let user =  JSON.parse(data)
    console.log(user)
	console.log(user.firstName)
	setUser(user)
// Set the initial nav state to dashboard based on user type
  if (user.userType === 'admin') {
    setNav('dashboard-admin'); // Admin dashboard
  } else if (user.userType === 'sub-user' || user.userType === 'user') {
    setNav('dashboard'); // Client dashboard
  }

    getEvent(user._id)
  }

   const handleSaveProfile = async () => {
            // let checking = user.ids ? user.ids : user._id
		let newUsers = user;
		delete newUsers.profileSet;
		newUsers["profileSet"] = 1; 
		console.log(newUsers)
		await axios.post('/api/users/getUpdateCookies', { user: newUsers})
		let data = { facebook: facebook , lazada: lazada, shopee: shopee, tiktok: tiktok,  instagram: instagram, fileName: fileName, description: description}
		 await axios.post('/api/s3/upload', {filename: fileName, base64: file})
	     await axios.post('/api/users/profile', { id: user._id, data: data})

		 toast({
          title: 'Save Profile Success',
          status: 'success',
	      position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
       
     let origin = window.location.origin
     window.location.href = `${origin}/dashboard`
   }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'white')}>
      { user ? user.profileSet === 0 && user.userType !== "sub-user" ? <Box position={'absolute'} top={'0px'} bottom={'0px'} zIndex={1} width={'100%'} background={"#dbdbdbb8"}> 
            <Box w={'50%'} padding={10} margin={'auto'} position={'relative'} top={'2%'} zIndex={11} background={'#ffff'}>
			    <Text mb={4} textAlign={'center'} fontSize={25}>Blog Profile</Text>
                <Text mb={2}>Blog Profile Image:</Text>
				<FileUploader name="file" handleChange={(e) => handleChange(e)} types={fileTypes} />
				<Text mt={2} mb={2}>Blog Profile Description:</Text>
                <Textarea  maxLength={250} onChange={(e) => setDescription(e.target.value)}/>
                <Text mt={2} mb={2}>Facebook:</Text>
                <Input onChange={(e) => setFacebook(e.target.value)}/>
                <Text mt={2} mb={2}>Instagram:</Text>
                <Input onChange={(e) => setInstagram(e.target.value)}/>
                <Text mt={2} mb={2}>Shopee:</Text>
                <Input onChange={(e) => setShopee(e.target.value)}/>
  				<Text mt={2} mb={2}>Lazada:</Text>
                <Input onChange={(e) => setLazada(e.target.value)}/>
  				<Text mt={2} mb={2}>Tiktok:</Text>
                <Input onChange={(e) => setTiktok(e.target.value)}/>


                 <Button colorScheme='blue' onClick={(e => handleSaveProfile())} mt={2} mr={3} w={'100%'}>
				Save
				</Button>
            </Box>
       </Box> : "" : ""}
      
      <SidebarContent user={user} onClose={onClose} display={{ base: 'none', md: 'block' }} count={count}   setNav={setNav}/>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent count={count} user={user} onClose={onClose} setNav={setNav} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        { nav === 'addnew'  && (<AddNewSection/>) }
        { nav === 'addTemplate'  && (<Template user={user}/>) } 
		{ nav === 'addNewCategory'  && (<TemplateCategory user={user}/>) } 
		{ nav === 'addNewUser'  && (<AddSubUser user={user}/>) } 
        { nav === 'dashboard'  && (<ClientDashboard user={user}/>) } 
        { nav === 'imageUpload'  && (<AddNewImageSection user={user}/>) } 
        { nav === 'dashboard-admin'  && (<AdminDashboard user={user}/>) } 
        { nav === 'addNewUser-admin'  && (<AddSubUserAdmin user={user}/>) } 
        { nav === 'guestMessage'  && (<ContactGuest user={user}/>) } 
        { nav === 'profile'  && (<ProfileEdit user={user}/>) } 
        { nav === 'events'  && (<Events user={user}/>) } 
        { nav === 'admin-events'  && (<AdminEvents user={user}/>)}
        { nav === 'comment' && (<Comments user={user}/>)}
        { nav ==='admin-newletter' && (<NewsLetter user={user}/>)}
        { nav ==='guestToAdminMessage' && (<MessageGuestToAdmin user={user}/>)}
        { nav ==='subscribe-list' && (<Subscribe user={user}/>)}

      </Box>

       { user ? user.userType == "user" && nav !== 'guestMessage' && (<ContactAdmin user={user}/>) : ""}

       <Box>
       
       </Box>
    </Box>
  );
};
