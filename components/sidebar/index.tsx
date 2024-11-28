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
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
 useToast,
Textarea,
Input,
Button
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
  FiUser,
  FiArchive,
  FiBook,
  FiBookOpen,
  FiFile,
  FiBookmark,
  FiCamera,
  FiCheck,
  FiPocket,
  FiMessageCircle,
  FiFileText,
  FiLayout,
  FiMessageSquare,
  FiPlus,
  FiLayers,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import AddNewSection from '../addNew/index'
import ClientDashboard from '../dashboard/index'
import AdminDashboard from '../dashboard-admin/index'
import AddNewCategory from '../addNewCategory/index'
import Template from '../../components/templates'
import  {getCookiesData} from '../../lib/getCookieData'
import Editor from '../template-category/index'
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
const fileTypes = ["JPG", "PNG", "GIF"];
import { FileUploader } from "react-drag-drop-files";
import { BsFillCalendarEventFill } from 'react-icons/bs';

interface LinkItemProps {
  name: string;
  icon: IconType;
  subLinks?: LinkItemProps[];
  id?: string;
}

interface NavItemProps extends FlexProps {
  count: number;
  icon: IconType;
  id?: string;
  children: React.ReactNode;
  setNav: Function;
  subLinks?: LinkItemProps[];
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: any;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  setNav: Function;
   user: any;
  count: number;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard' },
  {
    name: 'Blog Articles',
    icon: FiFileText,
    id: 'BlogArticles',
    subLinks: [
      { name: 'Add New', icon: FiPlus,  id: 'addnew' },
	  { name: 'Add Template', icon: FiPlus,  id: 'addTemplate' },
	  { name: 'Categories', icon: FiLayers,  id: 'addNewCategory'},
    ],
  },
  { name: 'Comments', icon: FiMessageSquare,  id: 'comment' },
  { name: 'Anouncement', icon: BsFillCalendarEventFill,  id: 'events' },
  { name: 'Message', icon: FiMessageSquare,  id: 'message',   subLinks: [
	  { name: 'Guest Message', icon: FiMessageSquare,  id: 'guestMessage' },
    ], },
  { name: 'Media', icon: FiCamera,  id: 'imageUpload' },
  { name: 'Users', icon: FiUser,
  id: 'users',
 subLinks: [
      { name: 'Add New', icon: FiUsers, id: 'addNewUser' },
    ],
  },
  { name: 'Settings', icon: FiSettings, id: 'settings',   subLinks: [
	  { name: 'Profile Page', icon: FiUsers,  id: 'profile' },
    ], }
];


const LinkAdmin: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiLayout, id: 'dashboard-admin' },
  { name: 'Users', icon: FiUser,
  id: 'users',
 subLinks: [
      { name: 'Add New', icon: FiUsers, id: 'addNewUser-admin' },
    ],
  },
  { name: 'Message', icon: FiMessageSquare, id: 'message',   subLinks: [
	  { name: 'User Message', icon: FiMessageSquare,  id: 'guestMessage' },
    ], },
 { name: 'Events', icon: BsFillCalendarEventFill,  id: 'admin-events' },
];


const MainLinkItems: Array<LinkItemProps> = [
  { name: 'Settings', icon: FiSettings, id: 'sample'},
];


const SidebarContent = ({ onClose, user,  count, setNav, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={'#232536'}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color={'white'}
 	  display="flex"
      flexDirection="column"
      {...rest}
    >

      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src="logo.png" alt="logo" /> 
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {user && user.userType === "admin"?  LinkAdmin.map((link) => (<Box  key={link.name}> 
   {user ? user.ids && link.id == "users"  ? "" :
       <NavItem icon={link.icon} count={count} id={link.id} subLinks={link.subLinks} setNav={setNav}>
          {link.name}
        </NavItem> : ""
   } </Box>)) :  LinkItems.map((link) => (<Box  key={link.name}> 
   {user ? user.ids && link.id == "users"  ? "" :
       <NavItem icon={link.icon} count={count} id={link.id} subLinks={link.subLinks} setNav={setNav}>
          {link.name}
        </NavItem> : "" } 
        </Box>
       ))} 

	  <NavItem icon={FiPocket} count={count} setNav={setNav} id={''} position={'absolute'} bottom={'0'} marginBottom={'5'} mx={'5'} _hover={'none'}>
         Send Feedback
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, count , subLinks, id, setNav, ...rest }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
   
 
  const toggleSubLinks = (id :any) => {
    setIsOpen(!isOpen);
	setNav(id) 
  };
  return (
    <Box>
      <Box
        as="a"
        href="#"
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
            color: 'white',
          }}
          onClick={(e) => toggleSubLinks(id)}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children} {id == 'events' ? <Box ml={2} borderRadius={'100%'} background={'red'} color={'white'} w={'25px'} textAlign={'center'}> {count} </Box>  : ""} 
        </Flex>
      </Box>
      {subLinks && isOpen && (
        <Box pl={8}>
          {subLinks.map((subLink) => (
            <Flex key={subLink.name} align="center" p="2" cursor="pointer" _hover={{ bg: '#FFD050' }} onClick={(e) => setNav(subLink.id)}>
              <Icon as={subLink.icon} mr="4" />
              <Text>{subLink.name}</Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

const MobileNav = ({ user, onOpen, ...rest }: MobileProps) => {

const  handleLogout = async () => {
	const res = await axios.post('/api/users/logout')
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
      {...rest}
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
        <IconButton color="white" size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
               	<Avatar name={`${user ? user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1) : ""} ${user ? user.lastName.charAt(0).toUpperCase()+ user.lastName.slice(1) : ""}`} />
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
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={(e) => handleLogout()}>Sign out</MenuItem>
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
 	const [user, setUser] = useState<any>()
 	const [fileName, setFileName] = useState<any>()
    const [file, setFile] = useState<any>()
    const [description, setDescription] = useState<any>()
    const [facebook, setFacebook] = useState<any>()
    const [twitter, setTwitter] = useState<any>()
    const [instagram, setInstagram] = useState<any>()
    const [linkIn, setLinkIn] = useState<any>()
    const [count, setCount] = useState<any>(0)
 	const toast = useToast()
   
	useEffect(() => {
      getCookieUserData()
	}, [])


	const getEvent = async (userId:any) => {
      setCount(0); 
		try {
        let number = []
		const res = await axios.post('/api/event/event');
		  
        let data = res.data.result
		data.map((row:any) => {
        let add = 1
        
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

   const handleChange = async (event:any)  => {
    let r = (Math.random() + 1).toString(36).substring(7)
         setFileName(`${r}-${event.name}`)
        const base64 = new Promise((resolve, reject) => {
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
    getEvent(user._id)
  }

   const handleSaveProfile = async () => {
            // let checking = user.ids ? user.ids : user._id
		let newUsers:any = user;
		delete newUsers.profileSet;
		newUsers["profileSet"] = 1; 
		console.log(newUsers)
		const cookie: any = await axios.post('/api/users/getUpdateCookies', { user: newUsers})
		let data = { facebook: facebook , twitter: twitter, linkIn: linkIn,  instagram: instagram, fileName: fileName, description: description}
		const upload = await axios.post('/api/s3/upload', {filename: fileName, base64: file})
		const res = await axios.post('/api/users/profile', { id: user._id, data: data})

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
      { user ? user.profileSet === 0 ? <Box position={'absolute'} top={'0px'} bottom={'0px'} zIndex={1} width={'100%'} background={"#dbdbdbb8"}> 
            <Box w={'50%'} padding={10} margin={'auto'} position={'relative'} top={'2%'} zIndex={11} background={'#ffff'}>
			    <Text mb={4} textAlign={'center'} fontSize={25}>Blog Profile</Text>
                <Text mb={2}>Blog Profile Image:</Text>
				<FileUploader name="file" handleChange={(e:any) => handleChange(e)} types={fileTypes} />
				<Text mt={2} mb={2}>Blog Profile Description:</Text>
                <Textarea  onChange={(e:any) => setDescription(e.target.value)}/>
                <Text mt={2} mb={2}>Facebook:</Text>
                <Input onChange={(e:any) => setFacebook(e.target.value)}/>
                <Text mt={2} mb={2}>Twitter:</Text>
                <Input onChange={(e:any) => setTwitter(e.target.value)}/>
                <Text mt={2} mb={2}>Instagram:</Text>
                <Input onChange={(e:any) => setInstagram(e.target.value)}/>
                <Text mt={2} mb={2}>LinkIn:</Text>
                <Input onChange={(e:any) => setLinkIn(e.target.value)}/>

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
        {  nav === 'admin-events'  && (<AdminEvents user={user}/>)}
        { nav==='comment' && (<Comments user={user}/>)}
      </Box>

       { user ? user.userType == "user" && nav !== 'guestMessage' && (<ContactAdmin user={user}/>) : ""}

       <Box>
       
       </Box>
    </Box>
  );
};
